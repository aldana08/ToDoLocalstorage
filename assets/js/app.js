//Variables
const listaTareas = document.getElementById('lista-tareas');/*lista-tareas*/



//Event Listeners

eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTarea);

    //Borrar tareas
    listaTareas.addEventListener('click', borrarTarea);

    //Contenido cargando
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones

//Añadir tarea del formulario
function agregarTarea(e){
    e.preventDefault();

    // Leer el valor del textarea
    const tarea = document.getElementById('tarea').value;

    //Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tarea'; 
    botonBorrar.innerText = ' ';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tarea;
    document.getElementById('tarea').value = " ";

    //Añade el boton de borrar al tarea
    li.appendChild(botonBorrar);

    //Añade la tarea a la lista
    listaTareas.appendChild(li);

    //Añadir a Local Storage
    agregarTareaLocalStorage(tarea);
}

//Elimina la tarea del DOM
function borrarTarea(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tarea'){
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos de LocalStorage en la lista
function localStorageListo(){
    let tarea;

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea) {
            //Crear boton de eliminar
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tarea';
            botonBorrar.innerText = ' ';

            //Crear elemento y añadirle el contenido a la lista
            const li = document.createElement('li');
            li.innerText = tarea;
            //Añade el boton de borrar al tarea
            li.appendChild(botonBorrar);
            //Añade el tarea a la lista
            listaTareas.appendChild(li);
    });
}

//Agrega tarea al Local Storage
function agregarTareaLocalStorage(tarea) {
    let tareas;
    tareas = obtenerTareasLocalStorage();
    //Añadir el nuevo tarea
    tareas.push(tarea);
    //Convertir de string a arreglo para Local Storage
    localStorage.setItem('tareas', JSON.stringify(tareas) );
}

//Comprobar que haya elementos en LocalStorage, retorna un arreglo
function obtenerTareasLocalStorage(){
    let tareas;
    //Revisamos los valores de Local Storage
    if(localStorage.getItem('tareas') === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem('tareas') );
    }
    return tareas;
}

//Eliminar tarea de Local Storage

function borrarTareaLocalStorage(tarea){
    let tareas, tareaBorrar;
    //Elimina la X del tarea
    tareaBorrar = tarea.substring(0, tarea.length - 1);

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea, index) {
        console.log('tarea=' + tarea);
        console.log('tareaborrar=' + tareaBorrar);
        if(tareaBorrar === tarea){
            tareas.splice(index, 1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas) );
}


