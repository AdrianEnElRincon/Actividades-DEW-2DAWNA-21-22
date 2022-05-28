// Actividad 1 para DEW de 2DAWNA - por Adrian Abreu Cabrera

const root = /** @type {HTMLElement} */ (document.getElementById('table-container'))

const table = /** @type {HTMLTableElement} */ (document.createElement('table'))

/**
 * Añade una celda al elemento raiz 
 * 
 * @param {HTMLElement} root 
 * @param {String} content 
 */
const addCell = (root, content) => {

    const cell = document.createElement('td')

    cell.textContent = content

    root.appendChild(cell)

}


/**
 * Añade una celda de tipo encabezado al elemento raiz
 * 
 * @param {HTMLElement} root 
 * @param {String} content 
 */
const addHeader = (root, content) => {

    const cell = document.createElement('th')

    cell.textContent = content

    root.appendChild(cell)

}

/**
 * Crea una fila de celdas a partir de un objeto, del tipo especificado por la actividad 1 
 * 
 * @param {any} data 
 * @param {Boolean} header 
 * @returns {HTMLTableRowElement}
 */
const makeRow = (data, header = false) => {

    const tableRow = document.createElement('tr')

    const control = data.control

    delete data.control
    
    for (const d in data) {
        
        header ? addHeader(tableRow, data[d]) : addCell(tableRow, data[d])

    }

    if (!control && !header) {
        tableRow.setAttribute('style', 'color: red')
    }

    return tableRow

}

table.appendChild(makeRow(['id', 'Nombre', 'Departamento'], true))

employees.map(data => {
    table.appendChild(makeRow(data))
})

root.appendChild(table)