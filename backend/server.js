import express, { response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//load environment variable
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors({origin: "https://task-management-frontend-two-dun.vercel.app/"}));
app.use(express.json());

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager')
  .then(() => console.log('MongoDB connected'))
  .catch(err=>console.error('MongoDB connection error: ', err));

  //Task schema
const taskSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed:{
    type: Boolean,
    default: false
  }
}, {timestamps:true})

const Task = mongoose.model('Task',taskSchema);

//API routes
//GET task- retrieving all task
app.get('/api/tasks', async(req, res)=>{
  try{
    const tasks = await Task.find().sort({createdAt: -1});
    res.json(tasks);
  }catch(error){
    res.status(500).json({message: 'server error', error: error.message})
  }
})

//POST task- creating a new task
app.post('/api/tasks', async(req, res)=>{
  try {
    const {title, description} = req.body;
    if(!title){
      return res.status(400).json({message: 'Title is required'})
    }

    const newTask = new Task({
      title, 
      description,
      completed: false
    })
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message})
  }
})

//PUT task- updating a task
app.put('/api/tasks/:id', async(req, res)=>{
  try {
    const {id}=  req.params
    const {title, description,completed} = req.body;

    const updateTask = await Task.findByIdAndUpdate(
      id,
      {title, description, completed},
      {new: true, runValidators: true}
    );
    if(!updateTask){
      return res.status(404).json({message: 'Task not found'})
    }
    res.json(updateTask);
  } catch (error) {
    return res.status(500).json({message: 'Server Error', error:error.message})
  }
})

//DELETE a task
app.delete('/api/tasks/:id', async(req, res)=>{
  try {
    const {id}= req.params;
    const deleteTask = await Task.findByIdAndDelete(id);
    if(!deleteTask){
      return res.status(404).json({message: 'Task not found'})
    }
    res.json({message: 'Task deleted successfully'})
  } catch (error) {
      return res.status(500).json({message: 'Server Error', error: error.message})
  }
})

//start server
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
