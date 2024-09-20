import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth,onAuthStateChanged,  signOut,} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
   getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signOutButton = document.getElementById("sign-out");
  signOutButton.addEventListener("click", async () => {
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
     fetchStudentData(user.uid); 
     fetchResultsData(user.uid);
     setupEditButton(); 
     console.log(user.uid)
   } else {
      window.location.href = "./index.html";     
     console.error("No user is signed in.");
   }
 });

let currentStudentId = null;

async function fetchStudentData(userId) {
  const studentCollectionRef = collection(db, "student");
  const q = query(studentCollectionRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const studentDetailsDiv = document.getElementById("student");
    studentDetailsDiv.innerHTML = ""; 

    if (querySnapshot.empty) {
      studentDetailsDiv.innerHTML = "<p>No data found for this user.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      currentStudentId = doc.id; 
      studentDetailsDiv.innerHTML = `
                <p><strong>First Name:</strong> <span id="first-name">${data.firstName}</span></p>
                <p><strong>Last Name:</strong> <span id="last-name">${data.lastName}</span></p>
                <p><strong>Email:</strong> <span id="email">${data.email}</span></p>
                <p><strong>CNIC:</strong> <span id="cnic">${data.cnic}</span></p>                
            `;
    });

    const editButton = document.getElementById("edit");
    if (editButton) {
      editButton.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching student data: ", error);
  }
}

async function fetchResultsData(userId) {
  const resultsCollectionRef = collection(db, "results");
  const q = query(resultsCollectionRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    if (querySnapshot.empty) {
      resultsDiv.innerHTML = "<p>No results found for this user.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const result = doc.data();
      resultsDiv.innerHTML += `
                <div>
                    <h3 class="font-semibold">Course: ${result.course}</h3>
                    <p>Total Marks: ${result.totalMarks}</p>
                    <p>Marks: ${result.marks}</p>
                    <p>Grade: ${result.grade}</p> 
                </div>
            `;
    });
  } catch (error) {
    console.error("Error fetching results data: ", error);
  }
}

function setupEditButton() {
  const editButton = document.getElementById("edit");
  if (!editButton) return; 

  editButton.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").innerText;
    const lastName = document.getElementById("last-name").innerText;
    const cnic = document.getElementById("cnic").innerText;

    const editForm = `
      <h3 class="h3">Edit Your Details</h3>
      <input type="text" id="edit-first-name"  placeholder="First Name" value="${firstName}">
      <input type="text" id="edit-last-name"  placeholder="Last Name" value="${lastName}">
      <input type="text" id="edit-cnic"  placeholder="CNIC" value="${cnic}">
      <button id="save-btn">Save Changes</button>
    `;

    document.getElementById("student").innerHTML = editForm; 

    document.getElementById("save-btn").addEventListener("click", async () => {
      const updatedData = {
        firstName: document.getElementById("edit-first-name").value,
        lastName: document.getElementById("edit-last-name").value,
        cnic: document.getElementById("edit-cnic").value,
      };

      try {
        const studentDocRef = doc(db, "student", currentStudentId);
        await updateDoc(studentDocRef, updatedData);
        Swal.fire({
            title: "success",
            text: "Details updated successfully!",
            icon: "success"
         });
        fetchStudentData(auth.currentUser.uid); 
      } catch (error) {
         const errorMessage = error.message;
        console.error("Error updating document: ", error);
        Swal.fire({
         title: "Failed to update details.",
         text: errorMessage,
         icon: "error"
       });
      }
    });
  });
}
