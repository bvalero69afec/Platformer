const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//Scale background image to move around with Sprite
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

//Split map into rows of 40 tiles
const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 40) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 40))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            console.log('draw a block here')
            collisionBlocks.push(new collisionBlock({
                position: {
                    x: x * 32, //32 = number of pixels of the collision block tile
                    y: y * 32,
                },
            })
            )
        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 40) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 40))
}

const gravity = 0.4

//Position of player
const player = new Player({
    x: 0,
    y: 0,
})
const player2 = new Player({
    x: 300,
    y: 100,
})

const keys = {
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/map.png',
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4) //scale up background image for canvas
    c.translate(0, -background.image.height + scaledCanvas.height) //Start background in bottom left
    background.update()
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update()
    })
    c.restore()

    player.update()
    player2.update()

    //Change speed of movement
    player.velocity.x = 0
    if (keys.ArrowRight.pressed) player.velocity.x = 5
    else if (keys.ArrowLeft.pressed) player.velocity.x = -5
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case ' ':
            player.velocity.y = -15  //Change jump height
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})