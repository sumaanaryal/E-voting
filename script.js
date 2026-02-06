// 1. Firebase Imports (Module version for GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. Your Specific Config (Saved for you)
const firebaseConfig = {
  apiKey: "AIzaSyCVtWzM5URktOLbSYadPDUW8fMURI2TE8w",
  authDomain: "e-voting2082.firebaseapp.com",
  databaseURL: "https://e-voting2082-default-rtdb.firebaseio.com",
  projectId: "e-voting2082",
  storageBucket: "e-voting2082.firebasestorage.app",
  messagingSenderId: "546021327219",
  appId: "1:546021327219:web:4517f75740c8d4b6a84506",
  measurementId: "G-MSP4LBLY9X"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 4. State Management
const votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

// 5. Function: Display Control
function showPage(pageId) {
    document.querySelectorAll('.card').forEach(p => p.style.display = 'none');
    const target = document.getElementById(pageId);
    if (target) target.style.display = 'flex';
}

// 6. Function: Login Start
function startApp() {
    const pName = document.getElementById('parentName').value;
    const vId = document.getElementById('voterId').value;
    
    if (!pName || !vId) {
        alert("Please enter both Name and Voter ID!");
        return;
    }
    
    votes.parent = pName;
    votes.voter = vId;
    showPage('page1');
}

// 7. Function: Selection Logic
function selectOption(category, value) {
    votes[category] = value;
    
    // Auto-advance after selection
    setTimeout(() => {
        if (category === 'science') showPage('page2');
        else if (category === 'art') showPage('page3');
        else if (category === 'craft') showPage('page4');
        else if (category === 'overall') submitVote();
    }, 300);
}

// 8. Function: Permanent Storage (The Cloud Part)
async function submitVote() {
    try {
        console.log("Saving vote...", votes);
        const voteRef = ref(db, 'votes');
        
        // Push creates a unique ID for every voter automatically
        await push(voteRef, {
            ...votes,
            timestamp: new Date().toLocaleString()
        });

        // SUCCESS: Move to the result page
        showPage('result');
        console.log("Data saved successfully!");

    } catch (error) {
        console.error("Firebase Error:", error);
        alert("Submission failed! Error: " + error.message);
    }
}

// 9. FIX: Expose functions to the HTML buttons
// Since this is a 'module', we must attach functions to 'window' 
// so buttons like onclick="startApp()" can find them.
window.startApp = startApp;
window.selectOption = selectOption;
window.submitVote = submitVote;
