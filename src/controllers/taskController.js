const Task = require('../models/task.model');

// Buscar tarea, también con filtros datemin datemax

const getTask = (req, res) => {
  console.log("GET request received at /tasks");
  if (req.params.taskId) {
    console.log("Fetching task by ID:", req.params.taskId);
    Task.findById(req.params.taskId)
      .then(taskDoc => {
        if (!taskDoc) {
          return res.status(404).send({ msg: 'Task not found' });
        }
        res.status(200).send(taskDoc);
      })
      .catch(error => {
        console.log("Error fetching task:", error);
        switch (error.name) {
          case 'CastError':
            res.status(400).send({ msg: 'Wrong ID format' });
            break;
          default:
            res.status(400).send(error);
        }
      });
  } else {
    let filter = {};
    if (req.query.status) {
      if (!['COMPLETED', 'IN PROGRESS', 'PENDING', 'POSTPONED', 'DELETED'].includes(req.query.status)) {
        return res.status(400).send({ msg: 'Invalid status value' });
      }
      filter.status = req.query.status;
    }
    if (req.query.dateMax) {
      filter.dueDate = { $lte: req.query.dateMax };
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    Task.find(filter)
      .then(taskDocs => res.status(200).send(taskDocs))
      .catch(error => res.status(400).send(error));
  }
};


// Crear tarea

const addTask = (req, res) => {
  console.log('Request Body:', req.body);
  Task.create({
    title: req.body.title, 
    dueDate: req.body.dueDate,
  })
    .then(taskDoc => res.status(200).send(taskDoc)) // Para evitar tarea duplicada
    .catch(error => {
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'Task already exist' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};

// Eliminar tarea

const deleteTask = (req, res) => {
  console.log('Request Body:', req.body);
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      status: { $ne: 'DELETED' },
    },
    {
      status: 'DELETED',
      deleteAt: new Date(),
    },
    {
      timestamps: false,
    }
  )
    .then(taskDoc => {
      if (taskDoc === null) {
        res.status(404).send({ msg: 'Task not found' });
      } else {
        res.status(200).send({ msg: 'Deleted task' });
      }
    })
    .catch(error => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ msg: 'Wrong ID format' });
          break;
        default:
          res.status(400).send(error);
    }
  });
};

// Modificar tareas

const updateTask = (req, res) => {
  console.log('Request Body:', req.body);
  const { title, dueDate } = req.body;
  Task.findByIdAndUpdate(
    req.params.taskId,
    { title, dueDate }, 
    { new: true } // Devuelve el documento actualizado en la respuesta
  )
    .then(taskDoc => {
      if (!taskDoc) {
        return res.status(404).send({ msg: 'Task not found' });
      }
      res.status(200).send(taskDoc);
    })
    .catch(error => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ msg: 'Wrong ID format' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};


module.exports = {
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
