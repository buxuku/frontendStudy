const fs = require('fs');
const path = require('path');


const r = fs.readFileSync(path.resolve(__dirname, 'note.md'));
console.log(r)
fs.writeFileSync(path.resolve(__dirname, 'copy.md'), r);

fs.readFile(path.resolve(__dirname, 'note.md'), function(err, data){
    if(err){
        return console.log(err);
    }
    fs.writeFile(path.resolve(__dirname, 'copy.md'), data, function(err){
        if(err){
          return  console.log(err)
        }
        console.log('copy ok')
    })
})