// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} years old`;
//   }
// }
//
// var me = new Person('Shovan', 23);
// console.log(me.getUserDescription());
//
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.users.find((user) => user.id === id);
    if (user) {
      var users = this.users.filter((user) => user.id !== id);
      this.users = users;
    }
    return user;
  }
  getUser (id) {
    var user = this.users.find((user) => user.id === id);
    return user;
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}


module.exports = {Users};
