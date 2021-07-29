
window.addEventListener("load", function() {
    let formulario = document.querySelector (".form");
    let camposErrores = document.querySelectorAll("small");   
    let errors = [];
    let nombre = document.querySelector("#name");


    nombre.addEventListener ("blur", function(e) {

        errors = [];
    
        if(nombre.value == '') {                
            errors.push({ name: 'name', msg: 'gustavo Recordá ingresar un nombre' });
        } else if (nombre.value.length < 2) {                
            errors.push({ name: 'name', msg: 'gustavo El nombre debe tener al menos 2 caracteres' });
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

    formulario.addEventListener ("submit", function(e) {
                    
        for (let i = 0; i < camposErrores.length; i++) {
            camposErrores[i].innerText = '';    
        }
        
        if(nombre.value == '') {
            errors.push({ name: 'name', msg: ' andres Recordá ingresar un nombre' });
        } else if (nombre.value.length < 2) {
            errors.push({ name: 'name', msg: 'andres El nombre debe tener al menos 2 caracteres' });
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