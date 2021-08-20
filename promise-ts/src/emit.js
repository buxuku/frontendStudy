const fs = require('fs');
const path = require('path');

const events = {
    callBacks:[],
    on(fn){
        this.callBacks.push(fn);
    },
    emit(){
        this.callBacks.map(fn => fn());
    }
}

// events.on(()=>{
//     console.log('1')
// })

// events.emit()

const person = {};

events.on(function(){
    if(Object.keys(person).length === 2){
        console.log(person);
    }
})

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function(err, data){
    person.name = data;
    events.emit()
});
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function(err, data){
    person.age = data;
    events.emit()
})