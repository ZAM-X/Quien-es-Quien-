 script.js 
const categorySelect = document.getElementById('categorySelect');
const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');
const assignBtn = document.getElementById('assignBtn');
const hiddenState = document.getElementById('hiddenState');
const revealedState = document.getElementById('revealedState');
const secretImg = document.getElementById('secretImg');
const secretName = document.getElementById('secretName');
const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');

let currentItems = [];

 Limpia nombres para archivos Michael Jackson - michaeljackson
function cleanName(name) {
    return name.toLowerCase()
        .normalize(NFD).replace([u0300-u036f]g, )
        .replace(s+g, '');
}

function getImagePath(name, category) {
    return `img${category}${cleanName(name)}.png`;
}

function getBackupImg(name) {
    return `httpsui-avatars.comapiname=${encodeURIComponent(name)}&background=random&color=fff`;
}

function init() {
    for (const key in gameData) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = gameData[key].title;
        categorySelect.appendChild(opt);
    }
    startGame(categorySelect.value);
}

function startGame(catKey) {
    gameBoard.innerHTML = '';
    hiddenState.classList.remove('hidden');
    revealedState.classList.add('hidden');
    
    currentItems = [...gameData[catKey].items];
    currentItems.sort(() = Math.random() - 0.5);

    currentItems.forEach(name = {
        const card = document.createElement('div');
        card.className = 'card';
        const img = document.createElement('img');
        img.src = getImagePath(name, catKey);
        img.onerror = () = img.src = getBackupImg(name);
        
        card.innerHTML = `span${name}span`;
        card.prepend(img);
        card.onclick = () = card.classList.toggle('discarded');
        gameBoard.appendChild(card);
    });
}

assignBtn.onclick = () = {
    const random = currentItems[Math.floor(Math.random()  currentItems.length)];
    secretName.textContent = random;
    secretImg.src = getImagePath(random, categorySelect.value);
    secretImg.onerror = () = secretImg.src = getBackupImg(random);
    hiddenState.classList.add('hidden');
    revealedState.classList.remove('hidden');
};

toggleVisibilityBtn.onclick = () = {
    revealedState.style.opacity = revealedState.style.opacity === '0.1'  '1'  '0.1';
};

categorySelect.onchange = () = startGame(categorySelect.value);
resetBtn.onclick = () = startGame(categorySelect.value);

init();