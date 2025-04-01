import { auth, signInWithEmailAndPassword } from "../fireConfig.js";
const logInBtn = document.getElementById("loginBtn");
const LogInFun = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Loged In ===>" );
      window.location.href = "../home.html"
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
   
};
logInBtn.addEventListener("click", LogInFun);
