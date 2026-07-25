import { Task } from './db.js';
import { Op } from 'sequelize';

const validPriorities = ['Low', 'Medium', 'High'];
const validStatuses = ['Pending', 'Completed'];

// ---------------- Add Task ----------------
async function addTask(userId, title, description, dueDate, priority) {
  if (!title || title.trim() === '') {
    console.log('Task title cannot be empty.');
    return null;
  }
  if (!validPriorities.includes(priority)) {
    console.log('Priority must be Low, Medium, or High.');
    return null;
  }

  const task = await Task.create({
    userId,
    title,
    description,
    dueDate,
    priority,
    status: 'Pending',
  });

  console.log('Task added successfully!');
  console.log(JSON.stringify(task, null, 2));
  return task;
}

// ---------------- View All Tasks ----------------
async function viewTasks(userId) {
  const tasks = await Task.findAll({ where: { userId } });
  if (tasks.length === 0) {
    console.log('No tasks found.');
    return [];
  }

  console.log('Your Tasks:');
  tasks.forEach((t) => {
    console.log('');
    console.log(`ID: ${t.id}`);
    console.log(`Title: ${t.title}`);
    console.log(`Due Date: ${t.dueDate}`);
    console.log(`Priority: ${t.priority}`);
    console.log(`Status: ${t.status}`);
  });
  return tasks;
}

// ---------------- Edit Task ----------------
async function editTask(userId, id, updates) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    console.log('Task not found.');
    return null;
  }

  if (updates.priority && !validPriorities.includes(updates.priority)) {
    console.log('Invalid priority.');
    return null;
  }
  if (updates.status && !validStatuses.includes(updates.status)) {
    console.log('Status must be Pending or Completed');
    return null;
  }
  if (updates.dueDate && isNaN(Date.parse(updates.dueDate))) {
    console.log('Invalid date format.');
    return null;
  }

  await Task.update(updates, { where: { id, userId } });
  const updated = await Task.findByPk(id);
  console.log('Task updated successfully!');
  return updated;
}

// ---------------- Delete Task ----------------
async function deleteTask(userId, id) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    console.log('Task not found.');
    return false;
  }
  await task.destroy();
  console.log('Task deleted successfully!');
  return true;
}

// ---------------- Search Tasks ----------------
async function searchTasks(userId, keyword) {
  const tasks = await Task.findAll({
    where: {
      userId,
      [Op.or]: [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
      ],
    },
  });

  if (tasks.length === 0) {
    console.log('No matching tasks found.');
    return [];
  }

  console.log('Search Result:');
  tasks.forEach((t) => {
    console.log('');
    console.log(`ID: ${t.id}`);
    console.log(`Title: ${t.title}`);
    console.log(`Due Date: ${t.dueDate}`);
    console.log(`Priority: ${t.priority}`);
    console.log(`Status: ${t.status}`);
  });
  return tasks;
}

export { addTask, viewTasks, editTask, deleteTask, searchTasks };
