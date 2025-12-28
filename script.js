/* script.js */

// Referencias DOM
const categorySelect = document.getElementById('categorySelect');
const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');

// Referencias Panel Identidad
const assignBtn = document.getElementById('assignBtn');
const hiddenState = document.getElementById('hiddenState');
const revealedState = document.getElementById('revealedState');
const secretImg = document.getElementById('secretImg');
const secretName = document.getElementById('secretName');
const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');

let currentItems = [];

// Inicialización
function init() {
    loadCategories();
    // Seleccionar la primera categoría por defecto
    const firstCat = Object.keys(gameData)[0];
    startGame(firstCat);
}

function loadCategories() {
    for (const key in gameData) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = gameData[key].title;
        categorySelect.appendChild(option);
    }
}

function startGame(categoryKey) {
    // 1. Limpiar tablero
    gameBoard.innerHTML = '';
    
    // 2. Resetear panel de identidad
    resetIdentityPanel();

    // 3. Obtener y mezclar items
    const items = [...gameData[categoryKey].items];
    shuffleArray(items);
    currentItems = items;

    // 4. Generar cartas
    items.forEach(name => {
        const card = createCard(name);
        gameBoard.appendChild(card);
    });
}

function createCard(name) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Generar Avatar basado en el nombre (API Gratuita)
    const bgColors = ['6c5ce7', '00cec9', 'fab1a0', 'fd79a8', '0984e3', 'e17055'];
    const color = bgColors[name.length % bgColors.length]; // Color consistente por nombre
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128&bold=true`;

    card.innerHTML = `
        <img src="${avatarUrl}" alt="${name}" loading="lazy">
        <span>${name}</span>
    `;

    // Evento Click
    card.addEventListener('click', () => {
        // Vibración táctil (Android)
        if (navigator.vibrate) navigator.vibrate(15);
        card.classList.toggle('discarded');
    });

    return card;
}

// Algoritmo Fisher-Yates para mezclar
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- Lógica de Identidad Secreta ---

function resetIdentityPanel() {
    hiddenState.classList.remove('hidden');
    revealedState.classList.add('hidden');
    secretName.textContent = '';
    toggleVisibilityBtn.textContent = '🙈 Ocultar';
    revealedState.style.opacity = '1';
}

assignBtn.addEventListener('click', () => {
    if (currentItems.length === 0) return;

    // Elegir personaje al azar
    const randomName = currentItems[Math.floor(Math.random() * currentItems.length)];
    
    // Configurar UI
    const bgColors = ['6c5ce7', '00cec9', 'fab1a0', 'fd79a8', '0984e3', 'e17055'];
    const color = bgColors[randomName.length % bgColors.length];
    
    secretName.textContent = randomName;
    secretImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(randomName)}&background=${color}&color=fff&size=128&bold=true`;

    // Mostrar
    hiddenState.classList.add('hidden');
    revealedState.classList.remove('hidden');
});

toggleVisibilityBtn.addEventListener('click', () => {
    // Alternar visibilidad sin borrar el personaje
    if (revealedState.style.opacity === '0') {
        revealedState.style.opacity = '1';
        toggleVisibilityBtn.textContent = '🙈 Ocultar';
    } else {
        revealedState.style.opacity = '0';
        toggleVisibilityBtn.textContent = '👁️ Ver';
    }
});

// Eventos Globales
categorySelect.addEventListener('change', (e) => {
    startGame(e.target.value);
});

resetBtn.addEventListener('click', () => {
    // Animación simple de rotación
    resetBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => resetBtn.style.transform = 'none', 300);
    startGame(categorySelect.value);
});

// Arrancar app
init();