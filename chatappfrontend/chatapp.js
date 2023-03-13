//const { get } = require("../routes/signup");

const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById('chat-message');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');

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
  console.log(response);
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
      if(key!=='token'){
    Details = localStorage.getItem(key);
    details = JSON.parse(Details);
    console.log("detail", details);
    showNewExpenseOnScreen(details);}
    });
 })


async function getusers(){
const response = await axios.get("http://localhost:3000/users/signup");
console.log(response.data.users);
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
const response = await axios.get(`http://localhost:3000/users/chat?currenttime=${newKey}}`);
console.log("response",response);
console.log(response.data.message);
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
