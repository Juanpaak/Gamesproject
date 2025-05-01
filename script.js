document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const categoriaFiltro = document.getElementById('categoria-filtro');
  const ordenSelect = document.getElementById('orden');
  const btnReset = document.getElementById('reset-filtros');
  const galeria = document.querySelector('.galeria');
  const items = Array.from(document.querySelectorAll('.item'));

  // Función principal
  function filtrarYOrdenar() {
    const categoria = categoriaFiltro.value;
    const orden = ordenSelect.value;

    // 1. Filtrar
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
    }, 300); // Espera a que termine la transición CSS
  }

  // Event Listeners
  categoriaFiltro.addEventListener('change', filtrarYOrdenar);
  ordenSelect.addEventListener('change', filtrarYOrdenar);
  
  btnReset.addEventListener('click', () => {
    categoriaFiltro.value = 'todas';
    ordenSelect.value = 'a-z';
    filtrarYOrdenar();
  });

  // Inicializar
  filtrarYOrdenar();

  // Carrusel (código previo)
  // ...
});
