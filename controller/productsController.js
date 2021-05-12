const jsonDB = require('../model/jsonDatabase');
const productsModel = jsonDB('products');

let productsController = {

// Función que muestra el formulario de crear Productos
    create: (req, res) => {
        res.render('createProducts');
    },

// Función que simula el almacenamiento, en este caso en array
    store: (req, res) => {
// Atrapo los contenido del formulario
        const product = req.body;
// Verificar si viene un archivo, para nombrarlo  
        product.image = req.file ? req.file.filename : '';
// Delego la responsabilidad al modelo para crear producto  
// Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
        productsModel.create(product);
        res.redirect('/products/productList');
    },
  
    show: (req, res) => {
        // Le delego al modelo la responsabilidad
        // que la busque por ID del registro seleccionado 
        // es por ello que atrapo em parámetro id  
        const product = productsModel.find(req.params.id);
        if (product) {
            res.render('products/productDetail', { product });
        } else {
            res.render('error404');
        }
    },

    destroy: (req, res) => {
        console.log('entre destroy')
        productsModel.delete(req.params.id);

    // Ahora se mostrará todo porque los productos los varga de un archivo       
        res.redirect('/products/productList');
    },

//Función para listar los productos
    list: (req, res) => {
        const products = productsModel.all();
        res.render('products/productList', { products });
    },
    edit: (req, res) => {
        // Delego al modelo que busque el producto     
             let product = productsModel.find(req.params.id);
     
             console.log('hola')
             if (product) {
                 res.render('products/editProducts', { product });
             } else {
                 res.render('error404');
             }
         },
         update: (req, res) => {
            console.log("Entré al update")
            // Armo la estructura del registro auxiliar (product)
      
            let  product = req.body;
          
     
            console.log(' soy la nueva: ' +req.body.image)
            console.log('soy la vieja '+ req.body.oldImage)
            product.id = req.params.id;
    
         
              product.image = req.file ? req.file.filename : req.body.oldImagen;
            
              if (req.body.image===undefined) {
                product.image = product.oldImage
            }
            
              console.log('.......MOSTRA LA IMAGEN.......')
            console.log(product.image)
            console.log(product)
           
           
          // Elimino de la estructura auxiliar, porque no existe en Json 
            delete product.oldImage;
    
    
            // Delego la responsabilidad al modelo que actualice
            productsModel.update(product);
              
    
            res.redirect('/products/productList');
        }
     


}

module.exports = productsController;