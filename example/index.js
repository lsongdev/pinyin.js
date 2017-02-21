const fs     = require('fs');
const pinyin = require('../');

const EOL = '\n';

fs.readFile(__dirname + '/chun.txt', 'utf8', function(err, content){
  content.split(EOL).forEach(function(line){
    
    console.log(line);
    console.log(pinyin(line).join(' '));
    console.log();
    
  });
});
