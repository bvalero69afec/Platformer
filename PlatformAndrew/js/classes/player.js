class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc, frameRate, scale = 0.8, animations}) {
        super({imageSrc, frameRate, scale})
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.collisionBlocks = collisionBlocks
        this.hitBox = {
            position: {
            x: this.position.x,
            y: this.position.y,
        },
            width: 10,
            height: 10,
        }

        this.animations = animations

        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key]) return

        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = this.animations[key].frameBuffer
    }

    update() {
        this.updateFrames()
        this.updateHitBox()

        // Draws out image
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()

        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        
        this.draw()

        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollisions()
    }

    updateHitBox() {
        this.hitBox = {
            position: {
            x: this.position.x + 60,
            y: this.position.y + 42,
        },
            width: 14,
            height: 42,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i <this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            if(
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset = 
                    this.hitBox.position.x - this.position.x + this.hitBox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = 
                    this.hitBox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for (let i = 0; i <this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            if(
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = 
                    this.hitBox.position.y - this.position.y + this.hitBox.height
                    
                    this.position.y = collisionBlock.position.y - offset - 0.01
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0

                    const offset = 
                    this.hitBox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                }
            }
        }
    }
}