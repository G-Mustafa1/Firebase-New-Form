import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
   getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
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
const sign_out = document.getElementById('sign-out');
sign_out.addEventListener('click', async ()=> {
   try {
      await signOut(auth);
      console.log("User signed out successfully.");
      Swal.fire({
            title: "success",
            text: "User signed out successfully.",
            icon: "success"
         });
      window.location.href = "../login/index.html";     
   }catch (error) {
      const errorMessage = error.message;
      Swal.fire({
            title: "Error signing out:",
            text: errorMessage,
            icon: "error"
         });
      console.error("Error signing out: ", error);
    }
  });

  onAuthStateChanged(auth, (user) => {
   if (user) {
     console.log(user.uid)
   } else {
     console.error("No user is signed in.");
   }
 });
async function fetchStudents() {
   const studentsContainer = document.getElementById("student");
   const querySnapshot = await getDocs(collection(db, "student"));
 
   let serialNumber = 1; // Initialize serial number
   querySnapshot.forEach((doc) => {
     const student = doc.data();
     const studentDiv = document.createElement("div");
   //   studentDiv.className = "border border-gray-300 p-4 rounded mb-4";
             //  <p><strong>Serial No:</strong> ${serialNumber}</p>

     studentDiv.innerHTML = `
           <p><strong>Serial No:</strong> ${serialNumber}</p>
             <p><strong>First Name:</strong> ${student.firstName}</p>
             <p><strong>Last Name:</strong> ${student.lastName}</p>
             <p><strong>Email:</strong> ${student.email}</p>
             <p><strong>CNIC:</strong> ${student.cnic}</p>
             <button data-id="${doc.id}">Delete Student</button>
         `;
 
     studentsContainer.appendChild(studentDiv);
     serialNumber++; // Increment serial number
   });
 }
 
 async function fetchResults() {
   const resultsContainer = document.getElementById("student_result");
   const querySnapshot = await getDocs(collection(db, "Result"));
 
   let serialNumber = 1; // Initialize serial number
   querySnapshot.forEach((doc) => {
     const result = doc.data();
   //   console.log(result)
     const resultDiv = document.createElement("div");

     resultDiv.innerHTML = `
             <p><strong>Serial No:</strong> ${serialNumber}</p>
             <p><strong>Course:</strong> ${result.course}</p>
             <p><strong>Student ID:</strong> ${result.studentId}</p>
             <p><strong>Marks:</strong> ${result.marks}</p>
             <p><strong>Total Marks:</strong> ${result.totalMarks}</p>
             <p><strong>Grade:</strong> ${result.grade}</p>
             <button  data-id="${doc.id}">Delete Result</button>
         `;
 
     resultsContainer.appendChild(resultDiv);
     serialNumber++; // Increment serial number
   });
 }
 
 async function deleteResult(id) {
   await deleteDoc(doc(db, "Result", id));
   window.location.reload(); // Refresh to show updated results
 }
 
 async function deleteStudent(id) {
   await deleteDoc(doc(db, "student", id));
   window.location.reload(); // Refresh to show updated students
 }
 
 document
   .getElementById("student_result")
   .addEventListener("click", (event) => {
     if (
       event.target.tagName === "BUTTON" &&
       event.target.textContent.includes("Delete Result")
     ) {
       const id = event.target.getAttribute("data-id");
       if (Swal.fire({
         title: "success",
         text: "Are you sure you want to delete this result?!",
         icon: "success"
      })) {
         deleteResult(id);
       }
     }
   });
 
 document
   .getElementById("student")
   .addEventListener("click", (event) => {
     if (
       event.target.tagName === "BUTTON" &&
       event.target.textContent.includes("Delete Student")
     ) {
       const id = event.target.getAttribute("data-id");
       if (Swal.fire({
         title: "success",
         text: "Are you sure you want to delete this result?!",
         icon: "success"
      })) {
         deleteStudent(id);
       }
     }
   });
 
 fetchStudents();
 fetchResults();
