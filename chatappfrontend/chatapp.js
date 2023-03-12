const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById('chat-message');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit',async (event) => {
  event.preventDefault();
  const token=localStorage.getItem('token');
  let message ={text:chatMessageInput.value};
  const response = await axios.post("http://localhost:3000/users/chat",message,{headers: {'Authentication' :token}});
  console.log(response);
  chatMessageInput.value = '';
});


window.addEventListener('load', ()=>{
 getusers();
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

// Display chat messages
const chatHistory = [{ sender: 'User 1', message: 'Hi' }, { sender: 'User 2', message: 'Hello' }]; // Replace with actual chat history from server
chatHistory.forEach((chat) => {
  const chatMessageElement = document.createElement('div');
  chatMessageElement.textContent = `${chat.sender}: ${chat.message}`;
  chatMessages.appendChild(chatMessageElement);
});
