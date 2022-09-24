let _ = require('lodash');
let fs = require('fs');
let data = require('./demo.json')
console.log(data.name)

// read file
fs.readFile('./demo.json', 'utf-8', (err, data) =>{
    data = JSON.parse(data)
    console.log(data.name)
})
console.log(_.random(1,100))

// read directorys
fs.readdir('c:/', (err, data1) =>{
    console.log('data1  ---> ', data1)
})


let data2 = {
    name: 'rohitk'
}
fs.writeFile("demo.json", JSON.stringify(data2), (error) =>{
    console.log('error', error);
});