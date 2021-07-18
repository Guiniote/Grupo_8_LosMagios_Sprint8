window.addEventListener ("load", function(){

    let formulario = document.querySelector (".form");
    
    formulario.addEventListener ("submit", function(e){
    e.preventDefault();
    
    let campoNombre = document.getElementById ("name");
    
    if (campoNombre.value == ""){
    alert ("el campo de nombre tiene que estar completo");
    } else if (campoNombre.value.length < 5){
        alert ("El campo de nombre debe tener al menos 5 caracteres")
    }
    let campoDescripcion = document.getElementById ("description");
    
    if (campoDescripcion.value == ""){
    alert ("el campo de descripción tiene que estar completo");
    } else if (campoDescripcion.value.length < 20){
        alert ("El campo de descripción debe tener al menos 20 caracteres")
    }
    let fileInput = document.getElementById ("image");
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Por favor suba un archivo valido(JPG, JPEG, PNG, GIF)');
        fileInput.value = '';
        return false;
    }else{
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
    
    });
    
    
    
    
    })