import('./jquery.js')

const rowsInput = $('<input>', {
    id: 'rows',
    type: 'text',
    placeholder: 'Numero de filas'
})

const colsInput = $('<input>', {
    id: 'cols',
    type: 'text',
    placeholder: 'Numero de columnas'
})

const submit = $('<button>', {
    id: 'submit'
}).text('Submit')

const clear = $('<button />').text('Clear table').on('click', () => $('#generated').remove())


const generateTable = (rowCount, colCount) => {
    
    ($('#generated').length > 0) ? $('#generated').remove() : null
    
    $('<table />', {
        id: 'generated'
    }).appendTo('body')
    
    const table = $('#generated')
    
    const rowRange = new Range(rowCount)
    const colRange = new Range(colCount)
    
    for (const y of rowRange) {
        
        const row = $('<tr />')
        
        for (const x of colRange) $('<td />').text(`Row: ${y}, Col: ${x}`).appendTo(row)
        
        table.append(row)
    }
}

submit.on('click', () => {
    generateTable(rowsInput.val(), colsInput.val())
})

rowsInput.appendTo('body')
colsInput.appendTo('body')
submit.appendTo('body')
clear.appendTo('body')


// Objeto auxiliar para imitar la funcionalidad de creacion de iteradores como en python y otros mucho lenguajes de programacion
class Range {

    constructor(endIndex) {
        this._data = Array.from({
            length: endIndex
        }, (_, i) => i)
    }

    [Symbol.iterator]() {
        let index = -1
        const data = this._data

        return {
            next: () => ({ value: data[++index], done: !(index in data)})
        }
    }

}