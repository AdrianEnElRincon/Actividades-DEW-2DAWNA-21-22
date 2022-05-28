//write your JS code here:
import('./jquery.js')

const exec = (element) => {

    let operation = element.operation
    let data = element.data

    switch (operation) {

        case "push":
            let arr = Array(...data[0])
            arr.push(data[1])
            return arr
        case "+":
            return data.reduce((acc, curr) => {
                return acc + curr
            }, 0)
        case "*":
            return data.reduce((acc, curr) => {
                return acc * curr
            })
        case "filter":
            return data[0].filter((param) => param !== data[1])
        case "merge":
            return [].concat(...data)
    }

}

const OPERATIONS = [
    { operation: "push", data: [[1, 2, 3], 4] },
    { operation: "+", data: [1, 2, 3] },
    { operation: "+", data: [3] },
    { operation: "*", data: [2, 3] },
    { operation: "filter", data: [[1, 2, 3], 3] },
    { operation: "merge", data: [[1, 2, 3], [4, 5], [6], [7]] },
];

let results = ''

OPERATIONS.forEach(element => {
    console.log(exec(element))
    results += '\t' + exec(element) + '\n'  
})

$('#results').text(results)