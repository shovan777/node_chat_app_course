const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node course'
      }, {
        id: '2',
        name: 'Sushil',
        room: 'Django course'
      }, {
        id: '3',
        name: 'Shovan',
        room: 'Node course'
      }
    ];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'govan',
      room: 'begarui guyz'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node course');
    expect(userList).toEqual(['Mike', 'Shovan']);
  });
  it('should return names for react course', () => {
    var userList = users.getUserList('Django course');
    expect(userList).toEqual(['Sushil']);
  });
  it('should remove a user', () => {
    var user = users.removeUser('1');
    // console.log(user);
    expect(users.users.length).toBe(2);
    expect(user).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node course'
    });
  });
  it('should not remove a user', () => {
    var user = users.removeUser('4');
    // console.log(user);
    expect(users.users.length).toBe(3);
    expect(user).toEqual();
  });
  it('should find a user', () => {
    var user = users.getUser('1');
    expect(user).toEqual(users.users[0]);
  });
  it('should not find a user', () => {
    var user = users.getUser('4');
    expect(user).toEqual();
  });
});
