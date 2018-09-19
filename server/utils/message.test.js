const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    msgSent = {
      from: 'shovan',
      text: 'hello gandu baa'
    };
    msg = generateMessage(msgSent.from, msgSent.text);

    expect(msg.from).toEqual(msgSent.from);

    expect(msg.text).toEqual(msgSent.text);

    expect(typeof msg.createdAt).toBe('number');

  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    msgSent = {
      from: 'admin',
      lat: 1,
      long: 1
    };
    var url = `https://www.google.com/maps?q=${msgSent.lat},${msgSent.long}`;
    locationMsg = generateLocationMessage(msgSent.from, msgSent.lat, msgSent.long);
    expect(locationMsg.from).toEqual(msgSent.from);
    expect(locationMsg.url).toEqual(url);
    expect(typeof locationMsg.createdAt).toBe('number');
  });
});
