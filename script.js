/* script.js */
const categorySelect = document.getElementById('categorySelect');
const gameBoard = document.getElementById('gameBoard');
const assignBtn = document.getElementById('assignBtn');
const toggleBtn = document.getElementById('toggleVisibilityBtn');
const secretContainer = document.querySelector('.secret-info');

window.onload = () => {
    if (typeof gameData !== 'undefined') {
        Object.keys(gameData).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = gameData[key].title;
            categorySelect.appendChild(opt);
        });
        startGame(categorySelect.value);
    }
};

function startGame(catKey) {
    // Limpiar tablero y resetear panel de personaje
    gameBoard.innerHTML = '';
    document.getElementById('hiddenState').classList.remove('hidden');
    document.getElementById('revealedState').classList.add('hidden');
    
    let items = [...gameData[catKey].items];
    items.sort(() => Math.random() - 0.5);

    items.forEach(name => {
        const card = document.createElement('div');
        card.className = 'card';
        const img = document.createElement('img');
        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
        
        card.innerHTML = `<span>${name}</span>`;
        card.prepend(img);
        card.onclick = () => card.classList.toggle('discarded');
        gameBoard.appendChild(card);
    });
}

// Lógica de Asignar Personaje
assignBtn.onclick = () => {
    const items = gameData[categorySelect.value].items;
    const random = items[Math.floor(Math.random() * items.length)];
    
    document.getElementById('secretName').textContent = random;
    document.getElementById('secretImg').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(random)}&background=6c5ce7&color=fff`;
    
    document.getElementById('hiddenState').classList.add('hidden');
    document.getElementById('revealedState').classList.remove('hidden');
    secretContainer.classList.remove('blurred'); // Empieza visible
};

// Lógica de Censurar / Ocultar
toggleBtn.onclick = () => {
    secretContainer.classList.toggle('blurred');
    toggleBtn.textContent = secretContainer.classList.contains('blurred') ? "👁️ Ver" : "🙈 Ocultar";
};

categorySelect.onchange = () => startGame(categorySelect.value);
