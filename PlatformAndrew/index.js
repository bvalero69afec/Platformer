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
for (let i = 0; i < platformCollisions.length; i += 40) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 40))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            console.log('draw a block here')
            platformCollisionBlocks.push(new collisionBlock({
                position: {
                    x: x * 32, //32 = number of pixels of the collision block tile
                    y: y * 32,
                },
            })
            )
        }
    })
})

const gravity = 0.4

//Starting position of player
const player = new Player({
    position: {
    x: 120,
    y: 300,
    },
    collisionBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        idle: {
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        run: {
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        jump: {
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 8,
        },
        fall: {
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 8,
        },
    },
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
    c.translate(0, -background.image.height + scaledCanvas.height + 100) //Starting view point of the background image
    background.update()
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update()
    })

    platformCollisionBlocks.forEach(block => {
        block.update()
    })

    player.update()

    //Change speed of movement
    player.velocity.x = 0
    if (keys.ArrowRight.pressed) {
        player.switchSprite('run')
        player.velocity.x = 3
    }
    else if (keys.ArrowLeft.pressed) player.velocity.x = -3
    else if (player.velocity.y === 0) {
        player.switchSprite('idle')
    }
    if (player.velocity.y < 0)
        player.switchSprite('jump')
    else if (player.velocity.y > 0)
        player.switchSprite('fall')

    c.restore()
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
            player.velocity.y = -10  //Change jump height
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