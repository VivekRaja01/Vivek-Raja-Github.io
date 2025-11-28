/* =============================================
   FUTURISTIC AI PORTFOLIO - JAVASCRIPT
   Interactive 3D Cyberpunk Experience
   ============================================= */

(function() {
  'use strict';

  // =============================================
  // Global Configuration
  // =============================================
  const CONFIG = {
    particles: {
  density: 35,
  speed: 0.3,
  connections: false,
  maxDistance: 90
    },
    
    typing: {
      roles: [
        'Full-Stack MERN Developer',
        'Open Source Contributor',
        'API Integration Specialist',
        'Frontend Solutions Engineer',
        'Database & Backend Specialist',
        'Clean Code & Performance Advocate'
      ],
      typeSpeed: 80,
      deleteSpeed: 40,
      pauseDuration: 2000
    },

    network: {
      nodeCount: 100,
      connectionDistance: 120,
      animationSpeed: 0.02
    },

    threejs: {
      scene: null,
      camera: null,
      renderer: null,
      particles: [],
      connections: []
    },

    github: {
      username: 'VivekRaja01',
      repos: []
    }
  };

  // =============================================
  // Utility Functions
  // =============================================
  const Utils = {
    // Random number generation
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Random integer
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Linear interpolation
    lerp: (start, end, factor) => start + (end - start) * factor,
    
    // Clamp value between min and max
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    
    // Distance between two points
    distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    
    // Throttle function
    throttle: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Debounce function
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // =============================================
  // Particles.js Configuration
  // =============================================
  const ParticleSystem = {
    init() {
      if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded');
        return;
      }

      particlesJS('particles-js', {
        particles: {
          number: {
            value: CONFIG.particles.density,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#00ff41'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 1,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: CONFIG.particles.connections,
            distance: CONFIG.particles.maxDistance,
            color: '#00ff41',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: CONFIG.particles.speed,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: false
      });
    }
  };

  // =============================================
  // Three.js Neural Network Visualization
  // =============================================
  const NeuralNetwork = {
    init() {
      if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
      }
      
      this.setupScene();
      this.createParticles();
      this.animate();
      this.handleResize();
    },

    setupScene() {
      const container = document.getElementById('neural-network');
      if (!container) return;

      // Scene setup
      CONFIG.threejs.scene = new THREE.Scene();
      
      // Camera setup
      CONFIG.threejs.camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      CONFIG.threejs.camera.position.z = 5;

      // Renderer setup
      CONFIG.threejs.renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      CONFIG.threejs.renderer.setSize(container.clientWidth, container.clientHeight);
      CONFIG.threejs.renderer.setClearColor(0x000000, 0);
      container.appendChild(CONFIG.threejs.renderer.domElement);
    },

    createParticles() {
      const particleCount = 120;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = Utils.random(-10, 10);
        positions[i3 + 1] = Utils.random(-10, 10);
        positions[i3 + 2] = Utils.random(-5, 5);
        
        // Color (cyan)
        colors[i3] = 0;     // R
        colors[i3 + 1] = 1; // G
        colors[i3 + 2] = 0.25; // B
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      const particles = new THREE.Points(geometry, material);
      CONFIG.threejs.scene.add(particles);
      CONFIG.threejs.particles.push(particles);

      // Create connections
      this.createConnections(positions, particleCount);
    },

  createConnections(positions, particleCount) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      const lineColors = [];

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const distance = Utils.distance(
            positions[i * 3], positions[i * 3 + 1],
            positions[j * 3], positions[j * 3 + 1]
          );

          if (distance < 2) {
            // Add line
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );

            // Add colors (cyan with transparency)
            lineColors.push(0, 1, 0.25, 0, 1, 0.25);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.18
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      CONFIG.threejs.scene.add(lines);
      CONFIG.threejs.connections.push(lines);
    },

    animate() {
      requestAnimationFrame(() => this.animate());

      // Rotate particles
      CONFIG.threejs.particles.forEach(particle => {
        particle.rotation.x += 0.001;
        particle.rotation.y += 0.002;
      });

      // Rotate connections
      CONFIG.threejs.connections.forEach(connection => {
        connection.rotation.x += 0.001;
        connection.rotation.y += 0.001;
      });

      if (CONFIG.threejs.renderer && CONFIG.threejs.scene && CONFIG.threejs.camera) {
        CONFIG.threejs.renderer.render(CONFIG.threejs.scene, CONFIG.threejs.camera);
      }
    },

    handleResize() {
      window.addEventListener('resize', Utils.debounce(() => {
        const container = document.getElementById('neural-network');
        if (!container || !CONFIG.threejs.renderer || !CONFIG.threejs.camera) return;

        CONFIG.threejs.camera.aspect = container.clientWidth / container.clientHeight;
        CONFIG.threejs.camera.updateProjectionMatrix();
        CONFIG.threejs.renderer.setSize(container.clientWidth, container.clientHeight);
      }, 250));
    }
  };

  // =============================================
  // Typing Animation
  // =============================================
  const TypingAnimation = {
    init() {
      this.element = document.querySelector('.typed-text');
      if (!this.element) return;

      this.roles = CONFIG.typing.roles;
      this.currentIndex = 0;
      this.currentText = '';
      this.isDeleting = false;

      this.type();
    },

    type() {
      const fullText = this.roles[this.currentIndex];
      
      if (this.isDeleting) {
        this.currentText = fullText.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = fullText.substring(0, this.currentText.length + 1);
      }

      this.element.textContent = this.currentText;

      let typeSpeed = CONFIG.typing.typeSpeed;

      if (this.isDeleting) {
        typeSpeed = CONFIG.typing.deleteSpeed;
      }

      if (!this.isDeleting && this.currentText === fullText) {
        typeSpeed = CONFIG.typing.pauseDuration;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  };

  // =============================================
  // Floating ID Card
  // =============================================
  const FloatingCard = {
    init() {
      this.card = document.querySelector('.floating-id-card');
      if (!this.card) return;

      this.setupEventListeners();
      this.show();
    },

    setupEventListeners() {
      // Auto-show after delay
      setTimeout(() => this.show(), 3000);

      // Drag functionality
      let isDragging = false;
      let startX, startY, initialX, initialY;

      this.card.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = this.card.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        this.card.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        this.card.style.left = `${initialX + deltaX}px`;
        this.card.style.top = `${initialY + deltaY}px`;
        this.card.style.right = 'auto';
        this.card.style.transform = 'none';
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          this.card.style.cursor = 'grab';
        }
      });

      // Click to hide/show
      this.card.addEventListener('click', (e) => {
        if (!isDragging) {
          this.toggle();
        }
      });
    },

    show() {
      this.card.classList.add('active');
    },

    hide() {
      this.card.classList.remove('active');
    },

    toggle() {
      this.card.classList.toggle('active');
    }
  };

  // =============================================
  // Skill Network Visualization
  // =============================================
  const SkillNetwork = {
    init() {
      // Replaced by SkillDeck in poker-themed redesign
    },

    setupNodes() {
      // Hover/Focus effects for all nodes
      document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('mouseenter', () => this.highlightNode(node));
        node.addEventListener('mouseleave', () => this.unhighlightNode(node));
        node.addEventListener('focus', () => this.highlightNode(node));
        node.addEventListener('blur', () => this.unhighlightNode(node));
      });
    },

    highlightNode(node) {
      node.style.transform += ' scale(1.2)';
      node.style.zIndex = '100';
      
      // Add glow effect
      const glow = node.querySelector('.node-glow');
      if (glow) {
        glow.style.opacity = '1';
      }
    },

    unhighlightNode(node) {
      node.style.transform = node.style.transform.replace(' scale(1.2)', '');
      node.style.zIndex = '';
      
      // Remove glow effect
      const glow = node.querySelector('.node-glow');
      if (glow) {
        glow.style.opacity = '0.6';
      }
    },

    drawConnections() {
      if (!this.canvas) return;
      const ctx = this.canvas.getContext('2d');

      const resizeCanvas = () => {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
      };
      resizeCanvas();

      const getCenter = (el) => {
        const rect = el.getBoundingClientRect();
        const parent = this.container.getBoundingClientRect();
        return {
          x: rect.left - parent.left + rect.width / 2,
          y: rect.top - parent.top + rect.height / 2
        };
      };

      const render = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.3)';
        ctx.lineWidth = 1;

        const nodes = Array.from(document.querySelectorAll('.skill-node'))
          .filter(n => !n.classList.contains('filtered-out'));
        const core = nodes.find(n => n.classList.contains('core-node'));
        if (!core) return;

        const corePos = getCenter(core);
        nodes.forEach(node => {
          if (node === core) return;
          const p = getCenter(node);
          ctx.beginPath();
          ctx.moveTo(corePos.x, corePos.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        });

        requestAnimationFrame(render);
      };

      render();
    },

    setupFilters() {
      const buttons = document.querySelectorAll('.filter-btn');
      if (!buttons.length) return;

      const setActive = (btn) => {
        buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
      };

      const applyFilter = (filter) => {
        document.querySelectorAll('.skill-node').forEach(node => {
          const cat = node.getAttribute('data-category') || 'misc';
          const show = filter === 'all' || cat === filter || node.classList.contains('core-node');
          node.classList.toggle('filtered-out', !show);
          node.style.opacity = show ? '1' : '0.2';
        });
      };

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          setActive(btn);
          applyFilter(btn.getAttribute('data-filter'));
        });
      });

      applyFilter('all');
    },

    handleResize() {
      if (!this.canvas) return;
      window.addEventListener('resize', Utils.debounce(() => {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
      }, 200));
    }
  };

  // =============================================
  // Poker-Themed Skill Deck
  // =============================================
  const SkillDeck = {
    init() {
      this.deckEl = document.getElementById('skill-deck');
      if (!this.deckEl) return;

      this.cards = Array.from(this.deckEl.querySelectorAll('.skill-card'));
  this.table = this.deckEl.closest('.poker-table');
  this.state = { scale: 1, parallax: true };
      this.bindControls();
      this.stackDeck();
      this.enableFlip();
  this.enableDrag();
  this.enableWheelZoom();
  this.enableParallax();
    },

    stackDeck() {
      // Stack cards with slight offsets
      this.cards.forEach((card, i) => {
        const offset = i * 2;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: offset,
          y: -offset,
          rotation: gsap.utils.random(-2, 2),
          zIndex: 100 + i,
          transformOrigin: '50% 50%',
          rotateY: 0
        });
      });
    },

    bindControls() {
      const shuffleBtn = document.getElementById('deck-shuffle');
      const dealBtn = document.getElementById('deck-deal');
      const fanBtn = document.getElementById('deck-fan');
      const resetBtn = document.getElementById('deck-reset');

      shuffleBtn?.addEventListener('click', () => this.shuffle());
      dealBtn?.addEventListener('click', () => this.deal());
      fanBtn?.addEventListener('click', () => this.fan());
      resetBtn?.addEventListener('click', () => this.reset());
    },

    shuffle() {
      // Fisher-Yates shuffle array order and animate
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
      this.cards.forEach((card, i) => {
        gsap.to(card, {
          duration: 0.5,
          x: gsap.utils.random(-120, 120),
          y: gsap.utils.random(-80, 80),
          rotation: gsap.utils.random(-15, 15),
          zIndex: 100 + i,
          ease: 'power2.out'
        });
      });
    },

    deal() {
      const cols = 5;
      const gapX = 220;
      const gapY = 280;
      this.cards.forEach((card, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        gsap.to(card, {
          duration: 0.6,
          x: (col - (cols - 1) / 2) * gapX,
          y: (row - 0.5) * gapY,
          rotation: 0,
          ease: 'power3.out',
          delay: i * 0.06
        });
      });
    },

    fan() {
      const spread = 140; // degrees
      const radius = 260;
      const centerIndex = (this.cards.length - 1) / 2;
      this.cards.forEach((card, i) => {
        const t = (i - centerIndex) / centerIndex; // -1 .. 1
        const angle = t * (spread / 2) * (Math.PI / 180);
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius - radius;
        gsap.to(card, {
          duration: 0.6,
          x,
          y,
          rotation: gsap.utils.clamp(-25, 25, t * (spread / 2)),
          ease: 'power2.out',
          delay: i * 0.03
        });
      });
    },

    reset() {
      this.stackDeck();
  this.state.scale = 1;
  gsap.set(this.deckEl, { scale: 1 });
    },

    enableFlip() {
      this.cards.forEach(card => {
        // Keyboard-friendly flip remains
        const flip = () => {
          const isBack = card.classList.toggle('is-flipped');
          gsap.to(card, { duration: 0.4, rotateY: isBack ? 180 : 0, ease: 'power2.out' });
        };
        card._flip = flip; // store for reuse in drag tap

        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flip();
          }
        });
      });
    }
  };

  // Dragging, wheel zoom, and parallax for SkillDeck
  Object.assign(SkillDeck, {
    enableDrag() {
      const bounds = () => this.table.getBoundingClientRect();
      const deckRect = () => this.deckEl.getBoundingClientRect();

      this.cards.forEach(card => {
        let pointerId = null;
        let start = { x: 0, y: 0 };
        let orig = { x: 0, y: 0 };
        let hasMoved = false;
        let downTime = 0;
        const TAP_THRESHOLD = 8; // px
        const TAP_TIME = 350; // ms

        const onPointerDown = (e) => {
          e.preventDefault(); // suppress native click
          if (pointerId !== null) return;
          pointerId = e.pointerId;
          card.setPointerCapture(pointerId);
          card.classList.add('dragging');
          // Bring to front
          gsap.set(card, { zIndex: 1000 });

          const m = gsap.getProperty(card);
          orig.x = Number(m('x'));
          orig.y = Number(m('y'));
          start.x = e.clientX;
          start.y = e.clientY;
          hasMoved = false;
          downTime = performance.now();
        };

        const onPointerMove = (e) => {
          if (e.pointerId !== pointerId) return;
          const dx = (e.clientX - start.x) / this.state.scale;
          const dy = (e.clientY - start.y) / this.state.scale;
          const nx = orig.x + dx;
          const ny = orig.y + dy;
          if (Math.hypot(dx, dy) > TAP_THRESHOLD) hasMoved = true;

          // Constrain within table
          const b = bounds();
          const d = deckRect();
          const cardRect = card.getBoundingClientRect();
          const halfW = cardRect.width / 2;
          const halfH = cardRect.height / 2;
          const deckCenterX = d.left + d.width / 2;
          const deckCenterY = d.top + d.height / 2;
          const minX = (b.left + halfW) - deckCenterX;
          const maxX = (b.right - halfW) - deckCenterX;
          const minY = (b.top + halfH) - deckCenterY;
          const maxY = (b.bottom - halfH) - deckCenterY;

          gsap.set(card, {
            x: Math.max(minX, Math.min(maxX, nx)),
            y: Math.max(minY, Math.min(maxY, ny))
          });
        };

        const onPointerUp = (e) => {
          if (e.pointerId !== pointerId) return;
          card.releasePointerCapture(pointerId);
          pointerId = null;
          card.classList.remove('dragging');
          // Ease slight settle
          gsap.to(card, { duration: 0.2, scale: 1.0, ease: 'power1.out' });

          // Tap-to-flip if not dragged significantly
          const elapsed = performance.now() - downTime;
          if (!hasMoved && elapsed <= TAP_TIME && typeof card._flip === 'function') {
            card._flip();
          }
        };

        card.addEventListener('pointerdown', onPointerDown);
        card.addEventListener('pointermove', onPointerMove);
        card.addEventListener('pointerup', onPointerUp);
        card.addEventListener('pointercancel', onPointerUp);
      });
    },

    enableWheelZoom() {
      const onWheel = (e) => {
        if (!this.table.contains(e.target)) return;
        e.preventDefault();
        const delta = -Math.sign(e.deltaY) * 0.1;
        this.state.scale = gsap.utils.clamp(0.6, 1.6, this.state.scale + delta);
        gsap.set(this.deckEl, { scale: this.state.scale, transformOrigin: '50% 50%' });
      };
      this.table.addEventListener('wheel', onWheel, { passive: false });
    },

    enableParallax() {
      const onMove = (e) => {
        const rect = this.table.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;

        // Tilt deck slightly and nudge cards for depth effect
        gsap.to(this.deckEl, { duration: 0.3, rotateX: dy * -6, rotateY: dx * 8, ease: 'power2.out' });
        this.cards.forEach((card, i) => {
          const depth = (i + 1) / this.cards.length; // 0..1
          gsap.to(card, {
            duration: 0.3,
            x: "+=" + dx * 10 * depth,
            y: "+=" + dy * 8 * depth,
            ease: 'power2.out'
          });
        });
      };
      const onLeave = () => {
        gsap.to(this.deckEl, { duration: 0.4, rotateX: 0, rotateY: 0, ease: 'power2.out' });
      };
      this.table.addEventListener('pointermove', onMove);
      this.table.addEventListener('pointerleave', onLeave);
    }
  });

  // =============================================
  // GitHub Stats Integration
  // =============================================
  const GitHubStats = {
    async init() {
  await this.fetchStats();
  this.displayStats();
  this.injectFeatured();
    },

    async fetchStats() {
      try {
        const response = await fetch(`https://api.github.com/users/${CONFIG.github.username}`, {
          headers: { 'Accept': 'application/vnd.github+json' }
        });
        const userData = await response.json();
        
        const reposResponse = await fetch(`https://api.github.com/users/${CONFIG.github.username}/repos?sort=updated&per_page=100`, {
          headers: { 'Accept': 'application/vnd.github+json' }
        });
        const reposData = await reposResponse.json();
        
        CONFIG.github.userData = userData;
        CONFIG.github.repos = reposData;
        
        return { userData, repos: reposData };
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
        return null;
      }
    },

  displayStats() {
      if (!CONFIG.github.userData) return;

      const stats = {
        repos: CONFIG.github.userData.public_repos,
        followers: CONFIG.github.userData.followers,
        following: CONFIG.github.userData.following,
  stars: CONFIG.github.repos.reduce((total, repo) => total + repo.stargazers_count, 0),
  gists: CONFIG.github.userData.public_gists
      };

      // Update metric cards
  this.updateMetric('repositories', stats.repos);
  this.updateMetric('stars', stats.stars);
  this.updateMetric('followers', stats.followers);
  this.updateMetric('gists', stats.gists);

      // Update hero/bio counters
      document.querySelectorAll('[data-counter="repos"]').forEach(el => this.animateNumber(el, stats.repos));
      document.querySelectorAll('[data-counter="stars"]').forEach(el => this.animateNumber(el, stats.stars));
      document.querySelectorAll('[data-counter="followers"]').forEach(el => this.animateNumber(el, stats.followers));
    },

    updateMetric(type, value) {
      const element = document.querySelector(`[data-metric="${type}"] .metric-value`);
      if (element) {
        this.animateNumber(element, value);
      }
    },

    animateNumber(el, target, duration = 800) {
      const startVal = parseInt((el.textContent || '0').replace(/[^0-9]/g, ''), 10) || 0;
      const endVal = typeof target === 'number' ? target : parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
      if (endVal === startVal) { el.textContent = endVal.toLocaleString(); return; }
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const val = Math.round(startVal + (endVal - startVal) * eased);
        el.textContent = val.toLocaleString();
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  // =============================================
  // Featured Repos Injection
  // =============================================
  Object.assign(GitHubStats, {
    pickFeatured(repos) {
      if (!Array.isArray(repos)) return [];
      // Score repos: stars desc, recent activity boost, exclude forks
      const scored = repos
        .filter(r => !r.fork && !r.private)
        .map(r => {
          const updated = new Date(r.pushed_at || r.updated_at || r.created_at).getTime();
          const recencyBoost = (Date.now() - updated) < 1000*60*60*24*90 ? 50 : 0; // 90 days
          const langBoost = (r.language === 'Python' || r.language === 'JavaScript') ? 10 : 0;
          const topicsBoost = (Array.isArray(r.topics) && r.topics.some(t => /ai|ml|llm|nlp|cv|sdk|api/i.test(t))) ? 20 : 0;
          const score = (r.stargazers_count || 0) * 2 + recencyBoost + langBoost + topicsBoost;
          return { repo: r, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(s => s.repo);
      return scored;
    },

    injectFeatured() {
      const mount = document.getElementById('featured-repos');
      if (!mount) return;
      const featured = this.pickFeatured(CONFIG.github.repos);
      if (!featured.length) {
        mount.innerHTML = '<p class="text-center text-muted">No repositories found. Try again later.</p>';
        return;
      }

      mount.innerHTML = featured.map(r => this.renderRepoCard(r)).join('');
    },

  });

  // =============================================
  // Command Palette
  // =============================================
  const CommandPalette = {
    init() {
      this.modal = document.getElementById('commandPalette');
      this.input = document.querySelector('.command-input');
      this.results = document.querySelector('.command-results');
      
      if (!this.modal || !this.input || !this.results) return;

      this.commands = [
        { name: 'Expertise Network', icon: 'bi bi-diagram-3', action: () => this.scrollTo('#skills') },
        { name: 'Analytics Dashboard', icon: 'bi bi-graph-up', action: () => this.scrollTo('#stats') },
        { name: 'System Biography', icon: 'bi bi-terminal', action: () => this.scrollTo('#about') },
        { name: 'Toggle ID Card', icon: 'bi bi-person-badge', action: () => FloatingCard.toggle() },
        { name: 'Initialize Particles', icon: 'bi bi-stars', action: () => ParticleSystem.init() }
      ];

      this.setupEventListeners();
    },

    setupEventListeners() {
      // Keyboard shortcut (Ctrl/Cmd + K)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
        
        if (e.key === 'Escape') {
          this.hide();
        }
      });

      // Input handling
      this.input.addEventListener('input', (e) => {
        this.search(e.target.value);
      });

      // Click outside to close
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.hide();
        }
      });
    },

    search(query) {
      const filtered = this.commands.filter(cmd => 
        cmd.name.toLowerCase().includes(query.toLowerCase())
      );

      this.results.innerHTML = filtered.map(cmd => `
        <button class="command-item" data-command="${cmd.name}">
          <i class="${cmd.icon}"></i>
          <span>${cmd.name}</span>
        </button>
      `).join('');

      // Add click handlers
      this.results.querySelectorAll('.command-item').forEach(item => {
        item.addEventListener('click', () => {
          const command = this.commands.find(cmd => cmd.name === item.dataset.command);
          if (command) {
            command.action();
            this.hide();
          }
        });
      });
    },

    scrollTo(selector) {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    show() {
      this.modal.classList.add('show');
      this.modal.style.display = 'block';
      document.body.classList.add('modal-open');
      
      setTimeout(() => {
        this.input.focus();
        this.search('');
      }, 100);
    },

    hide() {
      this.modal.classList.remove('show');
      this.modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.input.value = '';
    },

    toggle() {
      if (this.modal.classList.contains('show')) {
        this.hide();
      } else {
        this.show();
      }
    }
  };

  // =============================================
  // Animation Observers
  // =============================================
  const AnimationObserver = {
    init() {
      this.observeElements();
    },

    observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations
            if (entry.target.classList.contains('lab-card')) {
              this.animateLabCard(entry.target);
            }
            
            if (entry.target.classList.contains('metric-card')) {
              this.animateMetric(entry.target);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements
      document.querySelectorAll('.lab-card, .metric-card, .skill-node').forEach(el => {
        observer.observe(el);
      });
    },

    animateLabCard(card) {
      const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotateX(0)';
      }, delay);
    },

    animateMetric(card) {
      const value = card.querySelector('.metric-value');
      if (value) {
        const targetValue = parseInt(value.textContent) || 0;
        this.countUp(value, 0, targetValue, 2000);
      }
    },

    countUp(element, start, end, duration) {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
      }, 16);
    }
  };

  // =============================================
  // Holographic Effects
  // =============================================
  const HolographicEffects = {
    init() {
      this.addScanLines();
      this.addGlitchEffects();
    },

    addScanLines() {
      const panels = document.querySelectorAll('.hologram-frame');
      panels.forEach(panel => {
        if (!panel.querySelector('.scan-line')) {
          const scanLine = document.createElement('div');
          scanLine.className = 'scan-line';
          panel.appendChild(scanLine);
        }
      });
    },

    addGlitchEffects() {
      const cyberElements = document.querySelectorAll('.cyber-glow');
      cyberElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          this.glitch(element);
        });
      });
    },

    glitch(element) {
      const originalText = element.textContent;
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let iterations = 0;
      const interval = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 3;
      }, 30);
    }
  };

  // =============================================
  // Performance Monitor
  // =============================================
  const PerformanceMonitor = {
    init() {
      this.fps = 0;
      this.lastTime = performance.now();
      this.frameCount = 0;
      this.monitor();
    },

    monitor() {
      const currentTime = performance.now();
      this.frameCount++;
      
      if (currentTime - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        
        // Adjust particle density based on performance
        if (this.fps < 30 && CONFIG.particles.density > 20) {
          CONFIG.particles.density = Math.max(20, CONFIG.particles.density * 0.8);
          console.warn('Low FPS detected, reducing particle density:', this.fps);
        }
        
        this.frameCount = 0;
        this.lastTime = currentTime;
      }
      
      requestAnimationFrame(() => this.monitor());
    }
  };

  // =============================================
  // Main Application Controller
  // =============================================
  const App = {
    init() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.start());
      } else {
        this.start();
      }
    },

    async start() {
      console.log('🚀 Initializing Futuristic AI Portfolio...');

      try {
        // Initialize core systems
  ParticleSystem.init();
        TypingAnimation.init();
        FloatingCard.init();
  SkillNetwork.init();
  SkillDeck.init();
        CommandPalette.init();
        AnimationObserver.init();
  HolographicEffects.init();
  setTimeout(() => { try { AILabShine.init(); } catch (e) {} }, 0);
  setTimeout(() => { try { FocusTiles.init(); } catch (e) {} }, 0);
        PerformanceMonitor.init();
        
        // Initialize Three.js with delay to ensure DOM is ready
        setTimeout(() => {
          NeuralNetwork.init();
        }, 500);
        
        // Load GitHub stats
        await GitHubStats.init();
        
        // Setup global event listeners
        this.setupGlobalEvents();
        
        console.log('✅ Portfolio initialized successfully!');
      } catch (error) {
        console.error('❌ Error initializing portfolio:', error);
      }
    },

    setupGlobalEvents() {
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Update active navigation links
      window.addEventListener('scroll', Utils.throttle(() => {
        this.updateActiveNavigation();
      }, 100));

      // Handle window resize
      window.addEventListener('resize', Utils.debounce(() => {
        this.handleResize();
      }, 250));
    },

    updateActiveNavigation() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.cyber-link');
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    },

    handleResize() {
      // Trigger resize events for components that need it
      const resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);
    }
  };

  // =============================================
  // Initialize Application
  // =============================================
  App.init();

  // =============================================
  // Global Helpers (for inline handlers in HTML)
  // =============================================
  window.scrollToSection = function(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.activateFloatingCard = function() {
    try { FloatingCard.show(); } catch (e) { /* no-op */ }
  };

  // =============================================
  // AI Lab Neon Glass Shine/Tilt
  // =============================================
  const AILabShine = {
    init() {
      const scopes = ['#ai-lab', '#featured'];
      let cards = [];
      scopes.forEach(sel => {
        const root = document.querySelector(sel);
        if (root) cards = cards.concat(Array.from(root.querySelectorAll('.lab-card')));
      });
      if (!cards.length) return;
      cards.forEach(card => this.bind(card));
    },
    bind(card) {
      const inner = card.querySelector('.card-inner');
      if (!inner) return;
      const onMove = (e) => {
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 2 - 1; // -1..1
        const py = (y / rect.height) * 2 - 1; // -1..1
        // Tilt limits
        const maxTilt = 8; // deg
        card.style.setProperty('--rx', `${(-py * maxTilt).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(px * maxTilt).toFixed(2)}deg`);
        inner.style.setProperty('--mx', `${x}px`);
        inner.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--shine', '1');
      };
      const onLeave = () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--shine', '0');
      };
      inner.addEventListener('pointermove', onMove);
      inner.addEventListener('pointerleave', onLeave);
    }
  };

  // =============================================
  // FOCUS_AREAS Tiles: Ripple + micro tilt
  // =============================================
  const FocusTiles = {
    init() {
      const focus = document.getElementById('focus');
      if (!focus) return;
      const cards = focus.querySelectorAll('.lab-card .card-inner');
      cards.forEach(card => this.bind(card));
    },
    bind(inner) {
      const parent = inner.closest('.lab-card');
      if (!parent) return;
      const onMove = (e) => {
        const r = inner.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        inner.style.setProperty('--mx', `${x}px`);
        inner.style.setProperty('--my', `${y}px`);
        const px = (x / r.width) * 2 - 1;
        const py = (y / r.height) * 2 - 1;
        const maxTilt = 4;
        parent.style.transform = `translateY(-4px) rotateX(${(-py*maxTilt).toFixed(2)}deg) rotateY(${(px*maxTilt).toFixed(2)}deg)`;
      };
      const onLeave = () => {
        parent.style.transform = '';
      };
      const onClick = (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'focus-ripple';
        const r = inner.getBoundingClientRect();
        ripple.style.left = `${e.clientX - r.left}px`;
        ripple.style.top = `${e.clientY - r.top}px`;
        inner.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
      };
      inner.addEventListener('pointermove', onMove);
      inner.addEventListener('pointerleave', onLeave);
      inner.addEventListener('click', onClick);
    }
  };

})();
