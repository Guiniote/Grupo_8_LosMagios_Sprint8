window.addEventListener("load", function() {
    
    let formulario = document.querySelector (".form");
    formulario.addEventListener ("submit", function(e) {
        
        let camposErrores = document.querySelectorAll("small");                
        for (let i = 0; i < camposErrores.length; i++) {
            camposErrores[i].innerText = '';    
        }
        
        let errors = [];
        const acceptedExtensions = /(jpg|jpeg|png|gif)$/;
        const passwordChars = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        let nombre = document.querySelector("#nombre");
        let apellido = document.querySelector("#apellido");
        let usuario = document.querySelector("#userName");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let confirmPassword = document.querySelector("#confirmPassword");
        let avatar = document.querySelector("#avatar");
        
        if(nombre.value == '') {
            errors.push({ name: 'firstName', msg: 'Recordá ingresar un nombre' });
        } else if (nombre.value.length < 2) {
            errors.push({ name: 'firstName', msg: 'El nombre debe tener al menos 2 caracteres' });
        }
        
        if(apellido.value == '') {
            errors.push({ name: 'surname', msg: 'Recordá ingresar un apellido' });
        } else if (apellido.value.length < 2) {
            errors.push({ name: 'surname', msg: 'El apellido debe tener al menos 2 caracteres' });
        }

        if(usuario.value == '') {
            errors.push({ name: 'userName', msg: 'Recordá ingresar un nombre de usuario' });
        } else if (usuario.value.length < 2) {
            errors.push({ name: 'userName', msg: 'El nombre de usuario debe tener al menos 2 caracteres' });
        }

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
        } else if (password.value.length < 8) {
            errors.push({ name: 'password', msg: 'La contraseña debe tener al menos 8 caracteres' });
        } else if (!password.value.match(passwordChars)) {
            errors.push({ name: 'password', msg: 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial' });
        }               
	
        if(confirmPassword.value == '') {
            errors.push({ name: 'confirmPassword', msg: 'Recordá ingresar una contraseña' });
        } else if (confirmPassword.value.length < 8) {
            errors.push({ name: 'confirmPassword', msg: 'La contraseña debe tener al menos 8 caracteres' });
        } else if (!confirmPassword.value.match(passwordChars)) {
            errors.push({ name: 'confirmPassword', msg: 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial' });
        } else if (confirmPassword.value != password.value) {            
            errors.push({ name: 'confirmPassword', msg: 'Las contraseñas no coinciden' });
        }

        if(avatar.value == '') {
            errors.push({ name: 'avatar', msg: 'Recordá ingresar una imagen' });
        } else {
            let extension = avatar.value.split('.')[1]
            if(!extension.match(acceptedExtensions)) {
                errors.push({ name: 'avatar', msg: `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}` });                
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