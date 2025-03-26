import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';

function TaskList({ 
  tasks = [], 
  isLoading,
  onToggleComplete, 
  onDeleteTask,
  onUpdateTask
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const cancelEditing = () => setEditingId(null);

  const saveTask = (id) => {
    if (editTitle.trim()) {
      onUpdateTask(id, {
        title: editTitle,
        description: editDescription
      });
      setEditingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-lg
      shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg
    rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        My Tasks ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      ) : (
        <div className="space-y-3">

          {Array.isArray(tasks)?(
            tasks.map((task)=>(
              <div 
              key={task._id} 
              className={`border rounded-lg p-4 transition-colors ${
                task.completed ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {editingId === task._id ? (
                // Edit mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Task description (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={cancelEditing}
                    >
                      <FaTimes className="mr-1.5 h-4 w-4" /> Cancel
                    </button>
                    <button 
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        !editTitle.trim() ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      onClick={() => saveTask(task._id)}
                      disabled={!editTitle.trim()}
                    >
                      <FaSave className="mr-1.5 h-4 w-4" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        id={`task-${task._id}`}
                        checked={task.completed}
                        onChange={(e) => onToggleComplete(task._id, e.target.checked)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor={`task-${task._id}`}
                        className={`block text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}
                      >
                        {task.title}
                      </label>
                      {task.description && (
                        <p className={`mt-1 text-sm ${
                          task.completed ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => startEditing(task)}
                    >
                      <FaEdit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button 
                      className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => onDeleteTask(task._id)}
                    >
                      <FaTrash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            ))
          ):(
            <p className="text-gray-500">No tasks found.</p>
          )}
          {/* {tasks.map((task) => (
            <div 
              key={task._id} 
              className={`border rounded-lg p-4 transition-colors ${
                task.completed ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {editingId === task._id ? (
                // Edit mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Task description (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={cancelEditing}
                    >
                      <FaTimes className="mr-1.5 h-4 w-4" /> Cancel
                    </button>
                    <button 
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        !editTitle.trim() ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      onClick={() => saveTask(task._id)}
                      disabled={!editTitle.trim()}
                    >
                      <FaSave className="mr-1.5 h-4 w-4" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        id={`task-${task._id}`}
                        checked={task.completed}
                        onChange={(e) => onToggleComplete(task._id, e.target.checked)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor={`task-${task._id}`}
                        className={`block text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}
                      >
                        {task.title}
                      </label>
                      {task.description && (
                        <p className={`mt-1 text-sm ${
                          task.completed ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => startEditing(task)}
                    >
                      <FaEdit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button 
                      className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => onDeleteTask(task._id)}
                    >
                      <FaTrash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default TaskList;
