//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campo

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//Expresion regular para validar email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListener();

function eventListener(e) {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Resetear el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    btnEnviar.addEventListener('submit', enviarFormulario);
}


//Funciones 

function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario (e) {

    //Validador de los campos completos.
    if (e.target.value.length > 0) {

        const eliminarError = document.querySelector('p.error');

        if (eliminarError) {
            eliminarError.remove()
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    } else {

        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorio');
    }

    //Validador de Email
    if (e.target.type === 'email') {
        
        if (er.test(e.target.value)) {

            const eliminarError = document.querySelector('p.error');
            if (eliminarError) {
                eliminarError.remove()
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }
    //Validador de todos los campos para hablitar el boton de enviar.
    if (er.test(email.value) != '' && asunto.value != '' && mensaje.value != '') {
        btnEnviar.disable = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }   
}
//Mensaje si esta algun campo vacio, o el email no es valido.
function mostrarError(mesaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mesaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-500','text-white','text-center', 'mt-5', 'font-bold','p-3',
    'uppercase','error');


    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

    
}

function enviarFormulario(e) {
    e.preventDefault();

    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Ocultar spinner despues de 3 segundos
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje que se envio correctamente el email
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //inserte el msj antes del spinner
        formulario.insertBefore(parrafo, spinner);

        //Eliminar el msj de exito
        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 5000);

    }, 3000);
}

//Funcion para resetear el formulario

function resetearFormulario () {

    formulario.reset();
    iniciarApp();
}