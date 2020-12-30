const carrito = document.getElementById("carrito");
const divListaCursos = document.getElementById("lista-cursos");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const tableListaCarrito = document.querySelector("#lista-carrito tbody");
let articulosCarrito = [];

callListeners();
function callListeners() {
  //Al presionar el btn de agregar al carrito
  divListaCursos.addEventListener("click", addCurso);

  // Eliminar curso
  carrito.addEventListener("click", eliminarDelCarrito);

  // Vaciar carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = []; /* Limpiamos el array carrito */
    cleanHTML(); /* Limpiamos el HTML del carrito */
  });
}

// Funciones

function eliminarDelCarrito(e) {
  const deleteId = e.target.getAttribute("data-id");
  articulosCarrito = articulosCarrito.filter((curso) => curso.id !== deleteId);
  addCarrito(); /* Actualiza el carrito con el nuevo arreglo */
}

function addCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const dataCurso = e.target.parentNode.parentNode;
    readDataCurso(dataCurso);
  }
}

// lee el contenido html del curso
function readDataCurso(curso) {
  // Crea un objeto con la info del curso actual
  const dataCurso = {
    img: curso.querySelector("img").getAttribute("src"),
    titulo: curso.querySelector("h4").textContent.trim(),
    id: curso.querySelector("a").getAttribute("data-id"),
    precio: curso.querySelector(".precio span").textContent.trim(),
    cantidad: 1,
  };
  /* Si el usuario selecciona el mismo curso dos veces sumamos la cantidad */
  const existe = articulosCarrito.some((curso) => curso.id === dataCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === dataCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, dataCurso];
  }
  addCarrito();
}

function addCarrito() {
  // limpia HTML carrito
  cleanHTML();

  articulosCarrito.forEach((curso) => {
    const { titulo, precio, img, cantidad, id } = curso;
    let row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${img}" alt=${titulo} width="120"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">x</a></td>

    `;
    tableListaCarrito.appendChild(row);
  });
}

// clean html carrito

function cleanHTML() {
  while (tableListaCarrito.firstChild) {
    tableListaCarrito.removeChild(tableListaCarrito.firstChild);
  }
}
