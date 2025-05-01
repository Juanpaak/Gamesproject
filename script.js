document.addEventListener('DOMContentLoaded', () => {
  // ===== FILTRADO Y ORDENAMIENTO =====
  const categoriaFiltro = document.getElementById('categoria-filtro');
  const ordenSelect = document.getElementById('orden');
  const btnReset = document.getElementById('reset-filtros');
  const galeria = document.querySelector('.galeria');
  const items = Array.from(document.querySelectorAll('.item'));

  function filtrarYOrdenar() {
    const categoria = categoriaFiltro.value;
    const orden = ordenSelect.value;

    // 1. Filtrar por categoría
    items.forEach(item => {
      const itemCategoria = item.getAttribute('data-categoria');
      if (categoria === 'todas' || itemCategoria === categoria) {
        item.classList.remove('filtro-oculto');
      } else {
        item.classList.add('filtro-oculto');
      }
    });

    // 2. Ordenar
    const itemsVisibles = items.filter(item => !item.classList.contains('filtro-oculto'));
    itemsVisibles.sort((a, b) => {
      const nombreA = a.getAttribute('data-nombre').toLowerCase();
      const nombreB = b.getAttribute('data-nombre').toLowerCase();
      return orden === 'a-z' 
        ? nombreA.localeCompare(nombreB) 
        : nombreB.localeCompare(nombreA);
    });

    // 3. Reordenar en el DOM con animación
    setTimeout(() => {
      itemsVisibles.forEach(item => galeria.appendChild(item));
    }, 300);
  }

  // Eventos
  categoriaFiltro.addEventListener('change', filtrarYOrdenar);
  ordenSelect.addEventListener('change', filtrarYOrdenar);
  btnReset.addEventListener('click', () => {
    categoriaFiltro.value = 'todas';
    ordenSelect.value = 'a-z';
    filtrarYOrdenar();
  });

  // ===== CARRUSEL INTERACTIVO =====
  const carrusel = document.querySelector('.imagenes-carrusel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const imgWidth = document.querySelector('.imagenes-carrusel img').offsetWidth;
  const gap = 24; // 1.5rem en px

  nextBtn.addEventListener('click', () => {
    carrusel.scrollBy({ left: imgWidth + gap, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carrusel.scrollBy({ left: -(imgWidth + gap), behavior: 'smooth' });
  });

  // Auto-desplazamiento
  let intervalId = setInterval(() => {
    if (carrusel.scrollLeft + carrusel.offsetWidth >= carrusel.scrollWidth) {
      carrusel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carrusel.scrollBy({ left: imgWidth + gap, behavior: 'smooth' });
    }
  }, 5000);

  // Pausar hover
  carrusel.addEventListener('mouseenter', () => clearInterval(intervalId));
  carrusel.addEventListener('mouseleave', () => {
    intervalId = setInterval(() => {
      if (carrusel.scrollLeft + carrusel.offsetWidth >= carrusel.scrollWidth) {
        carrusel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carrusel.scrollBy({ left: imgWidth + gap, behavior: 'smooth' });
      }
    }, 5000);
  });

  // Inicializar
  filtrarYOrdenar();
});
