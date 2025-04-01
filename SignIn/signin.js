import { auth, createUserWithEmailAndPassword, signInWithPopup ,provider } from "../fireConfig.js";

const signInBtn = document.getElementById("signInBtn")
const googlesignInBtb = document.getElementById("GooglesignInBtb")
// sign in form


const SignInFun = ()=>{
    try{
        alert("Sign  in...")
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        createUserWithEmailAndPassword(auth, email, password)
         window.location.href = "../LogIn/logIn.html"
        
    } catch(error){
        alert("OPPs an  error...")
        console.log(error)
        
    }
    
    
} 

signInBtn.addEventListener("click", ()=>{
  SignInFun()
 
} )//
// google sigin in
const  googleSignIn = () => {
    signInWithPopup(auth, provider)
     .then((result) => {
        const user = result.user;
        console.log("User Signed In:", user);
        alert(`Welcome, ${user.displayName}! Your email: ${user.email}`);
      })
      .catch((error) => {
        alert("bad response " + error)
        console.error("Error:", error.code, error.message);
      });
  };
googlesignInBtb.addEventListener("click",googleSignIn)