const name=document.querySelector('#name');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const Phonenumber=document.querySelector('#Phonenumber');

 async function signup(e){
   try{
        e.preventDefault();
        let signupdetails={
            name:name.value,
            email:email.value,
            Phonenumber:Phonenumber.value,
            password:password.value
          }
        
  console.log(signupdetails);
    const response= await axios.post("http://localhost:3000/users/signup",
    signupdetails)
    if(response.status==201){
     // window.location.href="./login.html"
     console.log('200');
      
    }
    else{
       throw new Error('failed to login')
    }
        }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}