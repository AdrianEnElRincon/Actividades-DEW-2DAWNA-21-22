const render = (data) =>  {
    
    const table = (content) => `<table class="table">${content}</table>`

    const row = (content, style) => `<tr style="${style}">${content}</tr>`

    const header = (content) => `<th>${content}</th>`

    const cell = (content) => `<td>${content}</td>`

    let builder = row(header('ID') + header('Nombre') + header('Departamento')) 

    data.map(element => {
        builder += row(cell(element.id) + cell(element.name) + cell(element.department), element.control === 0 ? 'color: red; font-style: italic;': '')
    })

    $('#table-container').html(table(builder))
}


const xmlhttp = new XMLHttpRequest()
xmlhttp.onload = () => {
    const data = JSON.parse(xmlhttp.responseText)
    render(data)
}

xmlhttp.open('GET','employees.json', true)
xmlhttp.send()