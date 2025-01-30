const express = require('express');
const router = express.Router();
const Model = require('../models/model'); // Asegúrate de que este modelo esté bien definido

// Método POST para agregar datos
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save(); // Guardar el dato en la base de datos
        res.status(200).json(dataToSave); // Enviar respuesta con el dato guardado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejar errores
    }
});

// Método GET para obtener todos los datos
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find(); // Obtener todos los datos
        res.json(data); // Enviar los datos al cliente
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
});

// Método GET para obtener datos por ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id); // Buscar por ID
        if (!data) {
            return res.status(404).json({ message: 'Dato no encontrado' }); // Si no se encuentra el dato
        }
        res.json(data); // Enviar el dato encontrado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
});

// Método PATCH para actualizar datos por ID
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Obtener los nuevos datos del cuerpo de la solicitud
        const options = { new: true }; // Para que devuelva el dato actualizado

        const result = await Model.findByIdAndUpdate(id, updatedData, options); // Actualizar el dato
        if (!result) {
            return res.status(404).json({ message: 'Dato no encontrado para actualizar' }); // Si no se encuentra el dato
        }
        res.json(result); // Enviar el dato actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejar errores
    }
});

// Método DELETE para eliminar datos por ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id); // Eliminar el dato por ID
        if (!data) {
            return res.status(404).json({ message: 'Dato no encontrado para eliminar' }); // Si no se encuentra el dato
        }
        res.send(`Documento con el nombre ${data.name} ha sido eliminado.`); // Enviar mensaje de eliminación
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejar errores
    }
});

module.exports = router; // Exportar las rutas
