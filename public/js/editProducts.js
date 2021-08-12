window.addEventListener("load", function() {
    
    let formulario = document.querySelector (".form");
    let camposErrores = document.querySelectorAll("small");   
    let errors = [];
    const acceptedExtensions = /(jpg|jpeg|png|gif)$/;
    let productName = document.querySelector("#name");  
    let productCategory = document.querySelector("#category");
    let productBrand = document.querySelector("#brand");
    let productModel = document.querySelector("#model");
    let productDescription = document.querySelector("#description");
    let productSpecs = document.querySelector("#specs");
    let productKeywords = document.querySelector("#keywords");
    let productImage1 = document.querySelector("#image1");
    let productImage2 = document.querySelector("#image2");
    let productImage3 = document.querySelector("#image3");
    let productImage4 = document.querySelector("#image4");
    let productImage5 = document.querySelector("#image5");
    let productPrice = document.querySelector("#price");
    let productDiscount = document.querySelector("#discount");
    let productStock = document.querySelector("#stock");
    let productStockMin = document.querySelector("#stockMin");
    let productStockMax = document.querySelector("#stockMax");
    let numericValue = /^[0-9]+$/;


    productName.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productName.value == '') {                
            errors.push({ name: 'name', msg: 'Recordá ingresar un nombre' });
        } else if (productName.value.length < 2) {                
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

    productCategory.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productCategory.value == '') {                
            errors.push({ name: 'category', msg: 'Debes seleccionar una categoria' });
        };
        
        if(errors.length == 0) {                
            camposErrores[1].innerText = 0;
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productBrand.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productBrand.value == '') {                
            errors.push({ name: 'brand', msg: 'Debes seleccionar una marca' });
        };
        
        if(errors.length == 0) {                
            camposErrores[2].innerText = '';
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
            errors.push({ name: 'model', msg: 'Recordá ingresar un modelo' });
        };
        
        if(errors.length == 0) {                
            camposErrores[3].innerText = '';
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
            errors.push({ name: 'description', msg: 'Recordá ingresar una descripción' });
        } else if (productDescription.value.length < 20) {                
            errors.push({ name: 'description', msg: 'La descripción debe contar con al menos 20 caracteres'});
        } 
        
        if(errors.length == 0) {                
            camposErrores[4].innerText = '';
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
            errors.push({ name: 'specs', msg: 'Recordá ingresar, al menos, una especificación tecnica' });
        } else if (productSpecs.value.length < 1) {                
            errors.push({ name: 'specs', msg: 'La especificación no puede ser solo una letra' });
        } 
        
        if(errors.length == 0) {                
            camposErrores[5].innerText = '';
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
            errors.push({ name: 'keywords', msg: 'Debes ingresar una palabra clave' });
        } else if (productKeywords.value.length < 1) {                
            errors.push({ name: 'keywords', msg: 'La palabra clave no puede ser solo una letra' });
        } 
        
        if(errors.length == 0) {                
            camposErrores[6].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productImage1.addEventListener ("blur", function(e) {

        errors = [];

        if(productImage1.value == '') {
            errors.push({ name: 'image1', msg: 'Recordá ingresar una imagen' });
        } else {
            let extension = productImage1.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image1', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        }

        if(errors.length == 0) {                
            camposErrores[7].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        } 
    });

    productImage2.addEventListener ("blur", function(e) {

        errors = [];
        
        let extension = productImage2.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image2', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
        
        if(errors.length == 0) {                
            camposErrores[8].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        } 
    });

    productImage3.addEventListener ("blur", function(e) {

        errors = [];
        
        let extension = productImage3.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image3', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
        
        if(errors.length == 0) {                
            camposErrores[9].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        } 
    });

    productImage4.addEventListener ("blur", function(e) {

        errors = [];
        
        let extension = productImage4.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image4', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
        
        if(errors.length == 0) {                
            camposErrores[10].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        } 
    });

    productImage5.addEventListener ("blur", function(e) {

        errors = [];
        
        let extension = productImage5.value.split('.')[1]
        if(!extension.match(acceptedExtensions)) {
            errors.push({ name: 'image5', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
        }
        
        if(errors.length == 0) {                
            camposErrores[11].innerText = '';
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
            errors.push({ name: 'price', msg: 'Debes ingresar un valor' });
        } 
        else {
            if (!productPrice.value.match(numericValue)) {
                errors.push({ name: 'price', msg: 'El valor debe ser numérico' })   
            }
        };
        
        if(errors.length == 0) {                
            camposErrores[12].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productDiscount.addEventListener ("blur", function(e) {

        errors = [];
        let key = window.event ? e.which : e.keyCode
            
        if(productDiscount.value == '') {                
            errors.push({ name: 'discount', msg: 'Debes ingresar un descuento' })
        } else if (productDiscount.value < 1 || productDiscount.value > 99 ) {
            errors.push({ name: 'discount', msg: 'El descuento debe ser entre 0% y 99%' }) 
        }else {
            if (!productDiscount.value.match(numericValue)) {
                errors.push({ name: 'discount', msg: 'El valor debe ser numérico' })   
            }
        };;
        
        if(errors.length == 0) {                
            camposErrores[13].innerText = '';
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
            errors.push({ name: 'stock', msg: 'Debes ingresar el stock del producto' });
        } else if (productStock.value.length <= 0) {                
            errors.push({ name: 'stock', msg: 'El stock no puede ser menor o igual a 0' })
        } else {
            if (!productStock.value.match(numericValue)) {
                errors.push({ name: 'stock', msg: 'El valor debe ser numérico' })   
            }
        };
        
        if(errors.length == 0) {                
            camposErrores[14].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name)               
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productStockMin.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productStockMin.value == '') {                
            errors.push({ name: 'stockMin', msg: 'Debes indicar un stock mínimo' });
        } else if (productStockMin.value.length <= 0) {                
            errors.push({ name: 'stockMin', msg: 'El stock minímo no puede ser igual a 0' })
        } else if (productStockMin.value > productStock.value ) {
            errors.push({ name: 'stockMin', msg: 'El stock mínimo no puede ser mayor al stock base' })
        } else {
            if (!productStockMin.value.match(numericValue)) {
                errors.push({ name: 'stockMin', msg: 'El valor debe ser numérico' })   
            }
        };
        
        if(errors.length == 0) {                
            camposErrores[15].innerText = '';
        } else {
            for (let i = 0; i < errors.length; i++) {
                let lineaError = document.querySelector("small." + errors[i].name);                
                lineaError.innerText = errors[i].msg;            
            }            
        }  
    });

    productStockMax.addEventListener ("blur", function(e) {

        errors = [];
            
        if(productStockMax.value == '') {                
            errors.push({ name: 'stockMax', msg: 'Debes indicar un stock máximo' });
        } else if (productStockMax.value.length <= 0) {                
            errors.push({ name: 'stockMax', msg: 'El stock máximo no puede ser igual a 0' });
        } else if (productStockMax.value < productStockMin.value) {
            errors.push({ name: 'stockMax', msg: 'El stock máximo debe ser mayor al stock mínimo' });
        } else {
            if (!productStockMax.value.match(numericValue)) {
                errors.push({ name: 'stockMax', msg: 'El valor debe ser numérico' })   
            }
        };
        
        if(errors.length == 0) {                
            camposErrores[16].innerText = '';
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
            errors.push({ name: 'name', msg: 'Recordá ingresar un nombre' });
        } else if (productName.value.length < 2) {                
            errors.push({ name: 'name', msg: 'El nombre debe tener al menos 2 caracteres' });
        };
        
        if(productCategory.value == '') {                
            errors.push({ name: 'category', msg: 'Debes seleccionar una categoria' });
        };

        if(productBrand.value == '') {                
            errors.push({ name: 'brand', msg: 'Debes seleccionar una marca' });
        };

        if(productModel.value == '') {                
            errors.push({ name: 'model', msg: 'Recordá ingresar un modelo' });
        };

        if(productDescription.value == '') {                
            errors.push({ name: 'description', msg: 'Recordá ingresar una descripción' });
        } else if (productDescription.value.length < 20) {                
            errors.push({ name: 'description', msg: 'La descripción debe contar con al menos 20 caracteres'});
        };

        if(productSpecs.value == '') {                
            errors.push({ name: 'specs', msg: 'Recordá ingresar, al menos, una especificación tecnica' });
        } else if (productSpecs.value.length < 1) {                
            errors.push({ name: 'specs', msg: 'La especificación no puede ser solo una letra' });
        };

        if(productKeywords.value == '') {                
            errors.push({ name: 'keywords', msg: 'Debes ingresar una palabra clave' });
        } else if (productKeywords.value.length < 1) {                
            errors.push({ name: 'keywords', msg: 'La palabra clave no puede ser solo una letra' });
        };

        if(productImage1.value == '') {
            let extension = productImage1.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image1', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        };

        if(productImage2.value != '') {
            let extension = productImage2.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image2', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        };

        if(productImage3.value != '') {
            let extension = productImage3.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image3', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        };

        if(productImage4.value != '') {
            let extension = productImage4.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image4', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        };

        if(productImage5.value != '') {
            let extension = productImage5.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'image5', msg: 'Las extensiones de archivo permitidas son .JPG, .JPEG, .PNG o .GIF' });                
            }
        };

        if(productPrice.value == '') {                
            errors.push({ name: 'price', msg: 'Debes ingresar un valor' });
        } 
        else {
            if (!productPrice.value.match(numericValue)) {
                errors.push({ name: 'price', msg: 'El valor debe ser numérico' })   
            }
        };

        if(productDiscount.value == '') {                
            errors.push({ name: 'discount', msg: 'Debes ingresar un descuento' })
        } else if (productDiscount.value < 1 || productDiscount.value > 99 ) {
            errors.push({ name: 'discount', msg: 'El descuento debe ser entre 0% y 99%' }) 
        }else {
            if (!productDiscount.value.match(numericValue)) {
                errors.push({ name: 'discount', msg: 'El valor debe ser numérico' })   
            }
        };

        if(productStock.value == '') {                
            errors.push({ name: 'stock', msg: 'Debes ingresar el stock del producto' });
        } else if (productStock.value.length <= 0) {                
            errors.push({ name: 'stock', msg: 'El stock no puede ser menor o igual a 0' })
        } else {
            if (!productStock.value.match(numericValue)) {
                errors.push({ name: 'stock', msg: 'El valor debe ser numérico' })   
            }
        };

        if(productStockMin.value == '') {                
            errors.push({ name: 'stockMin', msg: 'Debes indicar un stock mínimo' });
        } else if (productStockMin.value.length <= 0) {                
            errors.push({ name: 'stockMin', msg: 'El stock minímo no puede ser igual a 0' })
        } else if (productStockMin.value > productStock.value ) {
            errors.push({ name: 'stockMin', msg: 'El stock mínimo no puede ser mayor al stock base' })
        } else {
            if (!productStockMin.value.match(numericValue)) {
                errors.push({ name: 'stockMin', msg: 'El valor debe ser numérico' })   
            }
        };
        
        if(productStockMax.value == '') {                
            errors.push({ name: 'stockMax', msg: 'Debes indicar un stock máximo' });
        } else if (productStockMax.value.length <= 0) {                
            errors.push({ name: 'stockMax', msg: 'El stock máximo no puede ser igual a 0' });
        } else if (productStockMax.value < productStockMin.value) {
            errors.push({ name: 'stockMax', msg: 'El stock máximo debe ser mayor al stock mínimo' });
        } else {
            if (!productStockMax.value.match(numericValue)) {
                errors.push({ name: 'stockMax', msg: 'El valor debe ser numérico' })   
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




});