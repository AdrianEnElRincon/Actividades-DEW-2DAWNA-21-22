class Window {

    static minWidth = 200
    static minHeight = 200

    constructor(options = { width: 500, height: 600, posX: 100, posY: 100}) {

        this.options = options

        const titleBar = $('<div />')
            .addClass('window-titlebar')
            .append($('<p />').addClass('window-title'))
            .append($('<div />').addClass('window-terminate').html('&times;'))


        this.frame = $('<div draggable="false" />')
            .addClass('window-frame')
            .css('width', options.width)
            .css('height', options.height)
            .css('left', options.posX)
            .css('top', options.posY)
            .css('font-size', options.width * 0.05 + 'px')
            .append($('<div />').addClass('window-resize-e'))
            .append($('<div />').addClass('window-resize-s'))
            .append($('<div />').addClass('window-resize-se'))
            .append(titleBar)
        
        this.setTitle('Ventana')
        this.render()
    }

    /**
     * Inicializacion de la interactividad de la ventana, se ha de ejecutar tras añadir la ventana al documento
     */
    init() {

        // Cerrar ventana
        $('.window-terminate').on('mousedown', function () {
            $(this).parents('.window-frame').remove()
        })

        // Codigo para permitir el arrastre de la ventana

        let shiftX = null
        let shiftY = null

        $('.window-title')
            .on('mousedown', function (e) {
                const parent = $(this).parents('.window-frame')
                const parentOffset = parent.offset()
                shiftX = e.pageX - parentOffset.left
                shiftY = e.pageY - parentOffset.top
                $(document).on('mousemove', parent, function (e) {
                    parent
                        .css('left', e.pageX - shiftX)
                        .css('top', e.pageY - shiftY)
                })
            })
            .on('mouseup', () => $(document).off('mousemove'))

        $(document).on('mouseleave', () => $(document).off('mousemove'))

        // Codigo para permitir que la ventana sea reescalable

        $('.window-resize-e')
            .on('mousedown', function (e) {
                const parent = $(this).parents('.window-frame')
                const posX = e.pageX
                const posY = e.pageY
                const originalWidth = parent.width()
                const originalHeight = parent.height()
                $(document).on('mousemove', parent, function (e) {
                    const newWidth = Math.max((e.pageX - posX) + originalWidth, Window.minWidth)
                    const newHeight = Math.max((e.pageY - posY) + originalHeight, Window.minHeight)
                    parent.css('width', newWidth)
                    parent.css('font-size', Math.min(newHeight, newWidth) * 0.05 + 'px')
                })
            })
            .on('mouseup', () => $(document).off('mousemove'))

        $('.window-resize-s')
            .on('mousedown', function (e) {
                const parent = $(this).parents('.window-frame')
                const posX = e.pageX
                const posY = e.pageY
                const originalWidth = parent.width()
                const originalHeight = parent.height()
                $(document).on('mousemove', parent, function (e) {
                    const newHeight = Math.max((e.pageY - posY) + originalHeight, Window.minHeight)
                    const newWidth = Math.max((e.pageX - posX) + originalWidth, Window.minWidth)
                    parent.css('height', newHeight)
                    parent.css('font-size', Math.min(newHeight, newWidth) * 0.05 + 'px')
                })
            })
            .on('mouseup', () => $(document).off('mousemove'))

        $('.window-resize-se')
            .on('mousedown', function (e) {
                const parent = $(this).parents('.window-frame')
                const posX = e.pageX
                const posY = e.pageY
                const originalWidth = parent.width()
                const originalHeight = parent.height()
                $(document).on('mousemove', parent, function (e) {
                    const newWidth = Math.max((e.pageX - posX) + originalWidth, Window.minWidth)
                    parent.css('width', newWidth)
                    const newHeight = Math.max((e.pageY - posY) + originalHeight, Window.minHeight)
                    parent.css('height', newHeight)
                    parent.css('font-size', Math.min(newHeight, newWidth) * 0.05 + 'px')
                })
            })
            .on('mouseup', () => $(document).off('mousemove'))

        $(document).on('mouseup', () => $(document).off('mousemove'))
    }

    /**
     * Añadir la ventana al flujo del documento e inicializar su interactividad
     */
    render() {
        this.frame.appendTo('body')
        this.init()
    }

    /**
     * Cambiar el titulo de la ventana
     * 
     * @param {String} title 
     */
    setTitle(title) {
        this.frame.find('.window-title').text(title)
    }


    /**
     * Cambia el contenido html de la ventana
     * 
     * @param {HTMLElement} content 
     */
    setContent(content) {
        this.frame.children('.window-content').remove()
        this.frame.append(content)
    }

    

    /**
     * Cerrar la ventana
     */
    close() {
        this.frame.remove()
    }

}

class Calculator extends Window {


    constructor(options = { width: 500, height: 600, posX: 100, posY: 100}) {
        super({ width: options.width, height : options.height, posX : options.posX, posY : options.posY })
        this.setTitle('Calculadora')
        this.setContent(Calculator.buildCalculator())
        this.render()
    }

    /**
     * Inicializar la interactividad de la calculadora
     * 
     */
    initCalculator() {
        let numberBuffer = ''
        let operationBuffer = ''
        let historyReset = false

        $('.calculator-button').on('click', function (e) {
            const triggerElement = $(this)

            if (historyReset) {
                $('#calculator-history').text('')
                historyReset = false
            }

            if (triggerElement.hasClass('calculator-button-number')) {

                $('#calculator-display').text(numberBuffer += triggerElement.text())
                $('#calculator-history').append(triggerElement.text())

            } else {

                $('#calculator-history').append(' ' + triggerElement.text() + ' ')

                switch (triggerElement.attr('id').replace('calculator-button-', '')) {
                    case 'add':
                        operationBuffer += numberBuffer + '+'
                        $('#calculator-display').text(numberBuffer = '')
                        break
                    case 'sub':
                        operationBuffer += numberBuffer + '-'
                        $('#calculator-display').text(numberBuffer = '')
                        break
                    case 'div':
                        operationBuffer += numberBuffer + '/'
                        $('#calculator-display').text(numberBuffer = '')
                        break
                    case 'mul':
                        operationBuffer += numberBuffer + '*'
                        $('#calculator-display').text(numberBuffer = '')
                        break
                    case 'res':
                        operationBuffer = ''
                        $('#calculator-display').text(numberBuffer = '')
                        $('#calculator-history').text('')
                        break
                    case 'equ':
                        let result
                        try {
                            result = +Number(eval(operationBuffer + numberBuffer)).toFixed(9)
                            $('#calculator-display').text(result.length > 10 ? result.slice(0, 9) : result)
                            $('#calculator-history').append(' ' + result)
                        } catch {
                            $('#calculator-display').text('ERROR')
                        }
                        historyReset = true
                        operationBuffer = ''
                        numberBuffer = ''
                        break                       
                }

            }

        })

    }

    /**
     * Añadir la calculadora al flujo del documento e inicializar su interactividad
     */
    render() {
        super.render()
        this.initCalculator()
    }

    /**
     * Construye la interfaz de la calculadora
     * 
     * @returns {Jquery<HTMLElement>} Cuerpo de la interfaz de la calculadora
     */
    static buildCalculator() {
        const calculatorBody = $('<div />').addClass('calculator-body')

        $('<div />').attr('id', 'calculator-history').appendTo(calculatorBody)

        $('<div />').attr('id', 'calculator-display').appendTo(calculatorBody)

        const buttonPanel = $('<div />').addClass('calculator-button-panel').appendTo(calculatorBody)

        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-1').text(1).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-2').text(2).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-3').text(3).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-4').text(4).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-5').text(5).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-6').text(6).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-7').text(7).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-8').text(8).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-9').text(9).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-0').text(0).appendTo(buttonPanel)
        $('<div />').addClass('calculator-button calculator-button-number').attr('id', 'calculator-button-dot').text('.').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-add').text('+').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-sub').html('&minus;').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-div').html('&div;').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-mul').html('&times;').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-res').text('C').appendTo(buttonPanel)
        $('<div />').addClass('calculator-button').attr('id', 'calculator-button-equ').html('&equals;').appendTo(buttonPanel)


        return calculatorBody
    }
}

// Botones para crear la ventana y la calculadora

let windowHandle = null
let calcHandle = null

$('<button />').text('Nueva ventana').appendTo('body').on('click', function () {
    if (windowHandle != null) windowHandle.close()
    windowHandle = new Window()
})


$('<button />').text('Nueva calculadora').appendTo('body').on('click', function () {
    if (calcHandle != null) calcHandle.close()
    calcHandle = new Calculator()
})