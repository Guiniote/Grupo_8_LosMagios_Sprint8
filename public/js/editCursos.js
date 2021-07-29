

window.addEventListener("load", function() {
    let formulario = document.querySelector (".form");
    let camposErrores = document.querySelectorAll("small");   
    let errors = [];
    let nombre = document.querySelector("#name");
    let descripcion = document.querySelector("#description");
    const acceptedExtensions = /(jpg|jpeg|png|gif)$/;
    let imagen = document.querySelector("#image");

    nombre.addEventListener ("blur", function(e) {

    errors = [];

    if(nombre.value == '') {                
        errors.push({ name: 'name', msg: 'Recordá ingresar un nombre' });
    } else if (nombre.value.length < 2) {                
        errors.push({ name: 'name', msg: 'El nombre debe tener al menos 2 caracteres' });
    } 
  if(errors.length == 0) {                
        camposErrores[0].innerText = '';
    } else {
        for (let i = 0; i < errors.length; i++) {
            let lineaError = document.querySelector("small." + errors[i].name);                
            lineaError.innerText = errors[i].msg;            
        }            
    }  
});
descripcion.addEventListener ("blur", function(e) {

    errors = [];

    if(descripcion.value == '') {            
        errors.push({ name: 'description', msg: 'Recordá ingresar una descripción' });
    } else if (apellido.value.length < 2) {            
        errors.push({ name: 'description', msg: 'La descripción debe tener al menos 2 caracteres' });
    }

    if(errors.length == 0) {                
        camposErrores[1].innerText = '';
    } else {
        for (let i = 0; i < errors.length; i++) {
            let lineaError = document.querySelector("small." + errors[i].name);                
            lineaError.innerText = errors[i].msg;            
        }            
    } 
});
imagen.addEventListener ("blur", function(e) {

    errors = [];

    if(imagen.value == '') {
        errors.push({ name: 'image', msg: 'Recordá ingresar una imagen' });
    } else {
        let extension = imagen.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
    }

    if(errors.length == 0) {                
        camposErrores[2].innerText = '';
    } else {
        for (let i = 0; i < errors.length; i++) {
            let lineaError = document.querySelector("small." + errors[i].name);                
            lineaError.innerText = errors[i].msg;            
        }            
    } 
});













formulario.addEventListener ("submit", function(e) {
                    
    for (let i = 0; i < camposErrores.length; i++) {
        camposErrores[i].innerText = '';    
    }
    
    if(nombre.value == '') {
        errors.push({ name: 'name', msg: ' Recordá ingresar un nombre' });
    } else if (nombre.value.length < 2) {
        errors.push({ name: 'name', msg: 'El nombre debe tener al menos 2 caracteres' });
    }
    if(descripcion.value == '') {
        errors.push({ name: 'description', msg: 'Recordá ingresar un Descripción' });
    } else if (descripcion.value.length < 20) {
        errors.push({ name: 'description', msg: 'La descripción debe tener al menos 20 caracteres' });
    }

    if(imagen.value == '') {
        errors.push({ name: 'image', msg: 'Recordá ingresar una imagen' });
    } else {
        let extension = imagen.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
    }







if(errors.length > 0) {
            e.preventDefault();
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }
    });
})
