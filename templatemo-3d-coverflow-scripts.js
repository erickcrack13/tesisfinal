/*
  TemplateMo 595 3d coverflow
  https://templatemo.com/tm-595-3d-coverflow
*/

(function() {
    'use strict';

    const coverflow = document.getElementById('coverflow');
    const items = document.querySelectorAll('.coverflow-item');
    const totalItems = items.length;
    const infoTitle = document.getElementById('current-title');
    const infoDescription = document.getElementById('current-description');
    const dotsContainer = document.getElementById('dots');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn?.querySelector('.play-icon');
    const pauseIcon = playPauseBtn?.querySelector('.pause-icon');

    // **Código del lightbox eliminado:**
    // const lightboxOverlay = document.createElement('div');
    // lightboxOverlay.classList.add('lightbox-overlay');
    // document.body.appendChild(lightboxOverlay);

    let currentIndex = 3;
    let autoplayInterval;
    let autoplaySpeed = 3000;
    let isAutoplayPlaying = false;
    let isAnimating = false;
    // **Variable de lightbox eliminada:**
    // let wasAutoplayPlayingBeforeLightbox = false;

    const itemData = [
        { title: "PAGINA MODERNA", description: "BUENA CALIDAD DE PAGINA Y BUENA TOMA DE COLORES" },
        { title: "carteles publicitario", description: "MEJOR EXPERIENCIA VISUAL GRAFICA" },
        { title: "DISEÑO WEB", description: "DISEÑO RESPONSIVO Y MODERNO" },
        { title: "PAGINA WEB", description: "DISEÑO LIMPIO Y FUNCIONAL" },
        { title: "PAGINA WEB", description: "PAGINA CON UN DISEÑO LIMPIO Y MODERNO" },
        { title: "DISEÑO GRAFICO", description: "PAGINA CON UN DISEÑO GRAFICO MODERNO" },
        { title: "DISEÑO DE PAGINAS", description: "DISEÑO DE PAGINAS CON UN ENFOQUE MODERNO Y LIMPIO" }
    ];

    function updateCoverflow() {
        if (isAnimating) return;
        isAnimating = true;

        items.forEach((item, index) => {
            let offset = index - currentIndex;
            if (offset > items.length / 2) offset -= items.length;
            else if (offset < -items.length / 2) offset += items.length;

            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);

            let translateX = offset * 220;
            let translateZ = -absOffset * 200;
            let rotateY = -sign * Math.min(absOffset * 60, 60);
            let opacity = 1 - (absOffset * 0.2);
            let scale = 1 - (absOffset * 0.1);

            if (absOffset > 3) {
                opacity = 0;
                translateX = sign * 800;
            }

            item.style.transform = `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            item.style.opacity = opacity;
            item.style.zIndex = 100 - absOffset;
            item.classList.toggle('active', index === currentIndex);
        });

        updateInfo(currentIndex);
        updateDots();

        // Usa 'transitionend' para detectar el final de la animación de forma precisa
        const activeItem = items[currentIndex];
        if (activeItem) {
            activeItem.addEventListener('transitionend', () => {
                isAnimating = false;
            }, { once: true });
        } else {
            isAnimating = false;
        }
    }

    function updateInfo(index) {
        if (infoTitle && infoDescription) {
            const currentData = itemData[index];
            infoTitle.textContent = currentData.title;
            infoDescription.textContent = currentData.description;

            infoTitle.style.animation = 'none';
            infoDescription.style.animation = 'none';
            setTimeout(() => {
                infoTitle.style.animation = 'fadeIn 0.6s forwards';
                infoDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);
        }
    }

    function updateDots() {
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    goToIndex(index);
                });
                dotsContainer.appendChild(dot);
            });
        }
    }

    window.navigate = function(direction) {
        if (isAnimating) return;
        currentIndex = (currentIndex + direction + items.length) % items.length;
        updateCoverflow();
    };

    function goToIndex(index) {
        if (isAnimating || index === currentIndex) return;
        currentIndex = index;
        updateCoverflow();
    }
    
    function startAutoplay() {
        if (!autoplayInterval) {
            autoplayInterval = setInterval(() => window.navigate(1), autoplaySpeed);
            isAutoplayPlaying = true;
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'inline-block';
        }
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            isAutoplayPlaying = false;
            if (playIcon) playIcon.style.display = 'inline-block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    }

    window.toggleAutoplay = function() {
        if (isAutoplayPlaying) stopAutoplay();
        else startAutoplay();
    };

    // **Todo el bloque de código para manejar el lightbox fue eliminado**
    // function closeLightbox() { ... }
    // function openLightbox(imageUrl) { ... }
    // document.querySelectorAll('.lightbox-trigger').forEach(trigger => { ... });
    // if (lightboxOverlay) { ... }
    // document.addEventListener('keydown', (e) => { ... });

    updateCoverflow();
    const coverflowContainer = document.querySelector('.coverflow-container');
    if (coverflowContainer) {
        coverflowContainer.focus();
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', window.toggleAutoplay);
    }
    
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-item');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
        item.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (mainMenu) mainMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (menuToggle && mainMenu && !menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            mainMenu.classList.remove('active');
        }
    });
    
    if (coverflowContainer) {
        coverflowContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { window.navigate(-1); }
            if (e.key === 'ArrowRight') { window.navigate(1); }
        });
    }
    
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => { window.navigate(-1); });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => { window.navigate(1); });
    }
    
    items.forEach((item, index) => {
        const img = item.querySelector('img');
        const reflection = item.querySelector('.reflection');
        if (img && reflection) {
            img.onload = () => {
                img.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${img.src})`);
                reflection.style.backgroundImage = `url(${img.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            };
            img.onerror = () => img.parentElement.classList.add('image-loading');
        }
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    if (!item.classList.contains('external')) {
                        item.classList.remove('active');
                    }
                });
                if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                    menuItems[index].classList.add('active');
                }
            }
        });

        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            if (scrollToTopBtn) scrollToTopBtn.classList.add('visible');
        } else {
            if (scrollToTopBtn) scrollToTopBtn.classList.remove('visible');
        }
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
// Referencia al botón de cerrar
const closeBtn = document.querySelector('.lightbox-close-btn');

// Cierra el lightbox al hacer clic en el botón
closeBtn.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
});

// También cierra el lightbox al hacer clic fuera de la imagen
lightboxOverlay.addEventListener('click', (event) => {
    if (event.target === lightbox-overlay) {
        lightboxOverlay.classList.remove('active');
    }
});
$(document).ready(function() {
    var coverflowItems = $('.coverflow-item');
    var lightboxOverlay = $('.lightbox-overlay');
    var lightboxImage = $('.lightbox-image');
    var currentImageIndex;

    // Obtiene todas las URLs de las imágenes del carrusel
    var allImages = coverflowItems.map(function() {
        return $(this).find('img').attr('src');
    }).get();

    // 1. Maneja el clic en las miniaturas para abrir el lightbox
    coverflowItems.on('click', function(e) {
        e.preventDefault();
        currentImageIndex = $(this).data('index');
        var imageSrc = allImages[currentImageIndex];

        lightboxImage.attr('src', imageSrc);
        lightboxOverlay.fadeIn(300); // Muestra el lightbox
    });

    // 2. Maneja el clic en el botón de cerrar
    $('.lightbox-close-btn').on('click', function() {
        lightboxOverlay.fadeOut(300); // Oculta el lightbox
    });

    // 3. Maneja la navegación con los botones "anterior" y "siguiente"
    $('.lightbox-nav-btn.prev-btn').on('click', function(e) {
        e.stopPropagation(); // Evita que el clic se propague y cierre el lightbox
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        lightboxImage.attr('src', allImages[currentImageIndex]);
    });

    $('.lightbox-nav-btn.next-btn').on('click', function(e) {
        e.stopPropagation(); // Evita que el clic se propague y cierre el lightbox
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        lightboxImage.attr('src', allImages[currentImageIndex]);
    });

    // 4. Cierra el lightbox si haces clic en el fondo oscuro
    lightboxOverlay.on('click', function(e) {
        if ($(e.target).is('.lightbox-overlay')) {
            lightboxOverlay.fadeOut(300);
        }
    });

    // El resto de tu código para el carrusel...
    // ...
});
document.addEventListener('DOMContentLoaded', function() {
 const profileImage = document.querySelector('.js-tilt');

 if (profileImage) {
 profileImage.addEventListener('mousemove', (event) => {
 const rect = profileImage.getBoundingClientRect();
 const x = event.clientX - rect.left;
 const y = event.clientY - rect.top;

 const width = rect.width;
 const height = rect.height;

 const tiltX = (y - height / 2) / height * 10; // Ajusta el valor (10) para la intensidad del tilt
 const tiltY = (x - width / 2) / width * 10; // Ajusta el valor (10) para la intensidad del tilt

 profileImage.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
 });

 profileImage.addEventListener('mouseleave', () => {
 profileImage.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
 });
 }
});
