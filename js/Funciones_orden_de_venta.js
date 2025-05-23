// =======================
// MODO OSCURO
// =======================
function toggleDarkMode() {
    const body = document.getElementById("body");
    const isDarkMode = body.classList.toggle("dark-mode");

    localStorage.setItem("darkMode", isDarkMode);

    const darkModeBtn = document.getElementById("darkModeBtn");
    darkModeBtn.innerHTML = isDarkMode
        ? '<i class="fas fa-sun me-2"></i>Modo Día'
        : '<i class="fas fa-moon me-2"></i>Modo Noche';

    // Añadir modo oscuro a contenido dinámico también
    const contenido = document.getElementById("contenido-orden-venta");
    if (contenido) {
        contenido.classList.toggle("dark-mode");
    }
}


// Activar modo noche si estaba activo
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const body = document.getElementById("body");
    const contenido = document.getElementById("contenido-orden-venta");

    if (isDarkMode) {
        body.classList.add("dark-mode");
        if (contenido) {
            contenido.classList.add("dark-mode");
        }

        const darkModeBtn = document.getElementById("darkModeBtn");
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun me-2"></i>Modo Día';
        }
    }
});




// Cargar estado inicial del modo
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        const darkModeBtn = document.getElementById("darkModeBtn");
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun me-2"></i>Modo Día';
        }
    }
});


// =======================
// CLIENTES
// =======================
const clientes = {
    "12345678-9": { nombre: "KOMATSU CHILE S.A.", contacto: "Carlos Moya", ocRef: "OC-001122" },
    "11111111-1": { nombre: "3M CHILE LIMITADA", contacto: "Valentina Reyes", ocRef: "REF-7890" },
    "22222222-2": { nombre: "MAKITA CHILE S.A.", contacto: "Valentina Reyes", ocRef: "REF-7890" },
    "33333333-3": { nombre: "CONSTRUCTORA DEL SUR S.A", contacto: "Valentina Reyes", ocRef: "REF-7890" },
    "44444444-4": { nombre: "CODELCO", contacto: "Valentina Reyes", ocRef: "REF-7890" },
};

function validarRut(rut) {
    return /^\d{7,8}-[\dkK]$/.test(rut);
}

function buscarCliente() {
    const rut = document.getElementById("rutCliente").value.trim();

    if (!validarRut(rut)) {
        alert("Formato de RUT inválido. Ejemplo válido: 12345678-9");
        return;
    }

    const cliente = clientes[rut];

    if (cliente) {
        document.getElementById("nombreCliente").value = cliente.nombre;
        document.getElementById("contactoCliente").value = cliente.contacto;
        document.getElementById("ocCliente").value = cliente.ocRef;
    } else {
        alert("Cliente no encontrado. Verifique el RUT.");
        document.getElementById("nombreCliente").value = "";
        document.getElementById("contactoCliente").value = "";
        document.getElementById("ocCliente").value = "";
    }
}

// =======================
// ARTÍCULOS
// =======================
const articulos = {
    "F123456": { descripcion: "Martillo de acero 16oz", cantidad: 1, precio: 3490 },
    "F123457": { descripcion: "Destornillador Philips", cantidad: 1, precio: 1500 }
};

function buscarArticuloDesdeBoton(boton) {
    const fila = boton.closest("tr");
    const inputCodigo = fila.querySelector(".codigo-articulo");
    const codigo = inputCodigo.value.trim().toUpperCase();
    const datos = articulos[codigo];
    const hoy = new Date().toISOString().split("T")[0];
    const inputFecha = fila.querySelector(".fecha-solicitud");

    if (datos) {
        fila.querySelector(".descripcion").value = datos.descripcion;
        fila.querySelector(".cantidad").value = datos.cantidad;
        fila.querySelector(".precio").value = datos.precio.toLocaleString('es-CL');
        fila.querySelector(".total").value = (datos.precio * datos.cantidad).toLocaleString('es-CL');
        inputFecha.value = hoy;
    } else {
        alert("Artículo no encontrado.");
        fila.querySelector(".descripcion").value = "";
        fila.querySelector(".cantidad").value = "";
        fila.querySelector(".precio").value = "";
        fila.querySelector(".total").value = "";
        inputFecha.value = hoy;
    }
}

function recalcularTotal(input) {
    const fila = input.closest("tr");
    const cantidad = parseFloat(fila.querySelector(".cantidad").value.replace(/\./g, ''));
    const precio = parseFloat(fila.querySelector(".precio").value.replace(/\./g, ''));

    if (!isNaN(cantidad) && !isNaN(precio)) {
        fila.querySelector(".total").value = (cantidad * precio).toLocaleString('es-CL');
    } else {
        fila.querySelector(".total").value = '';
    }
}

// =======================
// PROVEEDORES
// =======================
const proveedores = [
    { codigo: "P21555555-5", nombre: "Factoring S.A." },
    { codigo: "P12345666-6", nombre: "Pullman Cargo Factoring" },
    { codigo: "P98765432-1", nombre: "Servicios Ferreteros" },
    { codigo: "P22222222-2", nombre: "Sodimac Pro" }
];

let filaProveedorActiva = null;

function abrirModalProveedor(boton) {
    filaProveedorActiva = boton.closest("tr");
    document.getElementById("buscarRUT").value = "";
    cargarListaProveedores(proveedores);
    new bootstrap.Modal(document.getElementById("modalProveedores")).show();
}

function cargarListaProveedores(lista) {
    const cuerpo = document.getElementById("tablaProveedores");
    cuerpo.innerHTML = "";
    lista.forEach(p => {
        const fila = document.createElement("tr");
        fila.style.cursor = "pointer";
        fila.onclick = () => seleccionarProveedorDesdeModal(p.codigo);
        fila.innerHTML = `<td>${p.codigo}</td><td>${p.nombre}</td>`;
        cuerpo.appendChild(fila);
    });
}

function filtrarProveedores() {
    const texto = document.getElementById("buscarRUT").value.toLowerCase();
    const filtrados = proveedores.filter(p =>
        p.codigo.toLowerCase().includes(texto) || p.nombre.toLowerCase().includes(texto)
    );
    cargarListaProveedores(filtrados);
}

function seleccionarProveedorDesdeModal(codigo) {
    if (filaProveedorActiva) {
        filaProveedorActiva.querySelector(".proveedor").value = codigo;
    }
    bootstrap.Modal.getInstance(document.getElementById("modalProveedores")).hide();
}

// =======================
// FECHAS
// =======================
document.addEventListener('DOMContentLoaded', () => {
    const hoy = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => input.value = hoy);
});

// =======================
// ARCHIVOS / ANEXOS
// =======================
function procesarArchivo(input) {
    const fila = input.closest("tr");
    const archivo = input.files[0];

    if (archivo) {
        fila.querySelector(".ruta").value = input.value;
        fila.querySelector(".nombre-archivo").value = archivo.name;

        const fechaInput = fila.querySelector(".fecha-anexo");
        if (!fechaInput.value) {
            fechaInput.value = new Date().toISOString().split("T")[0];
        }
    }
}

function visualizarArchivo(boton) {
    const fila = boton.closest("tr");
    const input = fila.querySelector(".archivo");
    if (input.files[0]) {
        const url = URL.createObjectURL(input.files[0]);
        window.open(url, "_blank");
    } else {
        alert("Primero debes seleccionar un archivo.");
    }
}

function borrarFila(boton) {
    const fila = boton.closest("tr");
    fila.remove();
    actualizarNumeracion();
}

function agregarFilaAnexo() {
    const tbody = document.getElementById("tablaAnexosBody");
    const filaOriginal = tbody.rows[0];
    const nuevaFila = filaOriginal.cloneNode(true);

    nuevaFila.querySelectorAll("input").forEach(input => {
        input.value = "";
        if (input.type === "file") {
            const nuevoInput = input.cloneNode();
            nuevoInput.onchange = () => procesarArchivo(nuevoInput);
            input.parentNode.replaceChild(nuevoInput, input);
        }
    });

    tbody.appendChild(nuevaFila);
    actualizarNumeracion();
}

function actualizarNumeracion() {
    document.querySelectorAll("#tablaAnexosBody tr").forEach((fila, i) => {
        fila.cells[0].textContent = i + 1;
    });
}

// =======================
// PRODUCTOS
// =======================
function agregarFilaProducto() {
    const tabla = document.querySelector("#contenido tbody");
    const filaOriginal = tabla.querySelector("tr");
    const nuevaFila = filaOriginal.cloneNode(true);

    nuevaFila.querySelectorAll("input").forEach(input => input.value = "");
    nuevaFila.querySelectorAll("select").forEach(select => select.selectedIndex = 0);

    if (!nuevaFila.querySelector(".btn-eliminar")) {
        const celda = document.createElement("td");
        celda.classList.add("p-2");
        celda.innerHTML = `<button class="btn btn-sm btn-outline-danger btn-eliminar" onclick="eliminarFila(this)"><i class="fas fa-trash"></i></button>`;
        nuevaFila.appendChild(celda);
    }

    tabla.appendChild(nuevaFila);
}

// =======================
// ELIMINAR FILAS PRODUCTOS
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const fila = document.querySelector("#contenido tbody tr");
    if (fila && !fila.querySelector(".btn-eliminar")) {
        const celda = document.createElement("td");
        celda.classList.add("p-2");
        celda.innerHTML = `<button class="btn btn-sm btn-outline-danger btn-eliminar" onclick="eliminarFila(this)"><i class="fas fa-trash"></i></button>`;
        fila.appendChild(celda);
    }
});

function eliminarFila(boton) {
    const fila = boton.closest("tr");
    const tabla = document.querySelector("#contenido tbody");
    if (tabla.rows.length > 1) {
        fila.remove();
    } else {
        alert("Debe haber al menos una fila.");
    }
}

// =======================
// EDITAR DIRECCIÓN
// =======================
function guardarDireccion() {
    const nuevaDireccion = document.getElementById('direccionInput').value;
    document.querySelectorAll('input[placeholder="PDQ IQUIQUE, CHILE"]').forEach(input => input.value = nuevaDireccion);
    bootstrap.Modal.getInstance(document.getElementById('modalEditarDireccion')).hide();
}
