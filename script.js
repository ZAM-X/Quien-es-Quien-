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
    // Seleccionar la primera categoría por defecto y arrancar
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
    // 1. Limpiar tablero visual
    gameBoard.innerHTML = '';
    
    // 2. Resetear panel de identidad a "Oculto"
    resetIdentityPanel();

    // 3. Obtener lista de items
    // IMPORTANTE: Clonamos el array para no modificar el original
    const items = [...gameData[categoryKey].items];
    
    // 4. Barajar las cartas del tablero
    shuffleArray(items);
    currentItems = items; // Guardamos el estado actual para la lógica

    // 5. Generar cartas en el DOM
    items.forEach(name => {
        const card = createCard(name);
        gameBoard.appendChild(card);
    });
}

function createCard(name) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Generar Avatar consistente basado en el nombre
    // Usamos UI-Avatars porque no requiere base de datos de imágenes externa
    const bgColors = ['6c5ce7', '00cec9', 'fab1a0', 'fd79a8', '0984e3', 'e17055', '00b894', 'd63031'];
    const color = bgColors[name.length % bgColors.length];
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128&bold=true&length=2`;

    card.innerHTML = `
        <img src="${avatarUrl}" alt="${name}" loading="lazy">
        <span>${name}</span>
    `;

    // Evento Click: Descartar / Reactivar
    card.addEventListener('click', () => {
        // Pequeña vibración en Android
        if (navigator.vibrate) navigator.vibrate(10);
        card.classList.toggle('discarded');
    });

    return card;
}

// Algoritmo Fisher-Yates para mezclar aleatoriamente
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
    
    // Resetear estado de visibilidad
    toggleVisibilityBtn.textContent = '🙈 Ocultar';
    document.querySelector('.secret-card-mini').style.filter = 'none';
}

assignBtn.addEventListener('click', () => {
    // Escoger uno al azar de la categoría actual (NO de los que quedan en el tablero, sino del total)
    // Esto simula "sacar una carta del mazo"
    const currentCategoryKey = categorySelect.value;
    const allItems = gameData[currentCategoryKey].items;
    const randomName = allItems[Math.floor(Math.random() * allItems.length)];
    
    // Generar misma imagen que en el tablero
    const bgColors = ['6c5ce7', '00cec9', 'fab1a0', 'fd79a8', '0984e3', 'e17055', '00b894', 'd63031'];
    const color = bgColors[randomName.length % bgColors.length];
    
    secretName.textContent = randomName;
    secretImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(randomName)}&background=${color}&color=fff&size=128&bold=true&length=2`;

    // Mostrar panel revelado
    hiddenState.classList.add('hidden');
    revealedState.classList.remove('hidden');
    
    // Vibración de confirmación
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
});

toggleVisibilityBtn.addEventListener('click', () => {
    const infoContainer = document.querySelector('.secret-card-mini');
    
    // Alternar visibilidad (borroso vs claro)
    if (infoContainer.style.filter === 'blur(10px)') {
        infoContainer.style.filter = 'none';
        toggleVisibilityBtn.textContent = '🙈 Ocultar';
    } else {
        infoContainer.style.filter = 'blur(10px)';
        toggleVisibilityBtn.textContent = '👁️ Ver';
    }
});

// Eventos Globales de Controles
categorySelect.addEventListener('change', (e) => {
    startGame(e.target.value);
});

resetBtn.addEventListener('click', () => {
    // Animación de rotación del icono
    resetBtn.style.transition = 'transform 0.4s ease';
    resetBtn.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        resetBtn.style.transform = 'none';
        resetBtn.style.transition = 'none';
    }, 400);

    startGame(categorySelect.value);
});

// Arrancar App
init();