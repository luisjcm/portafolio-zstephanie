// 1. Definimos los datos y los exponemos globalmente de inmediato
window.galleryData = {
    proyectos: [
        { id: 1, type: 'video', thumb: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg', title: 'Edición Reel A' },
        
        { 
            id: 2, 
            type: 'video', 
            thumb: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg', 
            title: 'Storytelling Reel' 
        },
        { 
            id: 3, 
            type: 'video', 
            thumb: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg', 
            title: 'Diseño Estratégico' 
        },
        { 
            id: 4, 
            type: 'video', 
            thumb: 'https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg', 
            title: 'Campaña Marcas' 
        }

    ],
    experiencia: [
        { 
            id: 10, 
            type: 'text', 
            title: 'Social Media Manager', 
            company: 'Agencia Creativa', 
            date: '2023 - Presente',
            desc: 'Gestión de comunidades y creación de contenido estratégico.' 
        },
        { 
            id: 11, 
            type: 'text', 
            title: 'Editora de Video', 
            company: 'Freelance', 
            date: '2021 - 2023',
            desc: 'Edición de más de 100 Reels con alto impacto orgánico.' 
        }
    ],
    formacion: [
        { 
            id: 20, 
            type: 'text', 
            title: 'Estratega Digital', 
            company: 'Universidad de Marketing', 
            date: '2022',
            desc: 'Especialización en narrativa visual y algoritmos.' 
        }
    ]
};


window.showComingSoonToast = () => {
    const toast = document.getElementById('toast');
    
    // Evitar múltiples clics rápidos
    if (toast.classList.contains('opacity-100')) return;

    // Mostrar
    toast.classList.remove('opacity-0', 'translate-y-10');
    toast.classList.add('opacity-100', 'translate-y-0');

    // Ocultar después de 5 segundos
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-10');
    }, 5000);
};

window.filterGallery = function(category, event = null) {
    const container = document.getElementById('gallery-grid');
    const items = window.galleryData[category] || [];
    const tabs = document.querySelectorAll('.tab-link');

    // 1. Identificar el Tab actual
    let activeTab;
    if (event && event.currentTarget) {
        activeTab = event.currentTarget;
    } else {
        activeTab = tabs[0]; // Proyectos por defecto
    }

    // 2. Cambiar estados de clases
    tabs.forEach(tab => {
        const indicator = tab.querySelector('.active-indicator');
        
        // Resetear todos los tabs
        tab.classList.remove('text-white', 'active');
        tab.classList.add('text-zinc-500');
        
        // Resetear indicadores (Línea invisible y pequeña)
        indicator.classList.remove('scale-x-100', 'opacity-100');
        indicator.classList.add('scale-x-0', 'opacity-0');
    });

    // 3. Activar el tab seleccionado
    activeTab.classList.remove('text-zinc-500');
    activeTab.classList.add('text-white', 'active');
    
    const activeIndicator = activeTab.querySelector('.active-indicator');
    activeIndicator.classList.remove('scale-x-0', 'opacity-0');
    activeIndicator.classList.add('scale-x-100', 'opacity-100');

    // 4. Renderizado dinámico
    container.innerHTML = items.map(item => {
        if (item.type === 'text') {
            return `
                <div class="col-span-full md:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl animate-in fade-in zoom-in duration-500">
                    <span class="text-[#B19CD9] text-[10px] font-bold uppercase tracking-widest">${item.date}</span>
                    <h4 class="text-white text-lg font-semibold mt-1">${item.title}</h4>
                    <p class="text-zinc-500 text-xs mb-3">${item.company}</p>
                    <p class="text-zinc-400 text-sm leading-relaxed">${item.desc}</p>
                </div>
            `;
        } else {
            return `
                <div class="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-zinc-900 animate-in fade-in zoom-in duration-500">
                    <img src="${item.thumb}" class="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black">
                        <p class="text-white text-[10px] font-medium uppercase tracking-wider">${item.title}</p>
                    </div>
                </div>
            `;
        }
    }).join('');
};

// 3. Inicialización optimizada para Vite/Dell
window.addEventListener('load', () => {
    // Un pequeño delay asegura que el navegador calculó bien los offsetLeft de los botones
    setTimeout(() => {
        window.filterGallery('proyectos');
    }, 100);
});