/* script.js - Lógica del Tablero Virtual */

// 1. Referencias a los elementos del HTML
const board = document.getElementById('board');
const categorySelect = document.getElementById('categorySelect');
const resetBtn = document.getElementById('resetBtn');

// Referencias de la sección de Identidad
const pickIdentityBtn = document.getElementById('pickIdentityBtn');
const toggleIdentityBtn = document.getElementById('toggleIdentityBtn');
const secretCard = document.getElementById('secretCard');
const secretAvatar = document.getElementById('secretAvatar');
const secretName = document.getElementById('secretName');

// Variables de estado
let currentItems = [];
const avatarColors = ['#ff7675', '#74b9ff', '#55efc4', '#a29bfe', '#fdcb6e', '#e17055', '#00cec9', '#6c5ce7'];

// 2. Función de inicio
function init() {
    // Comprobar si gameData existe (viene de data.js)
    if (typeof gameData === 'undefined') {
        console.error("Error: No se encontró gameData. Asegúrate de que data.js esté cargado correctamente.");
        return;
    }

    // Llenar el selector de categorías
    for (const key in gameData) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = gameData[key].title;
        categorySelect.appendChild(option);
    }

    // Iniciar con la primera categoría disponible
    startGame(categorySelect.value);
}

// 3. Función para montar el tablero
function startGame(catKey) {
    // Limpiar el tablero actual
    board.innerHTML = '';
    
    // Resetear el estado de la identidad secreta
    resetIdentitySection();

    // Obtener los nombres de la categoría y mezclarlos
    currentItems = [...gameData[catKey].items];
    currentItems.sort(() => Math.random() - 0.5);

    // Crear cada carta físicamente en el HTML
    currentItems.forEach(name => {
        const cardElement = createCardElement(name);
        board.appendChild(cardElement);
    });
}

// 4. Crear el elemento visual de la carta
function createCardElement(name) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const initials = getInitials(name);
    const color = getColorFromName(name);

    card.innerHTML = `
        <div class="avatar" style="background-color: ${color}">${initials}</div>
        <div class="name">${name}</div>
    `;

    // Evento para descartar carta
    card.addEventListener('click', () => {
        card.classList.toggle('discarded');
        // Pequeña vibración en móviles si es posible
        if (navigator.vibrate) navigator.vibrate(15);
    });

    return card;
}

// 5. Lógica de Identidad Secreta (Personaje asignado)
pickIdentityBtn.addEventListener('click', () => {
    if (currentItems.length === 0) return;

    // Elegir uno al azar
    const randomName = currentItems[Math.floor(Math.random() * currentItems.length)];
    
    // Asignar datos visuales
    secretName.textContent = randomName;
    secretAvatar.textContent = getInitials(randomName);
    secretAvatar.style.backgroundColor = getColorFromName(randomName);

    // Mostrar y quitar el borroso inicial para que el usuario lo vea
    secretCard.classList.remove('blur-active');
    toggleIdentityBtn.textContent = '🙈 Ocultar';
    pickIdentityBtn.style.display = 'none'; // Desaparece para no elegir otro por error
});

// Botón para alternar el efecto borroso (Blur)
toggleIdentityBtn.addEventListener('click', () => {
    const isBlurred = secretCard.classList.contains('blur-active');
    if (isBlurred) {
        secretCard.classList.remove('blur-active');
        toggleIdentityBtn.textContent = '🙈 Ocultar';
    } else {
        secretCard.classList.add('blur-active');
        toggleIdentityBtn.textContent = '👁️ Mostrar';
    }
});

// 6. Funciones de apoyo (Helpers)
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getColorFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
}

function resetIdentitySection() {
    secretCard.classList.add('blur-active');
    secretName.textContent = '???';
    secretAvatar.textContent = '?';
    secretAvatar.style.backgroundColor = '#333';
    toggleIdentityBtn.textContent = '👁️ Mostrar';
    pickIdentityBtn.style.display = 'block';
}

// Eventos de control superior
categorySelect.addEventListener('change', (e) => startGame(e.target.value));
resetBtn.addEventListener('click', () => {
    if (confirm("¿Reiniciar la partida actual?")) {
        startGame(categorySelect.value);
    }
});

// Arrancar la aplicación al cargar el archivo
init();
