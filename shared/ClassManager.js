// ClassManager.js
export default class ClassManager {
  static classes = [
    {
      id: 1,
      title: "Algebra 101",
      time: (() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString();
      })(),
    },
    {
      id: 2,
      title: "Physics Basics",
      time: (() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString();
      })(),
    },
    {
      id: 3,
      title: "World History",
      time: (() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString();
      })(),
    },
  ];

  static nextId = 4; // Initialize next ID

  static addClass(title, time) {
    const newClass = {
      id: this.nextId++, // Use nextId and increment
      title,
      time,
    };
    this.classes.push(newClass);
  }

  static deleteClass(id) {
    this.classes = this.classes.filter((cls) => cls.id !== id);
  }

  static getClasses() {
    return this.classes;
  }
}
