import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function TaskBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const task = tasks.find(t => t.id === id);
      await api.put(`/tasks/${id}`, { ...task, status: newStatus });
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'TODO': return 'status-todo';
      case 'IN_PROGRESS': return 'status-in-progress';
      case 'DONE': return 'status-done';
      default: return '';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'TODO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'DONE': return 'Done';
      default: return status;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-board">

      {/* ✅ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ FILTER BUTTONS */}
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("TODO")}>Todo</button>
        <button onClick={() => setFilter("IN_PROGRESS")}>In Progress</button>
        <button onClick={() => setFilter("DONE")}>Done</button>
      </div>

      <div className="task-board-header">
        <h1>Task Board</h1>
        <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">No matching tasks</div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <Link to={`/tasks/${task.id}`} className="task-title">
                  {task.title}
                </Link>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                  {formatStatus(task.status)}
                </span>
              </div>

              <p className="task-description">{task.description}</p>

              <div className="task-card-footer">
                <span className="task-meta">Created by {task.createdBy}</span>

                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskBoard;// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';
// import api from '../services/api';

// function TaskBoard() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadTasks = async () => {
//     try {
//       const res = await api.get('/tasks');
//       setTasks(res.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const task = tasks.find(t => t.id === id);
//       await api.put(`/tasks/${id}`, { ...task, status: newStatus });
//       loadTasks();
//     } catch (err) {
//       setError('Failed to update task');
//     }
//   };

//   const deleteTask = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;
//     try {
//       await api.delete(`/tasks/${id}`);
//       loadTasks();
//     } catch (err) {
//       setError('Failed to delete task');
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'TODO': return 'status-todo';
//       case 'IN_PROGRESS': return 'status-in-progress';
//       case 'DONE': return 'status-done';
//       default: return '';
//     }
//   };

//   const formatStatus = (status) => {
//     switch (status) {
//       case 'TODO': return 'To Do';
//       case 'IN_PROGRESS': return 'In Progress';
//       case 'DONE': return 'Done';
//       default: return status;
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//   const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
//   const matchesFilter = filter === "All" || task.status === filter;
//   return matchesSearch && matchesFilter;
//   });

//   if (loading) return <div className="loading">Loading tasks...</div>;

//      <input
//   type="text"
//   placeholder="Search tasks..."
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)
//     .toLowerCase().includes(...);
//     }
// />

//   return (
//       <div className="task-board">
//       <div className="task-board-header">
//         <h1>Task Board</h1>
//         <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       <div className="task-list">
//        {tasks.length === 0 ? (
//   <div className="empty-state">
//     No tasks yet. Create one to get started!
//   </div>
// ) : (
//   filteredTasks.map((task) => (
//     <div key={task.id} className="task-card">
//       <div className="task-card-header">
//         {task.title}
//       </div>
//       <div>{task.status}</div>
//     </div>
//   ))
// )} 
//         {/* // {tasks.length === 0 ? ( */}
//         {/* //   <div className="empty-state">No tasks yet. Create one to get started!</div>
//         // ) : (
//         //   filteredTasks.map(task => (
//         //     <div key={task.id} className="task-card">
//         //       <div className="task-card-header">
//         //         {task.title}
//         //         </div>
//         //         </div>))
//         // )} */}
//                 <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
//                 <span className={`status-badge ${getStatusClass(task.status)}`}>
//                   {formatStatus(task.status)}
//                 </span>
//               </div>
//               <p className="task-description">{task.description}</p>
//               <div className="task-card-footer">
//                 <span className="task-meta">Created by {task.createdBy}</span>
//                 <div className="task-actions">
//                   <select
//                     value={task.status}
//                     onChange={(e) => updateStatus(task.id, e.target.value)}
//                     className="status-select"
//                   >
//                     <option value="TODO">To Do</option>
//                     <option value="IN_PROGRESS">In Progress</option>
//                     <option value="DONE">Done</option>
//                   </select>
//                   <button
//                     onClick={() => deleteTask(task.id)}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default TaskBoard;
