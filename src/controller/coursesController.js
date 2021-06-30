const { Course } = require('../database/models');
const { Op } = require("sequelize");


const coursesController = {

// Función que muestra el formulario de crear cursos
    create: (req, res) => {
        res.render('courses/createCourses');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const course = req.body;
        course.image = req.file ? req.file.filename : '';
        course.create(course)
        .then(result => { 
        res.redirect('/courses/courseList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let course = await Course.findByPk(req.params.id);
        if (course) {
            res.render('courses/courseDetail', { course });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Course.destroy({ where: {id: req.params.id}});        
        res.redirect('/courses/courseList');
    },

//Función para listar los cursos
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const courseNameKeyword = query.course_name ? query.course_name: '';
        let courses = await Course.findAll({
            where: { name: { [Op.substring]: courseNameKeyword }} 
        });
        return res.render('courses/courseList', { courses });
    } else {
        let courses = await Course.findAll();        
        return res.render('courses/courseList', { courses });
    }},
        
     
// Función para traer datos los cursos para editar
    edit: async (req, res) => {
        let course = await Course.findByPk(req.params.id);
        if (course) {
            res.render('courses/editCourses', { course });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los cursos
    update: (req, res) => {
        let course = req.body;
        course.id = req.params.id;
        course.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            course.image = req.body.old_image
        }
        delete course.oldImage;
        Course.update(course, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/courses/courseDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = coursesController;