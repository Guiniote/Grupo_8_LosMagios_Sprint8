window.addEventListener("load", function() {
    
    let formulario = document.querySelector (".form");
    formulario.addEventListener ("submit", function(e) {
        
        let camposErrores = document.querySelectorAll("small");        
        for (let i = 0; i < camposErrores.length; i++) {
            camposErrores[i].innerText = '';    
        }

        let errors = [];
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        
                
        if(email.value == '') {
            errors.push({ name: 'email', msg: 'Recordá ingresar un email' });            
        } else if (email.value.indexOf('@') < 0) {
            errors.push({ name: 'email', msg: 'El formato del email no es válido' });
        } else {
            let emailArray = email.value.split('@');    
            if (emailArray[0].length == 0) {
                errors.push({ name: 'email', msg: 'El formato del email no es válido' });
            } else if (emailArray[1].length == 0) {
                errors.push({ name: 'email', msg: 'El formato del email no es válido' });
            } else if (emailArray[1].indexOf('.') < 0) {
                errors.push({ name: 'email', msg: 'El formato del email no es válido' });
            } else if (emailArray[1].indexOf('.') == 0) {
                errors.push({ name: 'email', msg: 'El formato del email no es válido' });
            } else {
                let dominio = emailArray[1].split('.');
                if (dominio[1].length < 2) {
                    errors.push({ name: 'email', msg: 'El formato del email no es válido' });
                } else if (dominio[2] && dominio[2].length < 2) {
                    errors.push({ name: 'email', msg: 'El formato del email no es válido' });
                }
            }
        }
    	
        // *****Para hacer si queda tiempo:*****
		// .custom(email => {
		// 	return usersController.findUserByEmail(email)
		// 		.then(user => {
		// 			if (user) {
		// 				return Promise.reject('Este email ya está en uso');
		// 			}
		// 		});
		// }),

        if(password.value == '') {
            errors.push({ name: 'password', msg: 'Recordá ingresar una contraseña' });
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