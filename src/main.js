// 1. Definimos los datos y los exponemos globalmente de inmediato
window.galleryData = {
    reels: [
        { id: 1, type: 'video', thumb: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Edición Senior A' },
        { id: 2, type: 'video', thumb: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Storytelling Reel' },
        { id: 3, type: 'video', thumb: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Color Grade Pro' },
    ],
    diseno: [
        { id: 4, type: 'image', thumb: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Branding Project' },
        { id: 5, type: 'image', thumb: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Social Media Kit' },
    ],
    estrategia: [
        { id: 6, type: 'image', thumb: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Content Strategy A' },
    ]
};

// 2. Definimos la función de filtrado
window.filterGallery = function(category, event) {
    const grid = document.getElementById('gallery-grid');
    const buttons = document.querySelectorAll('.tab-link');
    
    if (!grid || !window.galleryData[category]) return;

    // Efecto de salida
    grid.style.opacity = '0';

    setTimeout(() => {
        grid.innerHTML = '';
        
        // Inyectar items usando window.galleryData
        window.galleryData[category].forEach(item => {
            const card = `
                <div class="group relative aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-[#B19CD9]/30 transition-all duration-500 animate-in fade-in zoom-in-95">
                    <img src="${item.thumb}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="${item.title}">
                    <div class="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/95 via-black/50 to-transparent">
                      <p class="text-[10px] uppercase tracking-[0.2em] text-[#B19CD9] font-bold mb-1">${category}</p>
                      <h4 class="text-white text-sm font-medium tracking-wide">${item.title}</h4>
                    </div>
                </div>
            `;
            grid.innerHTML += card;
        });

        // Actualizar estados de botones
        buttons.forEach(btn => {
            btn.classList.remove('text-white');
            btn.classList.add('text-zinc-500');
            const line = btn.querySelector('.active-line');
            if (line) line.remove();
        });

        const targetBtn = event ? event.currentTarget : document.querySelector('.tab-link');
        if (targetBtn) {
            targetBtn.classList.add('text-white');
            targetBtn.classList.remove('text-zinc-500');
            if (!targetBtn.querySelector('.active-line')) {
                targetBtn.innerHTML += `<div class="active-line absolute bottom-0 left-0 w-full h-[2px] bg-[#B19CD9] shadow-[0_0_10px_#B19CD9]"></div>`;
            }
        }

        grid.style.opacity = '1';
    }, 300);
};

// 3. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    window.filterGallery('reels', null);
});