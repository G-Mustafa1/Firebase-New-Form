import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
const firebaseConfig = {
   apiKey: "AIzaSyDIFb-in4PXBn_vOzyrkEVBk7f_jWPpz-0",
   authDomain: "loginsingup-72ff1.firebaseapp.com",
   projectId: "loginsingup-72ff1",
   storageBucket: "loginsingup-72ff1.appspot.com",
   messagingSenderId: "670972635617",
   appId: "1:670972635617:web:eaee1b649713b92e60caa0",
   measurementId: "G-XVZJLSP9V7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const btn = document.getElementById('btn');
btn.addEventListener('click', ()=> {
   btn.disabled = true;
   btn.innerText = "Loadind..."
   btn.style.backgroundColor = "#0033a0"
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   let select = document.getElementById('select').value;
   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    Swal.fire({
      title: "success",
      text: "Sign in successfully",
      icon: "success"
   });
    const user = userCredential.user;
    if(select == ""){
      btn.disabled = false;
      btn.innerText = "Log In"
      btn.style.backgroundColor = "#0051ff"
      Swal.fire({
         title: "error",
         text: "hh",
         icon: "error"
       });
    }
    else{
      if(select === "Admin"){
         window.location.href = `../studentMarks/index.html`;
      }
      else if(select === "Student"){
         window.location.href = "../studentPortal/index.html";
      }
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    btn.disabled = false;
      btn.innerText = "Log In"
      btn.style.backgroundColor = "#0051ff"
      const errorMessage = error.message;
        document.getElementById('errorAddStudent').innerText = `Error ${errorMessage}`;
        Swal.fire({
         title: "error",
         text: errorMessage,
         icon: "error"
       });
  });
})
