//Load server
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

//Load environment variables
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());


//Connect to database
const mongoose = require("mongoose");

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const mongoDB =
	'mongodb+srv://' +
	process.env.DB_USER +
	':' +
	process.env.DB_PASSWORD +
	'@' +
	process.env.DB_SERVER +
	'/' +
	process.env.DB_NAME +
	'?retryWrites=true&w=majority';

    console.log("MongoDB URI:", mongoDB);
async function main() {
	await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

//Load routes
const tasks = require('./routes/tasks')
app.use('/tasks', tasks)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})