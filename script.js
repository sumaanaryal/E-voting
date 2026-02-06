import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// YOUR CONFIG (REMEMBERED)
const firebaseConfig = {
  apiKey: "AIzaSyCVtWzM5URktOLbSYadPDUW8fMURI2TE8w",
  authDomain: "e-voting2082.firebaseapp.com",
  databaseURL: "https://e-voting2082-default-rtdb.firebaseio.com",
  projectId: "e-voting2082",
  storageBucket: "e-voting2082.firebasestorage.app",
  messagingSenderId: "546021327219",
  appId: "1:546021327219:web:4517f75740c8d4b6a84506"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// GLOBAL STATE
let currentPage = 0;
const votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

// 1. START APP (HIDE LANDING, SHOW CONTAINER)
function startApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';
}

// 2. NEXT PAGE (WITH LOGIN VALIDATION)
function nextPage() {
    if (currentPage === 0) {
        const name = document.getElementById('parentName').value.trim();
        const id = document.getElementById('voterId').value.trim();
        if (!name || !id) return alert("Please enter Name and Voter ID!");
        votes.parent = name;
        votes.voter = id;
    }

    document.getElementById(`page-${currentPage}`).classList.remove('active');
    currentPage++;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

// 3. PREVIOUS PAGE
function prevPage() {
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    currentPage--;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

// 4. SELECT OPTIONS (DROPDOWNS)
function selectOption(category, value) {
    votes[category] = value;
}

// 5. SUBMIT TO FIREBASE
async function submitVote() {
    if (!votes.overall) return alert("Please select an Overall Rating!");

    try {
        const voteRef = ref(db, 'votes');
        await push(voteRef, {
            ...votes,
            timestamp: new Date().toLocaleString()
        });
        
        // Success: Hide final card, show success
        document.getElementById('page-4').classList.remove('active');
        document.getElementById('result').classList.add('active');

        // Reset for next user after 6 seconds
        setTimeout(() => location.reload(), 6000);

    } catch (e) {
        console.error(e);
        alert("Submission failed. Check your internet.");
    }
}

// 6. ATTACH TO WINDOW (Crucial for onclick to work)
window.startApp = startApp;
window.nextPage = nextPage;
window.prevPage = prevPage;
window.selectOption = selectOption;
window.submitVote = submitVote;
