// Defining Variables
const Canvas = document.querySelector('.Canvas')
const Player = document.querySelector('#Player')
const Ball = document.querySelector('#Ball')
const Score = document.querySelector('#Score')
const Restart_Button = document.querySelector('.restart_button')

var playerX1, playerX2, playerY, ballRadius, xPos = 0, score = 0, playerSpeed = 30, yPos = 1, acceleration = 1, speed = 3, rotation = 0, maxRotation = 6, isFalling = true, isFloating = false

let hitaudio = new Audio('sound/hit1.wav')

playerX1 = parseFloat(Player.getAttribute('x1'))
playerX2 = parseFloat(Player.getAttribute('x2'))

playerY = parseFloat(Player.getAttribute('y2'))

ballRadius = parseFloat(Ball.getAttribute('r'))

// Setting Default Positions
const ballRandPos = ()=>{
    cx = parseFloat(Ball.getAttribute('cx'))
    randX = Math.floor(Math.random()*(Canvas.clientWidth - cx))
    Ball.setAttribute('cx', randX)
    xPos = randX
}
ballRandPos()

// Ball Physics
const fallSimulation = setInterval(()=>{
    // yPos = 1, acceleration = 1
    if(isFalling){
        xPos = parseFloat(Ball.getAttribute('cx'))
        yPos += speed*acceleration
        acceleration += 0.25
        
        Ball.setAttribute('cy', yPos+rotation)
        Ball.setAttribute('cx', xPos+rotation)
    }
}, 20)
const floatSimulation = setInterval(()=>{
    // yPos = 990, acceleration = 10
    if(isFloating){
        xPos = parseFloat(Ball.getAttribute('cx'))
        yPos -= speed*acceleration
        acceleration -= 0.15

        Ball.setAttribute('cy', yPos+rotation)
        Ball.setAttribute('cx', xPos+rotation)
    }
}, 20)

// PLaying Audio Function
let hitSound = ()=>{
    hitaudio.play()
}


// Detecting Collision
const collisionsDetector = setInterval(()=>{
    // Collision with Player
    
    if(yPos>=playerY-20 && yPos<=playerY+40 && xPos>playerX1-10 && xPos<playerX2+10){
        isFalling = false
        acceleration = 11


        if(xPos<=playerX1+(playerX2-playerX1)/2){
            rotation = -1*Math.random()*maxRotation
        } else {
            rotation = Math.random()*maxRotation
        }
        
        score += 1
        Score.innerHTML = score

        isFloating = true
    }

    // Cheking if Ball hit walls
    if(yPos-ballRadius<=0 && score>0){
        isFloating = false
        acceleration = 1
        isFalling = true
        hitSound()
    }
    if(xPos<=0 && score>0){
        rotation = Math.random()*maxRotation
        hitSound()
    }
    if(xPos>=Canvas.clientWidth && score>0){
        rotation = -1*Math.random()*maxRotation
        hitSound()
    }

    // If Ball Fall (Lost)
    if(yPos>playerY+100){
        Canvas.style.background = 'rgba(0, 0, 0, 0.05)'
        Restart_Button.style.pointerEvents = 'all'
        Restart_Button.style.opacity = '1'
    }
    
    
}, 20)


// Keyboard Events
window.addEventListener('keydown', (e)=>{
    let keycode = e.key
    if(keycode == "ArrowRight" && playerX2<Canvas.clientWidth-30){
        playerX1 += playerSpeed
        playerX2 += playerSpeed
        Player.setAttribute('x1', playerX1)
        Player.setAttribute('x2', playerX2)
    }
    if(keycode == "ArrowLeft" && playerX1>10){
        playerX1 -= playerSpeed
        playerX2 -= playerSpeed
        Player.setAttribute('x1', playerX1)
        Player.setAttribute('x2', playerX2)
    }

})

Restart_Button.addEventListener('click', ()=>{
    location.reload()
})