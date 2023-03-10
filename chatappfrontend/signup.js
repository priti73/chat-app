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
        
    const response= await axios.post("http://localhost:3000/users/signup",
    signupdetails)
    if(response.status==201){
     // window.location.href="./login.html"
     alert("Successfuly signed up");
      
    }
    else if(response.status==401){
    alert("User already exists, Please Login");
     console.log(response.data.message);
    }
    else{
       throw new Error('failed to login')
    }
        }
        catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.data.message} <div>`
    }
}