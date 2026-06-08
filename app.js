//Declaraciones
let listaEstudiantes = [
  { id: 0, nombre: "Ana Lopez",    nota: 90 },
  { id: 1, nombre: "Carlos Ruiz",  nota: 55 },
  { id: 2, nombre: "Maria Torres", nota: 78 },
  { id: 3, nombre: "Luis Mendez",  nota: 45 },
  { id: 4, nombre: "Sofia Rios",   nota: 88 },
  { id: 5, nombre: "Pedro Soto",   nota: 62 },
];

const estudianteX = {
    id: 7,
    nombre: "Lucia Gomez",
    nota: 95
}

//Referencias al DOM
const seccionEstudiantes = document.getElementById("lista-estudiantes");
const seccionPromedio = document.getElementById("resultado-promedio");

const btnTodos = document.getElementById("btn-todos");
const btnAprobados = document.getElementById("btn-aprobados");
const btnReprobados = document.getElementById("btn-reprobados");
const btnPromedio = document.getElementById("btn-promedio");

const inputNombre = document.getElementById("input-nombre");
const inputNota = document.getElementById("input-nota");
const btnAgregar = document.getElementById("btn-agregar");


//Funciones
const crearTarjeta = estudiante => {
    const [estado, clase] = estudiante.nota > 60 ? ["Aprobado", "aprobado"] : ["Reprobado", "reprobado"];
    const tarjeta = `
        <div class="tarjeta ${clase}">
            <h2>${estudiante.nombre}</h2>
            <p>${estudiante.nota}</p>
            <p>${estado}</p>
            <input type="button" value="Eliminar" id="eliminar[${estudiante.id}]" class="delete">
        </div>
    `;
    return tarjeta;
}

const renderizarLista = estudiantes => {
    const listaTarjetas = estudiantes.map(estudiante => {
        const tarjeta = crearTarjeta(estudiante);
        return tarjeta;
    });
    seccionEstudiantes.innerHTML = listaTarjetas.join("");
}

const toFixedTrunc = (num, decimales) => {
    const factor = Math.pow(10, decimales);
    const truncado = Math.trunc(num * factor) / factor;
    return truncado.toFixed(decimales);
}

const calcularPromedio = estudiantes => {
    const listaNotas = estudiantes.map(estudiante => {
        const nota = estudiante.nota;
        return nota;
    });
    const notasAcumuladas = listaNotas.reduce((persistent, num) => 
        persistent + num, 0
    );
    const notasFixed = toFixedTrunc(notasAcumuladas / estudiantes.length, 2)
    return notasFixed;
};

const renderizarPromedio = promedio => {
    const block = `
        <p>
            Promedio general: ${promedio}
        </p>
    `;
    seccionPromedio.innerHTML = block;
};

//Eventos

btnTodos.addEventListener("click", () => 
    renderizarLista(listaEstudiantes)
);

btnAprobados.addEventListener("click", () => {
    renderizarLista(listaEstudiantes.filter(estudiante => 
        estudiante.nota > 60
    ));
});

btnReprobados.addEventListener("click", () => {
    renderizarLista(listaEstudiantes.filter(estudiante => 
        estudiante.nota < 61
    ));
});

btnPromedio.addEventListener("click", () => {
    seccionPromedio.style.display = "block";
    const promedioGeneral = calcularPromedio(listaEstudiantes);
    renderizarPromedio(promedioGeneral);
});


//Llamadas a funciones
renderizarLista(listaEstudiantes);

//Prueba
let listaBtnsEliminar = document.getElementsByClassName("delete");

btnAgregar.addEventListener("click", () => {
    if (inputNombre.value.length == 0 || inputNota.value.length == 0) {
        alert("No puedes dejar campos vacios");
        return;
    }
    const intInputNota = parseInt(inputNota.value);
    if (intInputNota > 100 || intInputNota < 0) {
        alert("La nota del estudiante debe ser menor a 100 y mayor o igual a 0");
        return;
    }
    const nuevoEstudiante = {
        id: listaEstudiantes.length + 1,
        nombre: inputNombre.value,
        nota: intInputNota
    };
    listaEstudiantes.push(nuevoEstudiante);
    listaBtnsEliminar = document.getElementsByClassName("delete")
    renderizarLista(listaEstudiantes);
    actualizarBtns(listaBtnsEliminar);
});

const actualizarBtns = lista => {
    for (let i = 0; i < listaBtnsEliminar.length; i++) {
        const btn = listaBtnsEliminar[i];
        btn.addEventListener("click", () => {
            const estudiantesRestantes = listaEstudiantes.filter(estudiante => {
                const btnId = parseInt(btn.getAttribute("id").match(/()\d+/g));
                return estudiante.id != btnId;
            });
            listaEstudiantes = estudiantesRestantes;
            renderizarLista(listaEstudiantes);
            actualizarBtns(listaBtnsEliminar);
        });
    };
};
actualizarBtns(listaBtnsEliminar);