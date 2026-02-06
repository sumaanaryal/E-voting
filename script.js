import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

let currentPage = 0;
const votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

function startApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';
}

async function nextPage() {
    if (currentPage === 0) {
        const nameInput = document.getElementById('parentName').value.trim();
        const idInput = document.getElementById('voterId').value.trim();
        const idNum = parseInt(idInput);

        // 1. Check if fields are empty
        if (!nameInput || !idInput) {
            alert("Please enter both Name and Voter ID!");
            return;
        }

        // 2. STRICTOR CHECK: Range 1 to 400
        if (idNum < 1 || idNum > 400) {
            alert("Access Denied: Voter ID must be between 1 and 400.");
            return;
        }

        // 3. STRICTOR CHECK: Duplicate ID in Database
        try {
            const votesRef = ref(db, 'votes');
            // Querying the database to see if this 'voter' ID already exists
            const idQuery = query(votesRef, orderByChild('voter'), equalTo(idInput));
            const snapshot = await get(idQuery);

            if (snapshot.exists()) {
                alert("Security Alert: This Voter ID has already been used!");
                return;
            }
        } catch (error) {
            console.error("Database check error:", error);
        }

        votes.parent = nameInput;
        votes.voter = idInput;
    }

    document.getElementById(`page-${currentPage}`).classList.remove('active');
    currentPage++;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

function prevPage() {
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    currentPage--;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

function selectOption(category, value) {
    votes[category] = value;
}

async function submitVote() {
    if (!votes.overall) {
        alert("Please provide an overall rating!");
        return;
    }

    try {
        await push(ref(db, 'votes'), {
            ...votes,
            timestamp: new Date().toLocaleString()
        });
        
        document.getElementById('page-4').classList.remove('active');
        document.getElementById('result').classList.add('active');
        
        // Reload for next user after 5 seconds
        setTimeout(() => location.reload(), 5000);
    } catch (e) {
        alert("Error saving vote. Check your internet.");
    }
}

// Attach functions to window
window.startApp = startApp;
window.nextPage = nextPage;
window.prevPage = prevPage;
window.selectOption = selectOption;
window.submitVote = submitVote;
