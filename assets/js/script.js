/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('i');
const themeText   = themeToggle.querySelector('span');

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.replace('dark-mode', 'light-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  themeText.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
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

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════════ */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks      = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('active');
  const icon = this.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ═══════════════════════════════════════════════════════════════
   HEADER SCROLL EFFECT
═══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
═══════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.05) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════════ */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE FILTER
═══════════════════════════════════════════════════════════════ */
const filterButtons    = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    certificateCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE MODAL
═══════════════════════════════════════════════════════════════ */
const certificateModal = document.getElementById('certificateModal');
const modalImage       = document.getElementById('modalCertificateImage');
const modalTitle       = document.getElementById('modalCertificateTitle');
const modalProvider    = document.getElementById('modalCertificateProvider');
const modalDate        = document.getElementById('modalCertificateDate');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalSkills      = document.getElementById('modalCertificateSkills');
const modalClose       = document.getElementById('certificateModalClose');
const modalPrev        = document.getElementById('modalPrev');
const modalNext        = document.getElementById('modalNext');

let currentModalIndex = 0;

const certificateData = [
  {
    title:       'Networking Basics',
    provider:    'Netacad',
    date:        'Issued: 2025',
    image:       'assets/images/pic1.png',
    description: 'Completed comprehensive course covering the foundation of networking and network devices, media, and protocols. You will observe data flowing through a network and configure devices to connect to networks.',
    skills:      ['Networking', 'Cisco Packet Tracer']
  },
  {
    title:       'Introduction to CSS',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic2.png',
    description: 'Completed the prerequisite module for Computer Systems Servicing NC II. This course covers fundamental computer concepts and system servicing basics.',
    skills:      ['Computer Fundamentals', 'CSS']
  },
  {
    title:       'Installing and Configuring Computer Systems',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic3.png',
    description: 'Completed module about installing and configuring computer hardware and software, including system setup, driver installation, and basic troubleshooting.',
    skills:      ['Computer System', 'Hardware', 'Software']
  },
  {
    title:       'Setting Up Computer Networks',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic4.png',
    description: 'Completed comprehensive module on setting up computer networks, including network design, cable installation, router configuration, and network troubleshooting.',
    skills:      ['Computer Networks', 'Network Setup', 'Troubleshooting']
  },
  {
    title:       'Setting Up Computer Servers',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic5.png',
    description: 'Completed module on setting up computer servers, including server installation, configuration, user management, and server maintenance.',
    skills:      ['Computer Server', 'Server Configuration', 'User Management']
  },
  {
    title:       'Maintaining Computer Systems and Networks',
    provider:    'TESDA',
    date:        'Issued: 2024',
    image:       'assets/images/pic6.png',
    description: 'Completed comprehensive module on maintaining computer systems and networks, including preventive maintenance, system optimization, and network security basics.',
    skills:      ['Computer System', 'Computer Network', 'Maintenance', 'Troubleshooting']
  }
];

// Open modal on card click
certificateCards.forEach(card => {
  card.addEventListener('click', () => {
    openCertificateModal(parseInt(card.getAttribute('data-index')));
  });

  // View button inside card
  const viewBtn = card.querySelector('.view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', e => {
      e.stopPropagation();
      openCertificateModal(parseInt(card.getAttribute('data-index')));
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

  modalImage.src           = cert.image;
  modalImage.alt           = cert.title;
  modalTitle.textContent   = cert.title;
  modalProvider.textContent= cert.provider;
  modalDate.textContent    = cert.date;
  modalDescription.textContent = cert.description;

  // Build skill tags
  modalSkills.innerHTML = '';
  cert.skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className   = 'modal-skill-tag';
    tag.textContent = skill;
    modalSkills.appendChild(tag);
  });

  // Nav button states
  modalPrev.disabled = currentModalIndex === 0;
  modalNext.disabled = currentModalIndex === certificateData.length - 1;
}

function closeCertificateModal() {
  certificateModal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Close events
modalClose.addEventListener('click', closeCertificateModal);
certificateModal.addEventListener('click', e => {
  if (e.target === certificateModal) closeCertificateModal();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!certificateModal.classList.contains('show')) return;
  if (e.key === 'Escape')      closeCertificateModal();
  if (e.key === 'ArrowLeft'  && currentModalIndex > 0)                         { currentModalIndex--; updateModalContent(); }
  if (e.key === 'ArrowRight' && currentModalIndex < certificateData.length - 1){ currentModalIndex++; updateModalContent(); }
});

// Prev / Next buttons
modalPrev.addEventListener('click', () => {
  if (currentModalIndex > 0) { currentModalIndex--; updateModalContent(); }
});
modalNext.addEventListener('click', () => {
  if (currentModalIndex < certificateData.length - 1) { currentModalIndex++; updateModalContent(); }
});

// Preload certificate images
window.addEventListener('load', () => {
  certificateData.forEach(cert => {
    const img = new Image();
    img.src = cert.image;
  });
});

/* ═══════════════════════════════════════════════════════════════
   SNAKE GAME
═══════════════════════════════════════════════════════════════ */
const snakeCanvas = document.getElementById('snakeGameCanvas');
const snakeCtx    = snakeCanvas.getContext('2d');

// Constants
const TILE        = 16;
const COLS        = 25;
const ROWS        = 25;
const INIT_SPEED  = 120;

// State
let snake       = [];
let food        = {};
let dir         = 'RIGHT';
let nextDir     = 'RIGHT';
let running     = false;
let gameOver    = false;
let paused      = false;
let score       = 0;
let gameLoop    = null;
let speed       = INIT_SPEED;
let highScore   = parseInt(localStorage.getItem('snakeHighScore')) || 0;

// Init on page load
window.addEventListener('load', () => {
  snakeCanvas.width  = COLS * TILE;
  snakeCanvas.height = ROWS * TILE;
  document.getElementById('snakeHighScore').textContent = highScore;
  setupMobileControls();
  startGame();
});

/* ── Mobile Controls ── */
function setupMobileControls() {
  const controls = {
    snakeBtnUp:    () => { if (dir !== 'DOWN')  nextDir = 'UP';    },
    snakeBtnDown:  () => { if (dir !== 'UP')    nextDir = 'DOWN';  },
    snakeBtnLeft:  () => { if (dir !== 'RIGHT') nextDir = 'LEFT';  },
    snakeBtnRight: () => { if (dir !== 'LEFT')  nextDir = 'RIGHT'; }
  };

  Object.entries(controls).forEach(([id, handler]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click',      () => { if (running && !paused) handler(); });
    btn.addEventListener('touchstart', e  => { e.preventDefault(); if (running && !paused) handler(); });
  });
}

/* ── Game Start ── */
function startGame() {
  snake    = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
  dir      = 'RIGHT';
  nextDir  = 'RIGHT';
  score    = 0;
  gameOver = false;
  running  = true;
  paused   = false;
  speed    = INIT_SPEED;

  document.getElementById('snakeScore').textContent = 0;
  document.getElementById('snakeGameOverScreen').classList.remove('show');

  spawnFood();
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(tick, speed);
}

/* ── Food Spawn ── */
function spawnFood() {
  do {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
}

/* ── Game Tick ── */
function tick() {
  if (!running || paused) return;

  dir = nextDir;
  const head = { ...snake[0] };

  if      (dir === 'UP')    head.y--;
  else if (dir === 'DOWN')  head.y++;
  else if (dir === 'LEFT')  head.x--;
  else if (dir === 'RIGHT') head.x++;

  // Wall collision
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    endGame(); return;
  }
  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    endGame(); return;
  }

  snake.unshift(head);

  // Ate food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('snakeScore').textContent = score;

    // Speed up every 50 points
    if (score % 50 === 0 && speed > 60) {
      speed -= 10;
      clearInterval(gameLoop);
      gameLoop = setInterval(tick, speed);
    }
    spawnFood();
  } else {
    snake.pop();
  }

  draw();
}

/* ── Draw ── */
function draw() {
  // Background
  snakeCtx.fillStyle = '#9bbc0f';
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // Grid
  snakeCtx.strokeStyle = 'rgba(15, 56, 15, 0.1)';
  snakeCtx.lineWidth   = 0.5;
  for (let x = 0; x <= COLS; x++) {
    snakeCtx.beginPath();
    snakeCtx.moveTo(x * TILE, 0);
    snakeCtx.lineTo(x * TILE, snakeCanvas.height);
    snakeCtx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    snakeCtx.beginPath();
    snakeCtx.moveTo(0,                 y * TILE);
    snakeCtx.lineTo(snakeCanvas.width, y * TILE);
    snakeCtx.stroke();
  }

  // Food
  snakeCtx.fillStyle = '#0f380f';
  snakeCtx.fillRect(food.x * TILE, food.y * TILE, TILE, TILE);

  // Snake segments
  snake.forEach((seg, i) => {
    snakeCtx.fillStyle   = i === 0 ? '#0f380f' : '#306230';
    snakeCtx.fillRect(seg.x * TILE, seg.y * TILE, TILE, TILE);
    snakeCtx.strokeStyle = i === 0 ? '#9bbc0f' : '#0f380f';
    snakeCtx.lineWidth   = 1;
    snakeCtx.strokeRect(seg.x * TILE, seg.y * TILE, TILE, TILE);
  });
}

/* ── End Game ── */
function endGame() {
  running  = false;
  gameOver = true;
  clearInterval(gameLoop);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    document.getElementById('snakeHighScore').textContent = highScore;
  }

  document.getElementById('snakeFinalScore').textContent = score;
  document.getElementById('snakeGameOverScreen').classList.add('show');
}

/* ── Public Controls (called from HTML onclick) ── */
function restartSnakeGame() {
  startGame();
}

function pauseSnakeGame() {
  if (gameOver) return;

  paused = !paused;
  const pauseBtn = document.querySelector('.game-btn:first-child');

  if (paused) {
    pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    // Draw paused overlay
    snakeCtx.fillStyle    = 'rgba(15, 56, 15, 0.88)';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snakeCtx.fillStyle    = '#9bbc0f';
    snakeCtx.font         = 'bold 26px Orbitron, Arial';
    snakeCtx.textAlign    = 'center';
    snakeCtx.textBaseline = 'middle';
    snakeCtx.fillText('PAUSED', snakeCanvas.width / 2, snakeCanvas.height / 2);
  } else {
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  }
}

/* ── Keyboard Controls ── */
document.addEventListener('keydown', e => {
  // Only intercept arrow keys if the projects section is visible
  const projectsSection = document.getElementById('projects');
  const rect = projectsSection.getBoundingClientRect();
  const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
  if (!inView) return;

  // Space: pause or restart
  if (e.code === 'Space') {
    e.preventDefault();
    if (gameOver) restartSnakeGame();
    else          pauseSnakeGame();
    return;
  }

  if (!running || paused) return;

  const dirMap = {
    ArrowUp:    'UP',    w: 'UP',    W: 'UP',
    ArrowDown:  'DOWN',  s: 'DOWN',  S: 'DOWN',
    ArrowLeft:  'LEFT',  a: 'LEFT',  A: 'LEFT',
    ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT'
  };

  const opposite = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
  const newDir   = dirMap[e.key];

  if (newDir && opposite[newDir] !== dir) {
    nextDir = newDir;
    // Prevent page scroll on arrow keys
    if (e.key.startsWith('Arrow')) e.preventDefault();
  }
});
