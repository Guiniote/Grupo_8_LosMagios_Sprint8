window.addEventListener ("load", function(){

    let formulario = document.querySelector (".form");
    
    formulario.addEventListener ("submit", function(e){

    
    let errores = [];

    let fileInput = document.getElementById ("image");
    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    
    let campoNombre = document.getElementById ("name");
    
    if (campoNombre.value == ""){
        errores.push("el campo de nombre tiene que estar completo");
    } else if (campoNombre.value.length < 5){
        errores.push("El campo de nombre debe tener al menos 5 caracteres")
    }
    let campoDescripcion = document.getElementById ("description");
    
    if (campoDescripcion.value == ""){
        errores.push("el campo de descripción tiene que estar completo");
    } else if (campoDescripcion.value.length < 20){
        errores.push("El campo de descripción debe tener al menos 20 caracteres")
    }
    if(errores.length >0) {
        e.preventDefault();

        let ulErrores = document.querySelector("div.errores ul")
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += '<li>'+ errores [i]+'</li>'
            console.log(ulErrores)
            
        }
    }


    if(!allowedExtensions.exec(filePath)){
        let errorImagen = document.querySelector("div.errorImagen")
        errorImagen.innerHTML += `<p>Por favor suba un archivo valido(JPG, JPEG, PNG, GIF)</p>`;
        fileInput.value = '';
        return false;
    }else{
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }

    }

    });
    
    
    
    
    })