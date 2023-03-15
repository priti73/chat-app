//const { get } = require("../routes/signup");

const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById('chat-message');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');


const createGroupForm = document.querySelector('#create-group-form');
const groupNameInput = document.querySelector('#group-name');
const membersInput = document.querySelector('#members');
const groupsList = document.querySelector('#groups');

function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }

chatForm.addEventListener('submit',async (event) => {
  event.preventDefault();
  const token=localStorage.getItem('token');
  const tok=parseJwt(token);
  let message ={text:chatMessageInput.value};
  let obj={
    name:tok.name,
    text:chatMessageInput.value
  }
  const date = new Date().getTime(); // Get current timestamp
  localStorage.setItem(date, JSON.stringify(obj)); // Store chat message with timestamp as key
  
  // Remove oldest chat message if there are more than 10 saved
  let oldestKey=localStorage.key(0);
  if (localStorage.length > 11) {
    for(let i=1;i<localStorage.length;i++){
      if(localStorage.key(i)<oldestKey){
      oldestKey=localStorage.key(i);
      }
      
    } // Get key of oldest chat message
    localStorage.removeItem(oldestKey); // Remove oldest chat message from localStorage
  }
  const response = await axios.post("http://localhost:3000/users/chat",message,{headers: {'Authentication' :token}});
  chatMessageInput.value = '';
});


function showNewExpenseOnScreen(chat){
  
  const chatMessageElement = document.createElement('div');
  chatMessageElement.textContent = `${chat.name}: ${chat.text}`;
  chatMessages.appendChild(chatMessageElement);
  }

  

window.addEventListener('load', ()=>{
 getusers();
 let Details, details;
    Object.keys(localStorage).forEach((key) => {
      if(key!=='token'&& key!=='groupId'){
    Details = localStorage.getItem(key);
    details = JSON.parse(Details);
    showNewExpenseOnScreen(details);}
    });
    getgroups();
  
    getmessages();
 })

async function getgroups(){
const token=localStorage.getItem('token');
const response = await axios.get("http://localhost:3000/users/getgroupname",{headers: {'Authentication' :token}});
const grpdetails=response.data.groupDetails;
const parent=document.querySelector('#groups');
for(let i=0;i<grpdetails.length;i++){
    let child=`<li onclick="insideGroup(${grpdetails[i].groupId})">${grpdetails[i].groupName}</li>`
    parent.innerHTML=parent.innerHTML+child

 }
}

async function insideGroup(id){
  try{
     localStorage.setItem("groupId",id)
      window.location.href="./groupchat.html"
  }catch(err){
      console.log("error in inside group FE",err)
  }

}

async function getusers(){
const response = await axios.get("http://localhost:3000/users/signup");
const userlist=response.data.users;
userlist.forEach((user) => {
  const userElement = document.createElement('div');
  userElement.textContent = user.name+" joined";
  userList.appendChild(userElement);
});
}

async function getmessages(){
  let newKey=localStorage.key(0);
  for(let i=1;i<localStorage.length;i++){
      if(localStorage.key(i)<newKey){
     newKey=localStorage.key(i);
    }
    
  }
  console.log("currenttime",newKey);
const response = await axios.get(`http://localhost:3000/users/chat?currenttime=${newKey}`);
const chatHistory=response.data.message;
// Clear previous messages
chatMessages.innerHTML = '';
chatHistory.forEach((chat) => {
  const chatMessageElement = document.createElement('div');
  chatMessageElement.textContent = `${chat.signupName}: ${chat.message}`;
  chatMessages.appendChild(chatMessageElement);
});
}

let intervalId;

function startUpdatingMessages() {
  // Clear any previous interval
  clearInterval(intervalId);
  
  // Set new interval to call the function every 1 second
  intervalId = setInterval(getmessages, 1000);
}

startUpdatingMessages();


// Event listener for form submission
createGroupForm.addEventListener('submit', async(event) => {
  event.preventDefault();
  let grpinformation = {
    groupName: groupNameInput.value,
    members: membersInput.value.split(',').map(email => email.trim())
  };
  
  if (groupNameInput.value && membersInput.value) {
    try {
       const token= localStorage.getItem('token');
       const response = await axios.post("http://localhost:3000/group/creategrp",grpinformation ,{headers: {'Authentication' :token}});
         console.log(response.data.groupid) ;
      if (response.status==201) {
        // Add new group to list of groups
        const parent=document.querySelector('#groups');
       
            let child=`<li onclick="insideGroup(${response.data.groupid}); getgroups()">${groupNameInput.value}</li>`
            parent.innerHTML=parent.innerHTML+child
        
         
        // Close modal and clear form inputs
       // closeModal();
        groupNameInput.value = '';
        membersInput.value = '';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert('Please fill out all fields.');
  }
});


