// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

// Check for saved theme or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Set initial theme
if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
    document.body.classList.replace('dark-mode', 'light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light Mode';
} else {
    document.body.classList.add('dark-mode');
    themeIcon.classList.add('fa-moon');
    themeText.textContent = 'Dark Mode';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.replace('dark-mode', 'light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
        document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Certificate Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        certificateCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Enhanced Certificate Modal
const certificateModal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalCertificateImage');
const modalTitle = document.getElementById('modalCertificateTitle');
const modalProvider = document.getElementById('modalCertificateProvider');
const modalDate = document.getElementById('modalCertificateDate');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalSkills = document.getElementById('modalCertificateSkills');
const modalClose = document.getElementById('certificateModalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentModalIndex = 0;
let filteredCertificates = Array.from(certificateCards);

// Certificate data array
const certificateData = [
    {
        title: "Networking Basics",
        provider: "Netacad",
        date: "Issued: 2025",
        image: "assets/images/pic1.png",
        description: "Completed comprehensive course covering the foundation of networking and network devices, media, and protocols. You will observe data flowing through a network and configure devices to connect to networks.",
        skills: ["Networking", "Cisco Packet Tracer"]
    },
    {
        title: "Introduction to CSS",
        provider: "TESDA",
        date: "Issued: 2024",
        image: "assets/images/pic2.png",
        description: "Completed the prerequisite module for Computer Systems Servicing NC II. This course covers fundamental computer concepts and system servicing basics.",
        skills: ["Computer Fundamentals", "CSS"]
    },
    {
        title: "Installing and Configuring Computer Systems",
        provider: "TESDA",
        date: "Issued: 2024",
        image: "assets/images/pic3.png",
        description: "Completed module about installing and configuring computer hardware and software, including system setup, driver installation, and basic troubleshooting.",
        skills: ["Computer System", "Hardware", "Software"]
    },
    {
        title: "Setting Up Computer Networks",
        provider: "TESDA",
        date: "Issued: 2024",
        image: "assets/images/pic4.png",
        description: "Completed comprehensive module on setting up computer networks, including network design, cable installation, router configuration, and network troubleshooting.",
        skills: ["Computer Networks", "Network Setup", "Troubleshooting"]
    },
    {
        title: "Setting Up Computer Servers",
        provider: "TESDA",
        date: "Issued: 2024",
        image: "assets/images/pic5.png",
        description: "Completed module on setting up computer servers, including server installation, configuration, user management, and server maintenance.",
        skills: ["Computer Server", "Server Configuration", "User Management"]
    },
    {
        title: "Maintaining Computer Systems and Networks",
        provider: "TESDA",
        date: "Issued: 2024",
        image: "assets/images/pic6.png",
        description: "Completed comprehensive module on maintaining computer systems and networks, including preventive maintenance, system optimization, and network security basics.",
        skills: ["Computer System", "Computer Network", "Maintenance", "Troubleshooting"]
    }
];

// Open modal when clicking on certificate card or view button
certificateCards.forEach((card, index) => {
    const viewBtn = card.querySelector('.view-btn');
    const cardImage = card.querySelector('.certificate-img');
    
    // Open modal when clicking anywhere on the card
    card.addEventListener('click', (e) => {
        // Don't open if clicking the filter button
        if (!e.target.closest('.filter-btn')) {
            openCertificateModal(index);
        }
    });
    
    // Also allow clicking the view button
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            openCertificateModal(index);
        });
    }
    
    // Also allow clicking the image
    if (cardImage) {
        cardImage.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            openCertificateModal(index);
        });
    }
});

function openCertificateModal(index) {
    currentModalIndex = index;
    updateModalContent();
    certificateModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function updateModalContent() {
    const cert = certificateData[currentModalIndex];
    
    modalImage.src = cert.image;
    modalImage.alt = cert.title;
    modalTitle.textContent = cert.title;
    modalProvider.textContent = cert.provider;
    modalDate.textContent = cert.date;
    modalDescription.textContent = cert.description;
    
    // Update skills
    modalSkills.innerHTML = '';
    cert.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'modal-skill-tag';
        skillTag.textContent = skill;
        modalSkills.appendChild(skillTag);
    });
    
    // Update navigation button states
    updateNavButtons();
}

function updateNavButtons() {
    modalPrev.disabled = currentModalIndex === 0;
    modalNext.disabled = currentModalIndex === certificateData.length - 1;
}

// Close modal
modalClose.addEventListener('click', () => {
    closeCertificateModal();
});

// Close modal when clicking outside content
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        closeCertificateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.classList.contains('show')) {
        closeCertificateModal();
    }
});

function closeCertificateModal() {
    certificateModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Navigation between certificates
modalPrev.addEventListener('click', () => {
    if (currentModalIndex > 0) {
        currentModalIndex--;
        updateModalContent();
    }
});

modalNext.addEventListener('click', () => {
    if (currentModalIndex < certificateData.length - 1) {
        currentModalIndex++;
        updateModalContent();
    }
});

// Keyboard navigation in modal
document.addEventListener('keydown', (e) => {
    if (!certificateModal.classList.contains('show')) return;
    
    if (e.key === 'ArrowLeft' && currentModalIndex > 0) {
        currentModalIndex--;
        updateModalContent();
    } else if (e.key === 'ArrowRight' && currentModalIndex < certificateData.length - 1) {
        currentModalIndex++;
        updateModalContent();
    }
});

// Update filtered certificates when filter changes
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update filtered certificates array
        if (filter === 'all') {
            filteredCertificates = Array.from(certificateCards);
        } else {
            filteredCertificates = Array.from(certificateCards).filter(card => 
                card.getAttribute('data-category') === filter
            );
        }
    });
});

// Preload images for better experience
window.addEventListener('load', () => {
    certificateData.forEach(cert => {
        const img = new Image();
        img.src = cert.image;
    });
});

// ========== SNAKE GAME IMPLEMENTATION ==========
const snakeCanvas = document.getElementById('snakeGameCanvas');
const snakeCtx = snakeCanvas.getContext('2d');
const snakeScoreElement = document.getElementById('snakeScore');
const snakeHighScoreElement = document.getElementById('snakeHighScore');
const snakeFinalScoreElement = document.getElementById('snakeFinalScore');
const snakeGameOverScreen = document.getElementById('snakeGameOverScreen');

const SNAKE_TILE_SIZE = 16;
const SNAKE_GRID_WIDTH = 25;
const SNAKE_GRID_HEIGHT = 25;
const INITIAL_GAME_SPEED = 120;

let snake = [];
let snakeFood = {};
let snakeDirection = 'RIGHT';
let snakeNextDirection = 'RIGHT';
let snakeRunning = false;
let snakeGameOver = false;
let snakeScore = 0;
let snakeHighScore = localStorage.getItem('snakeHighScore') || 0;
let snakePaused = false;
let snakeGameLoop = null;
let snakeGameSpeed = INITIAL_GAME_SPEED;

function initSnakeGame() {
    snakeCanvas.width = SNAKE_GRID_WIDTH * SNAKE_TILE_SIZE;
    snakeCanvas.height = SNAKE_GRID_HEIGHT * SNAKE_TILE_SIZE;
    setupMobileSnakeControls();
    startSnakeGame();
    snakeHighScoreElement.textContent = snakeHighScore;
}

function setupMobileSnakeControls() {
    const btnUp = document.getElementById('snakeBtnUp');
    const btnDown = document.getElementById('snakeBtnDown');
    const btnLeft = document.getElementById('snakeBtnLeft');
    const btnRight = document.getElementById('snakeBtnRight');

    // Prevent default touch behavior
    [btnUp, btnDown, btnLeft, btnRight].forEach(btn => {
        btn.addEventListener('touchstart', (e) => e.preventDefault());
    });

    btnUp.addEventListener('click', () => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'DOWN') snakeNextDirection = 'UP';
    });

    btnDown.addEventListener('click', () => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'UP') snakeNextDirection = 'DOWN';
    });

    btnLeft.addEventListener('click', () => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'RIGHT') snakeNextDirection = 'LEFT';
    });

    btnRight.addEventListener('click', () => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'LEFT') snakeNextDirection = 'RIGHT';
    });

    // Touch support for better mobile experience
    btnUp.addEventListener('touchstart', (e) => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'DOWN') snakeNextDirection = 'UP';
    });

    btnDown.addEventListener('touchstart', (e) => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'UP') snakeNextDirection = 'DOWN';
    });

    btnLeft.addEventListener('touchstart', (e) => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'RIGHT') snakeNextDirection = 'LEFT';
    });

    btnRight.addEventListener('touchstart', (e) => {
        if (snakeRunning && !snakePaused && snakeDirection !== 'LEFT') snakeNextDirection = 'RIGHT';
    });
}

function startSnakeGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    
    snakeDirection = 'RIGHT';
    snakeNextDirection = 'RIGHT';
    snakeScore = 0;
    snakeGameOver = false;
    snakeRunning = true;
    snakePaused = false;
    snakeGameSpeed = INITIAL_GAME_SPEED;
    
    updateSnakeScore();
    snakeGameOverScreen.classList.remove('show');
    spawnSnakeFood();
    
    if (snakeGameLoop) clearInterval(snakeGameLoop);
    snakeGameLoop = setInterval(updateSnakeGame, snakeGameSpeed);
}

function spawnSnakeFood() {
    let validPosition = false;
    while (!validPosition) {
        snakeFood = {
            x: Math.floor(Math.random() * SNAKE_GRID_WIDTH),
            y: Math.floor(Math.random() * SNAKE_GRID_HEIGHT)
        };
        validPosition = !snake.some(segment => 
            segment.x === snakeFood.x && segment.y === snakeFood.y
        );
    }
}

function updateSnakeGame() {
    if (!snakeRunning || snakePaused) return;

    snakeDirection = snakeNextDirection;
    const head = { ...snake[0] };

    switch (snakeDirection) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
    }

    // Check wall collision
    if (head.x < 0 || head.x >= SNAKE_GRID_WIDTH || 
        head.y < 0 || head.y >= SNAKE_GRID_HEIGHT) {
        endSnakeGame();
        return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endSnakeGame();
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore += 10;
        
        // Increase speed every 50 points
        if (snakeScore % 50 === 0 && snakeGameSpeed > 60) {
            snakeGameSpeed -= 10;
            clearInterval(snakeGameLoop);
            snakeGameLoop = setInterval(updateSnakeGame, snakeGameSpeed);
        }
        
        updateSnakeScore();
        spawnSnakeFood();
        
        // Visual feedback
        flashFoodEaten();
    } else {
        snake.pop();
    }

    drawSnakeGame();
}

function drawSnakeGame() {
    // Clear canvas
    snakeCtx.fillStyle = '#9bbc0f';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    // Draw grid (subtle)
    snakeCtx.strokeStyle = 'rgba(15, 56, 15, 0.1)';
    snakeCtx.lineWidth = 0.5;
    for (let x = 0; x <= SNAKE_GRID_WIDTH; x++) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(x * SNAKE_TILE_SIZE, 0);
        snakeCtx.lineTo(x * SNAKE_TILE_SIZE, snakeCanvas.height);
        snakeCtx.stroke();
    }
    for (let y = 0; y <= SNAKE_GRID_HEIGHT; y++) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(0, y * SNAKE_TILE_SIZE);
        snakeCtx.lineTo(snakeCanvas.width, y * SNAKE_TILE_SIZE);
        snakeCtx.stroke();
    }

    // Draw food
    snakeCtx.fillStyle = '#306230';
    snakeCtx.fillRect(
        snakeFood.x * SNAKE_TILE_SIZE,
        snakeFood.y * SNAKE_TILE_SIZE,
        SNAKE_TILE_SIZE,
        SNAKE_TILE_SIZE
    );

    // Draw snake
    snake.forEach((segment, index) => {
        // Head is darker
        snakeCtx.fillStyle = index === 0 ? '#0f380f' : '#306230';
        snakeCtx.fillRect(
            segment.x * SNAKE_TILE_SIZE,
            segment.y * SNAKE_TILE_SIZE,
            SNAKE_TILE_SIZE,
            SNAKE_TILE_SIZE
        );
        
        // Add a subtle border to snake segments
        snakeCtx.strokeStyle = index === 0 ? '#9bbc0f' : '#0f380f';
        snakeCtx.lineWidth = 1;
        snakeCtx.strokeRect(
            segment.x * SNAKE_TILE_SIZE,
            segment.y * SNAKE_TILE_SIZE,
            SNAKE_TILE_SIZE,
            SNAKE_TILE_SIZE
        );
    });
}

function flashFoodEaten() {
    // Simple visual feedback when food is eaten
    snakeCtx.fillStyle = '#9bbc0f';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    setTimeout(drawSnakeGame, 50);
}

function endSnakeGame() {
    snakeRunning = false;
    snakeGameOver = true;
    clearInterval(snakeGameLoop);
    
    // Update high score if needed
    if (snakeScore > snakeHighScore) {
        snakeHighScore = snakeScore;
        localStorage.setItem('snakeHighScore', snakeHighScore);
        snakeHighScoreElement.textContent = snakeHighScore;
    }
    
    snakeFinalScoreElement.textContent = snakeScore;
    snakeGameOverScreen.classList.add('show');
}

function updateSnakeScore() {
    snakeScoreElement.textContent = snakeScore;
}

function restartSnakeGame() {
    startSnakeGame();
}

function pauseSnakeGame() {
    if (snakeGameOver) return;
    
    snakePaused = !snakePaused;
    const pauseBtn = document.querySelector('.game-btn:nth-child(1)');
    if (snakePaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        // Draw "PAUSED" text on canvas
        snakeCtx.fillStyle = 'rgba(15, 56, 15, 0.8)';
        snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
        snakeCtx.fillStyle = '#9bbc0f';
        snakeCtx.font = 'bold 30px Arial';
        snakeCtx.textAlign = 'center';
        snakeCtx.textBaseline = 'middle';
        snakeCtx.fillText('PAUSED', snakeCanvas.width / 2, snakeCanvas.height / 2);
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
}

// Keyboard controls for Snake Game
document.addEventListener('keydown', (e) => {
    // Only handle game keys if we're in the projects section
    const projectsSection = document.getElementById('projects');
    const rect = projectsSection.getBoundingClientRect();
    const isInProjectsSection = rect.top <= window.innerHeight && rect.bottom >= 0;
    
    if (!isInProjectsSection) return;
    
    if (snakeGameOver && (e.code === 'Space' || e.code === 'Enter')) {
        restartSnakeGame();
        e.preventDefault();
        return;
    }

    if (e.code === 'Space') {
        pauseSnakeGame();
        e.preventDefault();
        return;
    }

    if (!snakeRunning || snakePaused) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (snakeDirection !== 'DOWN') snakeNextDirection = 'UP';
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (snakeDirection !== 'UP') snakeNextDirection = 'DOWN';
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (snakeDirection !== 'RIGHT') snakeNextDirection = 'LEFT';
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (snakeDirection !== 'LEFT') snakeNextDirection = 'RIGHT';
            e.preventDefault();
            break;
    }
});

// Initialize Snake Game when page loads
window.addEventListener('load', initSnakeGame);