window.addEventListener("load", function() {
    
    let formulario = document.querySelector (".form");
    let camposErrores = document.querySelectorAll("small");   
    let errors = [];
    const acceptedExtensions = /(jpg|jpeg|png|gif)$/;
    let productName = document.querySelector("#name");
    let productModel = document.querySelector("#brand");
    let productDescription = document.querySelector("#description");
    let productKeywords = document.querySelector("#keywords");
    let productPrice = document.querySelector("#price");
    let productDiscount = document.querySelector("#discount");
    let productStock = document.querySelector("#stock");
    let productStockmin = document.querySelector("#stockMin");
    let productStockmax = document.querySelector("#stockMax");


    productName.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productName.value == '') {                
            errors.push({ name: 'productName', msg: 'Recordá ingresar un nombre' });
        } else if (productName.value.length < 2) {                
            errors.push({ name: 'productName', msg: 'El nombre debe tener al menos 2 caracteres' });
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

    productModel.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productModel.value == '') {                
            errors.push({ name: 'productModel', msg: 'Recordá ingresar un modelo' });
        };
        
        if(errors.length == 0) {                
            camposErrores[0].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        };  
    });

    productDescription.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productDescription.value == '') {                
            errors.push({ name: 'productDescription', msg: 'Recordá ingresar una descripción' });
        } else if (productDescription.value.length < 20) {                
            errors.push({ name: 'productDescription', msg: 'La descripción debe contar con al menos 20 caracteres'});
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

    productSpecs.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productSpecs.value == '') {                
            errors.push({ name: 'productSpecs', msg: 'Recordá ingresar, al menos, una especificación tecnica' });
        } else if (productSpecs.value.length < 1) {                
            errors.push({ name: 'productSpecs', msg: 'La especificación no puede ser solo una letra' });
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

    productKeywords.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productKeywords.value == '') {                
            errors.push({ name: 'productKeywords', msg: 'Debes ingresar una palabra clave' });
        } else if (productKeywords.value.length < 1) {                
            errors.push({ name: 'productKeywords', msg: 'La palabra clave no puede ser solo una letra' });
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

    productPrice.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productPrice.value == '') {                
            errors.push({ name: 'productPrice', msg: 'Debes ingresar un valor' });
        };
        
        if(errors.length == 0) {                
            camposErrores[0].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productDiscount.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productDiscount.value == '') {                
            errors.push({ name: 'productDiscount', msg: 'Debes ingresar un descuento' });
        };
        
        if(errors.length == 0) {                
            camposErrores[0].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productStock.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productStock.value == '') {                
            errors.push({ name: 'productStock', msg: 'Debes ingresar el stock del producto' });
        } else if (productStock.value.length <= 0) {                
            errors.push({ name: 'productStock', msg: 'El stock no puede ser menor o igual a 0' });
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

    productStockmin.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productStockmin.value == '') {                
            errors.push({ name: 'productStockmin', msg: 'Debes indicar un stock mínimo' });
        } else if (productStockmin.value.length <= 0) {                
            errors.push({ name: 'productStockmin', msg: 'El stock minímo no puede ser igual a 0' });
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

    productStockmax.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productStockmax.value == '') {                
            errors.push({ name: 'productStockmax', msg: 'Debes indicar un stock máximo' });
        } else if (productStockmax.value.length <= 0) {                
            errors.push({ name: 'productStockmax', msg: 'El stock máximo no puede ser igual a 0' });
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
        };
        
        if(productName.value == '') {                
            errors.push({ name: 'productName', msg: 'Recordá ingresar un nombre' });
        } else if (productName.value.length < 2) {                
            errors.push({ name: 'productName', msg: 'El nombre debe tener al menos 2 caracteres' });
        };
        
        if(productModel.value == '') {                
            errors.push({ name: 'productModel', msg: 'Recordá ingresar un modelo' });
        };

        if(productDescription.value == '') {                
            errors.push({ name: 'productDescription', msg: 'Recordá ingresar una descripción' });
        } else if (productDescription.value.length < 20) {                
            errors.push({ name: 'productDescription', msg: 'La descripción debe contar con al menos 20 caracteres'});
        };

        if(productKeywords.value == '') {                
            errors.push({ name: 'productKeywords', msg: 'Debes ingresar una palabra clave' });
        } else if (productKeywords.value.length < 1) {                
            errors.push({ name: 'productKeywords', msg: 'La palabra clave no puede ser solo una letra' });
        };

        if(productPrice.value == '') {                
            errors.push({ name: 'productPrice', msg: 'Debes ingresar un valor' });
        };
        if(productDiscount.value == '') {                
            errors.push({ name: 'productDiscount', msg: 'Debes ingresar un descuento' });
        };
        if(productStock.value == '') {                
            errors.push({ name: 'productStock', msg: 'Debes ingresar el stock del producto' });
        } else if (productStock.value.length <= 0) {                
            errors.push({ name: 'productStock', msg: 'El stock no puede ser menor o igual a 0' });
        };
        if(productStockmin.value == '') {                
            errors.push({ name: 'productStockmin', msg: 'Debes indicar un stock mínimo' });
        } else if (productStockmin.value.length <= 0) {                
            errors.push({ name: 'productStockmin', msg: 'El stock minímo no puede ser igual a 0' });
        };
        if(productStockmax.value == '') {                
            errors.push({ name: 'productStockmax', msg: 'Debes indicar un stock máximo' });
        } else if (productStockmax.value.length <= 0) {                
            errors.push({ name: 'productStockmax', msg: 'El stock máximo no puede ser igual a 0' });
        };

        if(errors.length > 0) {
            e.preventDefault();
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }
    });




});