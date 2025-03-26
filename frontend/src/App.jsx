import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskManagement from './components/TaskManagement';
// import "tailwindcss"
// import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-400 to-cyan-400">
      <header className="bg-white bg-opacity-20 backdrop-blur-md text-white

 shadow-sm py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Task Management App</h1>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <TaskManagement />
      </main>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;