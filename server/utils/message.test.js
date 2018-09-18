const expect = require('expect');
const {generateMessage} = require('./message');

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
