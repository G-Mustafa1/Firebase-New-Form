import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
   getFirestore,
   collection,
   addDoc,
   doc,
   setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const firebaseConfig = {
   apiKey: "AIzaSyDIFb-in4PXBn_vOzyrkEVBk7f_jWPpz-0",
   authDomain: "loginsingup-72ff1.firebaseapp.com",
   projectId: "loginsingup-72ff1",
   storageBucket: "loginsingup-72ff1.appspot.com",
   messagingSenderId: "670972635617",
   appId: "1:670972635617:web:eaee1b649713b92e60caa0",
   measurementId: "G-XVZJLSP9V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// console.log('hy')
// onAuthStateChanged(auth, (user) => {
//    if (user) {
//     //  console.log(user.uid)
//      // User is signed in, see docs for a list of available properties
//      // https://firebase.google.com/docs/reference/js/auth.user
//      const uid = user.uid;
//      console.log('bly bil')
//      window.location.href = "/pages/login/index.html"
//      // ...
//    } else {
//       window.location.href = "/pages/signup/index.html"
//       console.log('chl nikl')
//      // User is signed out
//      // ...
//    }
//  });



let btn = document.getElementById('btn');

btn.addEventListener('click', async () => {
   btn.disabled = true;
   btn.innerText = "Loding..."
   btn.style.backgroundColor = "#0033a0"
   const firstName = document.getElementById('firstName').value;
   const lastName = document.getElementById('lastName').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const cnic = document.getElementById('cnic').value;

   try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      let userId = userCredential.user.uid;
      const obj = {
         userId,
         firstName,
         lastName,
         email,
         cnic,
      };
      Swal.fire({
         title: "success",
         text: "User created successfully",
         icon: "success"
      });
      // setTimeout(()=>{
      const docRef = await addDoc(collection(db, "student"), obj )
      console.log("Document written with ID: ", docRef.id);
      // document.getElementById('contanir')reset()
         window.location.href = "/pages/login/index.html";
      // },3000)
      // Swal.fire({
      //    title: "success",
      //    text: "User created successfully",
      //    icon: "success"
      // });
      // window.location.href = "/pages/studentMarks/index.html";
   }catch (error){
      btn.disabled = false;
      btn.innerText = "Add Student"
      btn.style.backgroundColor = "#0051ff"
      const errorMessage = error.message;
        document.getElementById('errorAddStudent').innerText = `Error ${errorMessage}`;
        Swal.fire({
         title: "error",
         text: errorMessage,
         icon: "error"
       });
         console.log(errorMessage)
   }
});

 

