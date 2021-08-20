// 异步并发，通常采用计数器的方式来判断并发的结束
const fs = require('fs');
const path = require('path');

// let res = {};
// fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function(err, data){
//     res.name = data;
//     fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function(err, data){
//         res.age = data;
//         console.log(res);
//     })
// });

interface IPerson{
    age: number;
    name: string;
}

function after(time:number, callback:(obj:Object)=>void) {
    let obj = {} as IPerson;
    return function(key: string, value:number | string){
        obj[key] = value;
        --time === 0 && callback(obj);
    }
}

let fn = after(2, function(data){
    console.log(data)
})

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function(err, data){
    fn('name', data)
});
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function(err, data){
    fn('age', data);
})

export {}