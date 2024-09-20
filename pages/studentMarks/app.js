import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get("uid");
let btn = document.getElementById('btn');

btn.addEventListener('click', async ()=>{
   const course = document.getElementById('select').value;
   const studentId = document.getElementById('studentId').value;
   const marks = document.getElementById('marks').value;
   const totalMarks = document.getElementById('totalMarks').value;
   const grade = document.getElementById('grade').value;

   const obj = {
      uid,
      course,
      studentId,
      marks,
      totalMarks,
      grade
   }
   try{
      const docRef = await addDoc(collection(db, "Result"),obj);
      Swal.fire({
         title: "success",
         text: "Result Submitted successfully!",
         icon: "success"
      });
      // document.getElementById("addStudentForm").reset(); // Reset form fields
   }catch(error){
      const errorMessage = error.message;
      document.getElementById('errorAddStudent').innerText  = `Error ${errorMessage}`;
      Swal.fire({
         title: "Registration failed.",
         text: errorMessage,
         icon: "error"
       });
   }
})
