const email=document.querySelector('#email');
const password=document.querySelector('#password');

 async function login(e){
   try{
        e.preventDefault();
        let logindetails={
            email:email.value,
            password:password.value
          }
      
    console.log(logindetails);
    const response= await axios.post("http://localhost:3000/users/login",
    logindetails)
    if(response.status==201){
       localStorage.setItem('token',response.data.token);
        window.location.href="./chatapp.html"
        }
        }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.data.message} <div>`
    }
}

document.getElementById('reset-button').onclick=async function(e){
    try{
        window.location.href="./resetform.html"
    }
    catch(err){
        console.log(err);
        document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}