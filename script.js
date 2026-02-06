// 1. Firebase Imports (CDN version for GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. Your Web App's Firebase configuration
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

// --- YOUR ORIGINAL VOTING LOGIC ---
let currentPage = 0;
const votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

function startApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';
    showPage(0);
}

function focusInput(type) {
    const pGrp = document.getElementById('group-parent');
    const iGrp = document.getElementById('group-id');
    if(type === 'parent') {
        pGrp.className = 'input-group focused';
        iGrp.className = 'input-group shrunk';
    } else {
        iGrp.className = 'input-group focused';
        pGrp.className = 'input-group shrunk';
    }
}

function showPage(n) {
    const current = document.querySelector('.card.active');
    if (current) {
        current.classList.replace('active', 'exit');
        setTimeout(() => current.classList.remove('exit'), 500);
    }
    const next = document.getElementById(`page-${n}`) || document.getElementById('result');
    setTimeout(() => {
        next.classList.add('active');
    }, 50);
}

function nextPage() {
    if (currentPage === 0) {
        const name = document.getElementById('parentName').value.trim();
        const id = document.getElementById('voterId').value;
        if (!name || !id || id < 1 || id > 400) {
            alert("Please enter Name and Voter ID (1-400)");
            return;
        }
        votes.parent = name;
        votes.voter = id;
    } else {
        const keys = [null, 'science', 'art', 'craft', 'overall'];
        if (keys[currentPage] && !votes[keys[currentPage]]) {
            alert("Please make a selection.");
            return;
        }
    }
    if (currentPage < 4) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function selectOption(s, v) { votes[s] = v; }

// 4. UPDATED SUBMIT FUNCTION
async function submitVote() {
    if (!votes.overall) return alert("Select a rating.");
    
    try {
        const voteRef = ref(db, 'votes');
        const newVoteRef = push(voteRef);
        
        await set(newVoteRef, {
            ...votes,
            timestamp: new Date().toLocaleString()
        });

        showPage('result');
    } catch (error) {
        console.error("Firebase Error:", error);
        alert("Connection error. Please check your internet and try again.");
    }
}

// 5. EXPOSE TO WINDOW (Crucial for HTML Buttons)
window.startApp = startApp;
window.nextPage = nextPage;
window.prevPage = prevPage;
window.selectOption = selectOption;
window.submitVote = submitVote;
window.focusInput = focusInput;
