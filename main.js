import readlineSync from 'readline-sync';
import { initDB, closeDB } from './db.js';
import { registerUser, loginUser } from './authService.js';
import {
  addTask,
  viewTasks,
  editTask,
  deleteTask,
  searchTasks,
} from './taskService.js';

let currentUser = null;

// ---------------- Main Menu ----------------
async function mainMenu() {
  while (true) {
    console.log('\nWelcome to Todo App\n');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    const choice = readlineSync.question('Enter your choice: ');

    if (choice === '1') {
      await handleRegister();
    } else if (choice === '2') {
      const success = await handleLogin();
      if (success) await todoMenu();
    } else if (choice === '3') {
      console.log('Goodbye!');
      break;
    } else {
      console.log('Invalid choice, try again.');
    }
  }
}

// ---------------- Register Flow ----------------
async function handleRegister() {
  const name = readlineSync.question('Enter your name: ');
  const email = readlineSync.question('Enter your email: ');
  const password = readlineSync.question('Enter your password: ', {
    hideEchoBack: false,
  });
  await registerUser(name, email, password);
}

// ---------------- Login Flow ----------------
async function handleLogin() {
  const email = readlineSync.question('Enter your email: ');
  const password = readlineSync.question('Enter your password: ');
  const user = await loginUser(email, password);
  if (user) {
    currentUser = user;
    return true;
  }
  return false;
}

// ---------------- Todo Menu (after login) ----------------
async function todoMenu() {
  while (true) {
    console.log('\nTodo Menu\n');
    console.log('1. Add Task');
    console.log('2. View All Tasks');
    console.log('3. Edit Task');
    console.log('4. Delete Task');
    console.log('5. Search Tasks');
    console.log('6. Logout');
    const choice = readlineSync.question('Enter your choice: ');

    if (choice === '1') {
      await handleAddTask();
    } else if (choice === '2') {
      await viewTasks(currentUser.id);
    } else if (choice === '3') {
      await handleEditTask();
    } else if (choice === '4') {
      await handleDeleteTask();
    } else if (choice === '5') {
      await handleSearchTasks();
    } else if (choice === '6') {
      console.log('Logged out.');
      currentUser = null;
      break;
    } else {
      console.log('Invalid choice, try again.');
    }
  }
}

// ---------------- Add Task Flow ----------------
async function handleAddTask() {
  const title = readlineSync.question('Enter task title: ');
  const description = readlineSync.question('Enter task description: ');
  const dueDate = readlineSync.question('Enter due date: ');
  const priority = readlineSync.question('Enter priority: ');
  await addTask(currentUser.id, title, description, dueDate, priority);
}

// ---------------- Edit Task Flow ----------------
async function handleEditTask() {
  const id = readlineSync.question('Enter task ID to edit: ');
  const title = readlineSync.question('Enter new title (leave blank to skip): ');
  const description = readlineSync.question('Enter new description (leave blank to skip): ');
  const dueDate = readlineSync.question('Enter new due date (leave blank to skip): ');
  const priority = readlineSync.question('Enter new priority (leave blank to skip): ');
  const status = readlineSync.question('Enter new status (leave blank to skip): ');

  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (dueDate) updates.dueDate = dueDate;
  if (priority) updates.priority = priority;
  if (status) updates.status = status;

  await editTask(currentUser.id, id, updates);
}

// ---------------- Delete Task Flow ----------------
async function handleDeleteTask() {
  const id = readlineSync.question('Enter task ID to delete: ');
  const confirm = readlineSync.question(
    'Are you sure you want to delete this task? yes/no: '
  );
  if (confirm.toLowerCase() !== 'yes') {
    console.log('Delete cancelled.');
    return;
  }
  await deleteTask(currentUser.id, id);
}

// ---------------- Search Task Flow ----------------
async function handleSearchTasks() {
  const keyword = readlineSync.question('Enter search keyword: ');
  await searchTasks(currentUser.id, keyword);
}

// ---------------- Start App ----------------
async function start() {
  await initDB();
  await mainMenu();
  await closeDB();
}

start();
