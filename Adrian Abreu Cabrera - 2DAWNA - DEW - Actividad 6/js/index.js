const loadHeader = () => {
    $.ajax('/modules/header.html')
        .done((data) => {
            $('header').html(data)
        })
}

const loadFooter = () => {
    $.ajax('/modules/footer.html')
        .done((data) => {
            $('footer').html(data)
        })
}

const loadTriangle = () => {
    $.ajax('/modules/triangulo.html')
        .done((data) => {
            $('main').html(data)
        })
}

const loadCircle = () => {
    $.ajax('/modules/circulo.html')
        .done((data) => {
            $('main').html(data)
        })
}

const loadSquare = () => {
    $.ajax('/modules/cuadrado.html')
        .done((data) => {
            $('main').html(data)
        })
}


const init = () => {
    loadHeader()
    loadTriangle()
    loadFooter()
}

init()