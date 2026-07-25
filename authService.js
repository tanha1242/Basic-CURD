import { User } from './db.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------- Register ----------------
async function registerUser(name, email, password) {
  if (!name || name.trim() === '') {
    console.log('Name cannot be empty.');
    return null;
  }
  if (!emailRegex.test(email)) {
    console.log('Invalid email format.');
    return null;
  }
  if (!password || password.length < 4) {
    console.log('Password must be at least 4 characters.');
    return null;
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Email already exists.');
    return null;
  }

  const user = await User.create({ name, email, password });
  console.log('Registration successful!');
  return user;
}

// ---------------- Login ----------------
async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.log('Invalid email or password.');
    return null;
  }
  if (user.password !== password) {
    console.log('Wrong credential.');
    return null;
  }
  console.log('Login successful!');
  return user;
}

export { registerUser, loginUser };
