document.addEventListener('DOMContentLoaded', () => {

  // Imagen de reemplazo si alguna foto no carga (evita que se vea un ícono roto)
  const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="#2a2224"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#d49a82" text-anchor="middle" dy=".3em">DSV</text></svg>`
  );

  // 1. EFECTO BURBUJAS / DESTELLOS
  const canvas = document.getElementById('bubblesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.radius = Math.random() * 3.5 + 1.2;
        this.speedY = Math.random() * 1.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 154, 130, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f3d1be';
        ctx.fill();
        ctx.closePath();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }

  // 2. SERVICIOS Y MODAL
  const serviciosData = [
    {
      id: 'unas',
      icon: `<svg class="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v3"/><path d="M14 9V4a2 2 0 0 0-4 0v5"/><path d="M10 9V5a2 2 0 0 0-4 0v8.5a5.5 5.5 0 0 0 11 0V11a1.5 1.5 0 0 0-3 0Z"/><path d="M12 2v2"/><path d="M8 3v2"/><path d="M16 4v2"/></svg>`,
      title: 'Uñas',
      desc: 'Manicure, pedicure, acrílicas, gel, polygel y nail art.',
      items: ['Manicure', 'Pedicure', 'Uñas Acrílicas', 'Gel', 'Polygel', 'Nail Art', 'Diseños personalizados']
    },
    {
      id: 'cejas',
      icon: `<svg class="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13c5-6 13-7 20-3"/><path d="M4 11.5c4.5-4 11-4.5 16-1.5"/><path d="M17 17l4 4"/><path d="M19 15l2 2"/></svg>`,
      title: 'Cejas',
      desc: 'Diseño, perfilado, henna, laminado y microblading.',
      items: ['Diseño de cejas', 'Henna', 'Laminado', 'Microblading', 'Perfilado']
    },
    {
      id: 'pestanas',
      icon: `<svg class="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/><circle cx="12" cy="14" r="3"/><path d="M3 9.5L1.5 7M21 9.5l1.5-2.5M12 6.5V3.5M6.5 7.5L5 5.5M17.5 7.5l1.5-2"/></svg>`,
      title: 'Pestañas',
      desc: 'Extensiones clásicas, volumen, rímel y diseños.',
      items: ['Clásicas', 'Efecto mojado', 'Efecto rímel', 'Ojo de gato', 'Ojo muñeca']
    },
    {
      id: 'peinados',
      icon: `<svg class="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><path d="M16 8c2-1 4 0 5 2"/></svg>`,
      title: 'Peinados',
      desc: 'Sociales, novias, ondas, recogidos y planchado.',
      items: ['Ondas', 'Peinados para novias', 'Peinados sociales', 'Planchado', 'Recogidos', 'Trenzas']
    },
    {
      id: 'depilacion',
      icon: `<svg class="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/><path d="M12 18a3 3 0 0 0 3-3"/></svg>`,
      title: 'Depilación',
      desc: 'Facial y corporal con cera e hilo.',
      items: ['Axilas', 'Bikini', 'Cera', 'Hilo', 'Piernas', 'Rostro']
    }
  ];

  const serviciosGrid = document.getElementById('serviciosGrid');
  const serviceModal = document.getElementById('serviceModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalList = document.getElementById('modalList');
  const modalWaBtn = document.getElementById('modalWaBtn');
  const closeModal = document.getElementById('closeModal');

  const NUMERO_WHATSAPP = '51941134040';
  let itemsSeleccionados = new Set();
  let servicioActual = null;

  function actualizarBotonReservar() {
    let mensaje;
    if (itemsSeleccionados.size > 0) {
      const lista = Array.from(itemsSeleccionados).join(', ');
      mensaje = `Hola, deseo reservar una cita para el servicio de ${servicioActual.title} (${lista}).`;
      modalWaBtn.textContent = `RESERVAR (${itemsSeleccionados.size}) →`;
    } else {
      mensaje = `Hola, deseo reservar una cita para el servicio de ${servicioActual.title}.`;
      modalWaBtn.textContent = 'RESERVAR CITA';
    }
    modalWaBtn.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  }

  if (serviciosGrid) {
    serviciosGrid.innerHTML = '';
    serviciosData.forEach(srv => {
      const card = document.createElement('div');
      card.className = 'servicio-card';
      card.innerHTML = `
        <div class="card-icon">${srv.icon}</div>
        <h3>${srv.title}</h3>
        <p>${srv.desc}</p>
        <button class="btn-ver-detalles">VER DETALLES →</button>
      `;

      card.addEventListener('click', () => {
        servicioActual = srv;
        itemsSeleccionados = new Set();

        modalIcon.innerHTML = srv.icon;
        modalTitle.textContent = srv.title;

        modalList.innerHTML = '';
        srv.items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'modal-list-item';
          li.setAttribute('role', 'checkbox');
          li.setAttribute('aria-checked', 'false');
          li.tabIndex = 0;
          li.innerHTML = `
            <span class="check-box"><span class="check-mark">✓</span></span>
            <span class="sparkle">✦</span> ${item}
          `;

          const alternarSeleccion = () => {
            if (itemsSeleccionados.has(item)) {
              itemsSeleccionados.delete(item);
              li.classList.remove('selected');
              li.setAttribute('aria-checked', 'false');
            } else {
              itemsSeleccionados.add(item);
              li.classList.add('selected');
              li.setAttribute('aria-checked', 'true');
            }
            actualizarBotonReservar();
          };

          li.addEventListener('click', alternarSeleccion);
          li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              alternarSeleccion();
            }
          });

          modalList.appendChild(li);
        });

        actualizarBotonReservar();
        serviceModal.classList.add('active');
      });

      serviciosGrid.appendChild(card);
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => serviceModal.classList.remove('active'));
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) serviceModal.classList.remove('active');
    });
  }

  // 3. GALERÍA CATEGORIZADA (RUTAS DENTRO DE CARPETAS CON FALLBACK)
  /* ------------------------------------------------------------
     RUTAS DE IMÁGENES: solo minúsculas, sin espacios ni tildes.
     Esto es obligatorio para que las fotos carguen bien en
     GitHub Pages (es sensible a mayúsculas/minúsculas y a los
     acentos/espacios en los nombres de archivo, aunque en tu PC
     o en la vista previa de Visual Studio sí se vean bien).
  ------------------------------------------------------------ */
  const galeriaPorCategorias = [
    {
      categoria: 'CEJAS',
      folder: 'cejas',
      fotos: [
        { src: 'diseno-de-cejas.jpg', title: 'DISEÑO DE CEJAS' },
        { src: 'henna.jpg', title: 'CEJAS CON HENNA' },
        { src: 'laminado.jpg', title: 'LAMINADO DE CEJAS' },
        { src: 'microblading.jpg', title: 'MICROBLADING' },
        { src: 'perfilado.jpg', title: 'PERFILADO' }
      ]
    },
    {
      categoria: 'PESTAÑAS',
      folder: 'pestanas',
      fotos: [
        { src: 'clasicas.jpg', title: 'PESTAÑAS CLÁSICAS' },
        { src: 'efecto-mojado.jpg', title: 'EFECTO MOJADO' },
        { src: 'efecto-rimel.jpg', title: 'EFECTO RÍMEL' },
        { src: 'ojo-de-gato.jpg', title: 'OJO DE GATO' },
        { src: 'ojo-muneca.jpg', title: 'OJO MUÑECA' }
      ]
    },
    {
      categoria: 'UÑAS',
      folder: 'unas',
      fotos: [
        { src: 'gel.jpg', title: 'UÑAS DE GEL' },
        { src: 'manicure.jpg', title: 'MANICURE' },
        { src: 'nail-art.jpg', title: 'NAIL ART' },
        { src: 'pedicure.jpg', title: 'PEDICURE' },
        { src: 'polygel.jpg', title: 'POLYGEL' },
        { src: 'unas-acrilicas.jpg', title: 'UÑAS ACRÍLICAS' },
        { src: 'disenos-personalizados.jpg', title: 'DISEÑOS PERSONALIZADOS' }
      ]
    },
    {
      categoria: 'PEINADOS',
      folder: 'peinados',
      fotos: [
        { src: 'ondas.jpg', title: 'ONDAS' },
        { src: 'peinados-para-novias.jpg', title: 'PEINADO PARA NOVIAS' },
        { src: 'peinados-sociales.jpg', title: 'PEINADO SOCIAL' },
        { src: 'planchado.jpg', title: 'PLANCHADO' },
        { src: 'recogidos.jpg', title: 'RECOGIDOS' },
        { src: 'trenzas.jpg', title: 'TRENZAS' }
      ]
    },
    {
      categoria: 'DEPILACIÓN',
      folder: 'depilacion',
      fotos: [
        { src: 'axilas.jpg', title: 'DEPILACIÓN DE AXILAS' },
        { src: 'bikini.jpg', title: 'DEPILACIÓN BIKINI' },
        { src: 'cera.jpg', title: 'DEPILACIÓN CON CERA' },
        { src: 'hilo.jpg', title: 'DEPILACIÓN CON HILO' },
        { src: 'piernas.jpg', title: 'DEPILACIÓN DE PIERNAS' },
        { src: 'rostro.jpg', title: 'DEPILACIÓN DE ROSTRO' }
      ]
    }
  ];

  const galeriaContainer = document.getElementById('galeriaCategorias');

  if (galeriaContainer) {
    galeriaContainer.innerHTML = '';
    galeriaPorCategorias.forEach(catGroup => {
      const block = document.createElement('div');
      block.className = 'galeria-bloque';

      const title = document.createElement('h3');
      title.className = 'categoria-titulo';
      title.textContent = catGroup.categoria;
      block.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'mini-gallery-grid';

      catGroup.fotos.forEach(foto => {
        const item = document.createElement('div');
        item.className = 'mini-gallery-item';

        const fullPath = `imagenes/${catGroup.folder}/${foto.src}`;

        const img = document.createElement('img');
        img.src = fullPath;
        img.alt = foto.title;
        img.loading = 'lazy';
        img.onerror = function () {
          this.onerror = null;
          this.src = PLACEHOLDER_IMG;
        };

        const overlay = document.createElement('div');
        overlay.className = 'hover-overlay';
        overlay.innerHTML = `
          <span class="hover-category">${catGroup.categoria}</span>
          <h4 class="hover-title">${foto.title}</h4>
        `;

        item.appendChild(img);
        item.appendChild(overlay);

        grid.appendChild(item);
      });

      block.appendChild(grid);
      galeriaContainer.appendChild(block);
    });
  }

  // 4. NAVEGACIÓN Y MENÚ MÓVIL
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});