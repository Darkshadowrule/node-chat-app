var expect = require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
  var from ="Dark";
  var text='Some Message';
 var message=generateMessage(from,text);
  expect(typeof message.createdAt).toBe('number');
  expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
  var from ="Dark";
  var lat=12;
  var long=20
  var url="https://www.google.com/maps?q=12,20";
  var message=generateLocationMessage(from,lat,long)
    expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({from, url});
  });
});
