import('./jquery.js')

const changeImage = () => {
        
    $.ajax({
        url: 'changed.png',
        success: () => $('img[src="default.png"]').attr('src', 'changed.png'),
        error: ( _, status, error) => {
            $('<div />').text('No se pudo cargar la imagen por el error: ' + error).css('color','red').appendTo('body')
            console.log('No se pudo cargar la imagen por el error:', error)
        }
    })

}

const countdown = () => {

    const number = $('#countdown>p>span')

    let currNumber = number.text()

    if (currNumber > 1) {
        number.text(--currNumber)
    } else {
        $('#countdown').html('<p>Cambiado!</p>')
    }

}

setInterval(countdown, 1000)
setTimeout(changeImage, 3000)