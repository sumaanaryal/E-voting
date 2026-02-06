<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Voting Portal | Exhibition 2082</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        /* ADDING YOUR ORIGINAL CSS CLASSES BACK EXACTLY */
        body { font-family: 'Inter', sans-serif; margin: 0; background: #f0f2f5; }
        #landing { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: #4f46e5; color: white; }
        .voter-badge { background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; }
        .category-header { letter-spacing: 2px; font-size: 14px; margin-top: 20px; }
        .main-title { font-size: 48px; font-weight: 900; margin: 10px 0; }
        .start-btn { background: white; color: #4f46e5; border: none; padding: 15px 30px; border-radius: 5px; font-weight: bold; cursor: pointer; }
        
        .container { max-width: 500px; margin: 50px auto; padding: 20px; }
        .card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: none; text-align: center; }
        .card.active { display: block; }
        
        .input-group { display: flex; align-items: center; background: #f3f4f6; padding: 10px; border-radius: 8px; margin-bottom: 15px; }
        .input-group input { border: none; background: transparent; padding: 10px; width: 100%; outline: none; }
        .enter-btn { background: #4f46e5; color: white; border: none; width: 100%; padding: 15px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        
        .nav-btns { display: flex; justify-content: space-between; margin-top: 20px; }
        .arrow-btn { background: #4f46e5; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 20px; }
        
        select { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; margin: 15px 0; }
        .success-icon { font-size: 50px; margin-bottom: 10px; }
    </style>
</head>
<body>

<section id="landing">
    <div class="landing-content">
        <div class="voter-badge">OFFICIAL E-VOTING SYSTEM</div>
        <h2 class="category-header">SCIENCE <span class="dot">.</span> CRAFT <span class="dot">.</span> ART</h2>
        <h1 class="main-title">Exhibition 2082</h1>
        <p class="subtitle">Securely cast your vote for the best classroom project.</p>
        <button type="button" onclick="startApp()" class="start-btn">GET STARTED</button>
    </div>
</section>

<div class="container" id="main-container" style="display: none;">

    <div class="card active" id="page-0">
        <div class="voter-badge" style="margin-bottom: 10px; color: #4f46e5;">VERIFICATION</div>
        <h3>Secure Login</h3>
        <div class="input-group" id="group-parent">
            <span class="icon">👤</span>
            <input type="text" id="parentName" placeholder="Parent Name" autocomplete="off">
        </div>
        <div class="input-group" id="group-id">
            <span class="icon">🆔</span>
            <input type="number" id="voterId" placeholder="Voter ID (1-400)">
        </div>
        <button type="button" onclick="nextPage()" class="enter-btn">ENTER SYSTEM</button>
    </div>

    <div class="card" id="page-1">
        <div class="bg-icon">🧪</div>
        <h3>Science Exhibition</h3>
        <p class="question">Which class did you like most for the science exhibition?</p>
        <select id="sel-science" onchange="selectOption('science', this.value)">
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option><option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option><option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option><option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option><option value="Class 9">Class 9</option>
        </select>
        <div class="nav-btns">
            <button type="button" onclick="prevPage()" class="arrow-btn">←</button>
            <button type="button" onclick="nextPage()" class="arrow-btn">→</button>
        </div>
    </div>

    <div class="card" id="page-2">
        <div class="bg-icon">🎨</div>
        <h3>Art Exhibition</h3>
        <p class="question">Which class did you like most for the art exhibition?</p>
        <select id="sel-art" onchange="selectOption('art', this.value)">
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option><option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option><option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option><option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option><option value="Class 9">Class 9</option>
        </select>
        <div class="nav-btns">
            <button type="button" onclick="prevPage()" class="arrow-btn">←</button>
            <button type="button" onclick="nextPage()" class="arrow-btn">→</button>
        </div>
    </div>

    <div class="card" id="page-3">
        <div class="bg-icon">✂️</div>
        <h3>Craft Exhibition</h3>
        <p class="question">Which class did you like most for the craft exhibition?</p>
        <select id="sel-craft" onchange="selectOption('craft', this.value)">
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option><option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option><option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option><option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option><option value="Class 9">Class 9</option>
        </select>
        <div class="nav-btns">
            <button type="button" onclick="prevPage()" class="arrow-btn">←</button>
            <button type="button" onclick="nextPage()" class="arrow-btn">→</button>
        </div>
    </div>

    <div class="card" id="page-4">
        <h3>⭐ Overall Rating</h3>
        <p class="question">How would you rate your experience today?</p>
        <select id="sel-overall" onchange="selectOption('overall', this.value)">
            <option value="">Choose a rating</option>
            <option value="1">1 - Poor</option><option value="2">2 - Fair</option>
            <option value="3">3 - Good</option><option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
        </select>
        <div class="nav-btns">
            <button type="button" onclick="prevPage()" class="arrow-btn">←</button>
            <button type="button" onclick="submitVote()" class="arrow-btn">→</button>
        </div>
    </div>

    <div class="card" id="result">
        <div class="success-icon">🏆</div>
        <h3>Vote Recorded</h3>
        <p>Thank you for participating!</p>
    </div>

</div>

<script>
    /* SIMPLE LOGIC - NO THEME CHANGES */
    let currentStep = 0;
    let votes = { science: "", art: "", craft: "", overall: "" };

    function startApp() {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    }

    function nextPage() {
        if (currentStep === 0) {
            if (!document.getElementById('parentName').value || !document.getElementById('voterId').value) {
                alert("Please fill in your details.");
                return;
            }
        }
        
        document.getElementById(`page-${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`page-${currentStep}`).classList.add('active');
    }

    function prevPage() {
        document.getElementById(`page-${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`page-${currentStep}`).classList.add('active');
    }

    function selectOption(category, value) {
        votes[category] = value;
    }

    function submitVote() {
        if (!votes.science || !votes.art || !votes.craft || !votes.overall) {
            alert("Please complete all sections.");
            return;
        }
        document.getElementById(`page-${currentStep}`).classList.remove('active');
        document.getElementById('result').classList.add('active');
    }
</script>
</body>
</html>
