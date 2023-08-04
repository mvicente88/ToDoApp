var express = require ('express') 
var router = express.Router()

taskController = require('../src/controllers/taskController')

router.get('/:taskId?', taskController.getTask)
router.post('/', taskController.addTask)
router.delete('/:taskId', taskController.deleteTask)
router.put('/:taskId', taskController.updateTask)


module.exports = router