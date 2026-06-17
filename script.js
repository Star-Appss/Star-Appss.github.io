// Datos de las Aplicaciones
const APPS_DATA = [
    {
      id: '1',
      name: 'I miss you mom - Mourning',
      shortDescription: '😭​ App dedicada a ese ser tan especial llamado madre, aún después de muerta ..',
      category: 'Entretenimiento',
      rating: 4.9,
      downloads: '10.000+',
      imageUrl: 'img/img1.png',
      UrlApp: 'you_mom/index.html',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mobincube.i_miss_you_mom_mourning.sc_8KH3WZ',
      tags: ['Imagenes', 'Madre,', 'Duelo']
    },
    {
      id: '2',
      name: 'BIBLIA Lenguaje Actual',
      shortDescription: '✝️​ La Sagrada Biblia Traducción al Lenguaje Actual (TLA) no es una adaptación o paráfrasis de ninguna versión castellana existente.',
      category: 'Estilo de Vida',
      rating: 4.8,
      downloads: '100.000+',
     imageUrl: 'img/img2.png',
      UrlApp: 'tla/index.html',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mobincube.biblia_lenguaje_actual_gratis_sin_internet',
      tags: ['Libros', 'Religión', 'Oración']
    },
    {
      id: '3',
      name: 'Indirectas de todo tipo',
      shortDescription: '🎭 El mejor repertorio de indirectas, frases para compartir.',
      category: 'Entretenimiento',
      rating: 4.8,
      downloads: '10.000+',
      imageUrl: 'img/img3.png',
      UrlApp: 'indirectas/index.html',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mobincube.indirectas_para_todos.sc_E34REU',
      tags: ['Indirectas', 'Humor Negro', 'Frases']
    }
  ];
  
  const CATEGORIES = ['Todas', 'Productividad', 'Entretenimiento', 'Utilidades', 'Estilo de Vida'];
  
  // Elementos del DOM
  const gridElement = document.getElementById('apps-grid');
  const filtersElement = document.getElementById('category-filters');
  const noResultsElement = document.getElementById('no-results');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  // Estado actual
  let currentCategory = 'Todas';
  
  // Función para inicializar
  function init() {
    renderFilters();
    renderApps('Todas');
    setupMobileMenu();
    setupSmoothScroll();
    
    // Inicializar iconos de Lucide
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  // Renderizar Botones de Filtro
  function renderFilters() {
    filtersElement.innerHTML = CATEGORIES.map(cat => {
      const isActive = cat === currentCategory;
      const baseClass = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none";
      const activeClass = "bg-primary-600 text-white shadow-lg shadow-primary-500/30";
      const inactiveClass = "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700";
      
      return `
        <button 
          class="${baseClass} ${isActive ? activeClass : inactiveClass}"
          onclick="handleFilterClick('${cat}')"
        >
          ${cat}
        </button>
      `;
    }).join('');
  }
  
  // Manejar click en filtro
  window.handleFilterClick = (category) => {
    currentCategory = category;
    renderFilters();
    renderApps(category);
  };
  
  // Renderizar Tarjetas de Apps
  function renderApps(category) {
    const filteredApps = category === 'Todas' 
      ? APPS_DATA 
      : APPS_DATA.filter(app => app.category === category);
  
    if (filteredApps.length === 0) {
      gridElement.innerHTML = '';
      noResultsElement.classList.remove('hidden');
    } else {
      noResultsElement.classList.add('hidden');
      
      gridElement.innerHTML = filteredApps.map(app => `
        <div class="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 shadow-xl group animate-fade-in-up">
          <div class="relative h-48 overflow-hidden">
            <a href="${app.UrlApp}">
              <img
                  src="${app.imageUrl}"
                  alt="${app.name}"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
            </a>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                 <span class="px-2 py-1 bg-primary-600/90 rounded text-xs font-semibold text-white backdrop-blur-sm">
                    ${app.category}
                 </span>
                 <div class="flex items-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    <i data-lucide="star" class="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1"></i>
                    <span class="text-xs font-bold text-white">${app.rating}</span>
                 </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
            <a href="${app.UrlApp}">
                <h3 class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                ${app.name}
                </h3>
            </a>
            </div>
            
            <p class="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
              ${app.shortDescription}
            </p>

            <div class="flex justify-between ">
              <i  class="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1"></i>
              <a href="${app.UrlApp}" class="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-slate-300 transition-colors cursor-pointer" >
                  + Detalles...
                  </a>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-6">
                ${app.tags.slice(0, 3).map(tag => `
                    <span class="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                        #${tag}
                    </span>
                `).join('')}
            </div>
  
            <div class="flex items-center justify-between pt-4 border-t border-slate-700/50">
               <div class="flex items-center text-slate-400 text-sm">
                  <i data-lucide="download" class="w-4 h-4 mr-1"></i>
                   <span class="gradient-text">${app.downloads}</span>
               </div>
               
               <a 
                 href="${app.playStoreUrl}"
                 class="inline-flex items-right text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
               >
                 Google Play
                 <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
               </a>
            </div>
          </div>
        </div>
      `).join('');
      
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }
  
  // Configuración de Scroll Suave Personalizado (Evita cambio de URL hash que rompe el preview)
  function setupSmoothScroll() {
    const triggers = document.querySelectorAll('.js-scroll-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.setAttribute('data-lucide', 'menu');
                    if(window.lucide) lucide.createIcons();
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
  }
  
  // Configuración Menú Móvil
  function setupMobileMenu() {
    let isOpen = false;
    
    mobileMenuBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      if (window.lucide) {
        lucide.createIcons();
      }
    });
  }
  
  // Iniciar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', init);
