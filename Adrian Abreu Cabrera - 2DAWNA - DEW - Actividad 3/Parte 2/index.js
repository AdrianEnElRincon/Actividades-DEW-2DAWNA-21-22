import('./jquery.js')


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

window.onload = () => {
    
    const url = new URL(window.location.href)
    
    generateTable(url.searchParams.get('rowsInput'), url.searchParams.get('colsInput'))
    
}


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
            next: () => ({ value: data[++index], done: !(index in data) })
        }
    }

}