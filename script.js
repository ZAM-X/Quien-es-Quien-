/* script.js */
const categorySelect = document.getElementById('categorySelect');
const gameBoard = document.getElementById('gameBoard');
const assignBtn = document.getElementById('assignBtn');

window.onload = () => {
    // Llenar categorías
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
    gameBoard.innerHTML = '';
    
    // Usar los items de la data proporcionada
    let items = [...gameData[catKey].items];
    items.sort(() => Math.random() - 0.5);

    items.forEach(name => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        // Fallback dinámico si no hay fotos locales
        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
        
        card.innerHTML = `<span>${name}</span>`;
        card.prepend(img);
        
        // Evento simple para evitar conflictos de scroll
        card.onclick = () => card.classList.toggle('discarded');
        
        gameBoard.appendChild(card);
    });
}

categorySelect.onchange = () => {
    startGame(categorySelect.value);
};

assignBtn.onclick = () => {
    const items = gameData[categorySelect.value].items;
    const random = items[Math.floor(Math.random() * items.length)];
    alert("Tu personaje es: " + random);
};
