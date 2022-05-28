const GAME_WIDTH = 1000, GAME_HEIGHT = 800 // Game Constants
const BALL_RADIUS = 8, PADDLE_HEIGHT = 50, PADDLE_WIDTH = 100 

class Arkanoid {
    static instance = null

    constructor (width, height) {
        this.element = document.createElement('canvas')
        this.element.width = width
        this.element.height = height
        this.context = this.element.getContext('2d')
        this.components = []
    }

    static setupGame() {
        
        const arkanoid = new Arkanoid(GAME_WIDTH, GAME_HEIGHT)

        arkanoid.attachTo('#game')

        arkanoid.addComponent(new Ball(GAME_WIDTH / 2, GAME_HEIGHT - 50 - BALL_RADIUS, 8, { x: 0, y: -2 }))

        arkanoid.addComponent(new Paddle(GAME_WIDTH / 2 - 50, GAME_HEIGHT - 50, 100, 8, {x: 5, y: 0}))

        arkanoid.animate()

    }

    attachTo(selector) {
        document.querySelector(selector).append(this.element)
    }

    addComponent(component) {
        this.components.push(component)
    }

    clear() {
        this.context.clearRect( 0, 0, this.element.width, this.element.height)
    }

    reset() {
    }

    checkCollisions () {
        const ball = this.components[0]
        const paddle = this.components[1]

        if (ball.position.x + ball.radius >= this.element.width || ball.position.x - ball.radius <= 0) ball.velocity.x *= -1
        if (ball.position.y + ball.radius >= this.element.height ) this.reset()
        if (ball.position.y - ball.radius <= 0) ball.velocity.y *= -1

        if (ball.position.x + ball.radius >= paddle.position.x && 
            ball.position.x + ball.radius <= paddle.position.x + paddle.width &&
            ball.position.y + ball.radius == paddle.position.y) ball.velocity.y *= -1 
    }

    draw() {
        this.clear()
        this.components.forEach((c) => c.draw(this.context))
    }

    tick = () => {
        this.draw()
        this.checkCollisions()
        this.time++
        requestAnimationFrame(this.tick)
    }

    animate() {
        requestAnimationFrame(this.tick)
    }
}


class Ball {
    
    constructor( x, y, radius, velocity = {x: 0, y: 0}) {
        this.position = {x: x, y: y}
        this.velocity = velocity
        this.radius = radius
        this.left = false
        this.right = false
    }
    
    move = () => {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    
    draw(/** @type {CanvasRenderingContext2D} */ context) {
        context.fillStyle = 'black'
        context.beginPath()
        context.arc(this.position.x , this.position.y, this.radius, 0, Math.PI * 2)
        context.fill()
        this.move()
    } 
}



class Paddle {

    constructor(x, y, width, height, velocity = { x: 0, y: 0 }) {
        this.position = { x: x, y: y }
        this.width = width
        this.height = height
        this.velocity = velocity
        document.addEventListener('keydown', ({key}) => {        
            switch(key) {
                case 'ArrowRight':
                    this.right = true
                    break
                case 'ArrowLeft':
                    this.left = true
                    break
            }
        })
        document.addEventListener('keyup', ({ key }) => {
            switch (key) {
                case 'ArrowRight':
                    this.right = false
                    break
                case 'ArrowLeft':
                    this.left = false
                    break
            }
        })
    }

    moveRight ()  {
        if (this.position.x + this.width + this.velocity.x < GAME_WIDTH) this.position.x += this.velocity.x
    }

    moveLeft () {
        if (this.position.x - this.velocity.x > 0) this.position.x -= this.velocity.x
    }

    draw(/** @type {CanvasRenderingContext2D} */ context) {
        if (this.right) this.moveRight()
        if (this.left) this.moveLeft()
        context.fillStyle = 'black'
        context.arc(this.position.x, this.position.y + this.height / 2, this.height / 2, 0, Math.PI * 2)
        context.rect(this.position.x, this.position.y, this.width, this.height)
        context.arc(this.position.x + this.width, this.position.y + this.height / 2, this.height / 2, 0, Math.PI * 2)
        context.fill()
    }
}
