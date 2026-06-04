/* <------------- Prueba ----------------->*/
// const btn = document.getElementById("btn");
// const div = document.getElementById("container");
// let i = 1;
// btn.addEventListener("click", () => {
//     let child = document.createElement("p");
//     child.textContent = `Hola ${i}`
//     div.appendChild(child);
//     i++;
// })

/* <------------- Variables simples ----------------->*/
// console.log("Hola mundo!");
// let nombre = "Axel";
// let apellido = "Villalobos";

// console.log(nombre);
// console.log(apellido);

// nombre = "Elias";
// apellido = "Cruz";

// console.log(apellido);

/* <------------- Objetos de JS ----------------->*/
const persona = {
    nombre: "Axel",
    apellidos: "Villalobos Garcia",
    edad: 18,
    apodos: [
        "Larry",
        "Villa de los lobos",
        "Villa"
    ],
    saludar: () => console.log(`Hola! Soy ${persona.nombre}`)
};

persona.saludar();

const listaNumeros = [1, 2, 3, 4, 5, 6];
console.log(listaNumeros);

let temp = listaNumeros[0];
listaNumeros[0] = listaNumeros[3];
listaNumeros[3] = temp;

console.log(listaNumeros);

const nuevaLista = listaNumeros;
nuevaLista.map(numero => {
    return { valor: numero}
});
console.log(nuevaLista);
