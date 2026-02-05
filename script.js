let currentPage = 0;
const votes = { parent: '', voter: '', science: '', art: '', craft: '', overall: '' };

function startApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';
    showPage(0);
}

// Logic for input growing/shrinking
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

function submitVote() {
    if (!votes.overall) return alert("Select a rating.");
    showPage('result');
}