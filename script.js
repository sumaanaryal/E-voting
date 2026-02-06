import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// YOUR REAL CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCVtWzM5URktOLbSYadPDUW8fMURI2TE8w",
  authDomain: "e-voting2082.firebaseapp.com",
  databaseURL: "https://e-voting2082-default-rtdb.firebaseio.com",
  projectId: "e-voting2082",
  storageBucket: "e-voting2082.firebasestorage.app",
  messagingSenderId: "546021327219",
  appId: "1:546021327219:web:4517f75740c8d4b6a84506"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Data Object
let votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

// NAVIGATION
function showPage(pageId) {
    document.querySelectorAll('.card').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// LOGIN LOGIC
function startApp() {
    const nameInput = document.getElementById('parentName').value.trim();
    const idInput = document.getElementById('voterId').value.trim();

    if (nameInput === "" || idInput === "") {
        alert("Please enter Name and Voter ID!");
        return;
    }

    votes.parent = nameInput;
    votes.voter = idInput;
    showPage('page1');
}

// SELECTION LOGIC
function selectOption(category, value) {
    votes[category] = value;
    
    // Auto-advance for categories, except overall
    if (category === 'science') showPage('page2');
    if (category === 'art') showPage('page3');
    if (category === 'craft') showPage('page4');
}

// FIREBASE SUBMIT
async function submitVote() {
    if (!votes.overall) {
        alert("Please select an Overall Rating first!");
        return;
    }

    try {
        const voteRef = ref(db, 'votes');
        await push(voteRef, {
            ...votes,
            timestamp: new Date().toLocaleString()
        });
        
        showPage('result');
    } catch (error) {
        console.error(error);
        alert("Connection Error! Vote not saved.");
    }
}

// ATTACH TO WINDOW (So HTML buttons can see them)
window.startApp = startApp;
window.showPage = showPage;
window.selectOption = selectOption;
window.submitVote = submitVote;
