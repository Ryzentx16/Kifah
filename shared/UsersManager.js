// UserManager.js
export default class UserManager {
  static users = [
    {
      id: 1,
      name: "John Doe",
      role: "teacher",
      email: "teacher@example.com",
      password: "1234",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "student",
      email: "student@example.com",
      password: "1234",
    },
    {
      id: 3,
      name: "Jane Wick",
      role: "admin",
      email: "admin@example.com",
      password: "1234",
    },
  ];

  static nextId = 4; // Initialize next ID

  static getUsers() {
    return this.users;
  }

  static addUser(name, role, email, password) {
    const newUser = {
      id: this.nextId++,
      name,
      role,
      email,
      password,
    };
    this.users.push(newUser);
  }

  static deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  static authenticateUser(email, password) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }
}
