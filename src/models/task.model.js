const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true, // Para que este campo sea obligatorio
    unique: true, // Para que no permita duplicar tareas
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["COMPLETED", "IN PROGRESS", "PENDING", "POSTPONED", "DELETED"],
    required: true,
    default: "PENDING", // Estado predefinido es "Pending" 
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
