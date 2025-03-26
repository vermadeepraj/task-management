import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
// import "tailwindcss"

const API_URL = 'https://task-management-backend-2.vercel.app/';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTasks([response.data, ...tasks]);
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please try again.');
    }
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id, completed) => {
    updateTask(id, { completed });
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="space-y-8">
      <TaskForm onAddTask={addTask} />
      
      <TaskList 
        tasks={tasks} 
        isLoading={isLoading} 
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
}

export default TaskManagement;
