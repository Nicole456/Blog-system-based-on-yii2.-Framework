/**
 * @author Alex Andrix <alex@alexandrix.com>
 * @since 2019
 */


let App = {}
App.setup = function () {
	// The setup function initializes everything in a permanent way (will never be set anew)
	
	const canvas = document.createElement('canvas')
	//const maxWidth = 9933, maxHeight = 14043
	//const quality = 0.1
	//this.filename = "artwork"
	
	this.canvas = canvas
	this.canvas.width = window.innerWidth//maxWidth * quality//window.innerWidth
	this.canvas.height = window.innerHeight//maxHeight * quality//3370//window.innerHeight
	this.ctx = this.canvas.getContext('2d')
	this.width = this.canvas.width
	this.height = this.canvas.height
	this.dataToImageRatio = Math.max(this.width, this.height) / 1000
  
	// Blend mode /!\ Don't use if you can! Can be a mega source of lag, proportional to canvas size
	this.ctx.globalCompositeOperation = 'darker'// This one is OK
	//this.ctx.globalCompositeOperation = 'lighter'// This one is OK

	this.ctx.imageSmoothingEnabled = false
	this.ctx.webkitImageSmoothingEnabled = false
	this.ctx.msImageSmoothingEnabled = false
	this.xC = this.width / 2
	this.yC = this.height / 2

	document.getElementsByTagName('body')[0].appendChild(canvas)

	// Particle system properties
	this.lifespan = 300
	this.popPerBirth = 5
	this.maxPop = 1500
	this.birthFreq = 1
}
App.start = function () {
	// The start function sets, and potentially resets things that will change over time
	this.stepCount = 0
	this.particles = []
	
	// Counters for UI
	this.drawnInLastFrame = 0
	this.deathCount = 0
	
	// Initial paint (background most often)
	this.initDraw()
}
App.evolve = function () {
	let time1 = performance.now()

	this.stepCount++

	// Use birth control
	if (this.stepCount % this.birthFreq == 0 && (this.particles.length + this.popPerBirth) < this.maxPop) {
		for (let n = 0; n < this.popPerBirth; n++) {
			this.birth()
		}
	}
	
	// Core sequence: MOVE everything then DRAW everything
	App.move()
	App.draw()

	let time2 = performance.now()

}
App.birth = function () {
	let x = -800 + 1600 * Math.random(),
		y = -800 + 1600 * Math.random()
		
	let particle = {
		hue: 190 + 3 * Math.floor(3 * Math.random()),
		sat: 60 + 30 * Math.random(),
		lum: 15 + Math.floor(50*Math.random()),
		x,
		y,
		xLast: x, yLast: y,
		xSpeed: 0, ySpeed: 0,
		age: 0,
		name: 'seed-' + Math.ceil(10000000 * Math.random())
	}

	this.particles.push(particle)
}
App.kill = function (deadParticleName) {
	this.particles = this.particles.filter(p => p.name !== deadParticleName)
}
App.move = function () {
	for (let i = 0; i < this.particles.length; i++) {
		// Get particle
		let p = this.particles[i]

		// Save last position
		p.xLast = p.x
		p.yLast = p.y
		
		// Reset velocity, as we're dealing with velocity fields and not forces
		p.xSpeed = 0; p.ySpeed = 0
		
		// Eddies, boys
		let eddies = [], baseK = 7
		eddies.push({ x: -300, y: -300, K: 10 * baseK, r0: 180 })
		eddies.push({ x: 300, y: -300, K: 15 * baseK, r0: 150 })
		eddies.push({ x: 300, y: 300, K: 10 * baseK, r0: 250 })
		eddies.push({ x: -300, y: 300, K: 15 * baseK, r0: 150 })
		eddies.push({ x: 0, y: 0, K: 5 * baseK, r0: 20 })
		
		for (var e = 0; e < eddies.length; e++) {
			let eddy = eddies[e]
			let dx = p.x - eddy.x,
			dy = p.y - eddy.y,
			r = Math.sqrt(dx*dx + dy*dy),
			theta = Utils.segmentAngleRad(0, 0, dx, dy, true),
			cos = Math.cos(theta), sin = Math.sin(theta),
			K = eddy.K, // intensity
			r0 = eddy.r0
			
			let er = { x: cos, y: sin },
				eO = { x: -sin, y: cos }
				
			let radialVelocity = -0.003 * K * Math.abs(dx*dy)/3000,
				//azimutalVelocity = 2 * K * Math.max(0, Math.min(1 - r/(2*r0), r/(2*r0)))
				sigma = 100,
				azimutalVelocity = K * Math.exp(-Math.pow((r - r0) / sigma, 2))
			
			p.xSpeed += radialVelocity * er.x + azimutalVelocity * eO.x
			p.ySpeed += radialVelocity * er.y + azimutalVelocity * eO.y
		
		}
		
		// Viscosity
		let visc = 1
		p.xSpeed *= visc; p.ySpeed *= visc

		p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed)

		p.x += 0.1 * p.xSpeed; p.y += 0.1 * p.ySpeed

		// Get older
		p.age++

		// Kill if too old
		if (p.age > this.lifespan) {
			this.kill(p.name)
			this.deathCount++
		}
	}
}
App.initDraw = function () {
	// Reset
	this.ctx.clearRect(0, 0, this.width, this.height)

	// Background
	this.ctx.beginPath()
	this.ctx.rect(0, 0, this.width, this.height)
	this.ctx.fillStyle = 'white'
	this.ctx.fill()
	this.ctx.closePath()
}
App.draw = function () {
	this.drawnInLastFrame = 0
	if (!this.particles.length) return false

	this.ctx.beginPath()
	this.ctx.rect(0, 0, this.width, this.height)
	this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
	//this.ctx.fill()
	this.ctx.closePath()

	for (let i = 0; i < this.particles.length; i++) {
		// Draw particle
		let p = this.particles[i]

		let h, s, l, a

		h = p.hue,
		s = p.sat
		l = p.lum
		a = 0.3

		a = 0.3 + p.speed / 400
		
		let last = this.dataXYtoCanvasXY(p.xLast, p.yLast),
		now = this.dataXYtoCanvasXY(p.x, p.y)

		this.ctx.beginPath()

		this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
		this.ctx.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'

		// Particle trail
		this.ctx.moveTo(last.x, last.y)
	
this.ctx.lineTo(now.x, now.y)

		let size = .4 * (3 - 4 * p.age / 500)
		
		this.ctx.lineWidth = 1 * size * this.dataToImageRatio
		this.ctx.stroke()
		this.ctx.closePath()

		// UI counter
		this.drawnInLastFrame++
	}
}
App.dataXYtoCanvasXY = function (x, y) {
	const zoom = 0.72
	let xx = this.xC + x * zoom * this.dataToImageRatio,
		yy = this.yC + y * zoom * this.dataToImageRatio

	return {x: xx, y: yy}
}

let Utils = {}
Utils.segmentAngleRad = (Xstart, Ystart, Xtarget, Ytarget, realOrWeb) => {
	/**
	 * @param {Number} Xstart X value of the segment starting point
	 * @param {Number} Ystart Y value of the segment starting point
	 * @param {Number} Xtarget X value of the segment target point
	 * @param {Number} Ytarget Y value of the segment target point
	 * @param {Boolean} realOrWeb true if Real (Y towards top), false if Web (Y towards bottom)
	 * @returns {Number} Angle between 0 and 2PI
	 */
	let result// Will range between 0 and 2PI
	if (Xstart == Xtarget) {
		if (Ystart == Ytarget) {
			result = 0 
		} else if (Ystart < Ytarget) {
			result = Math.PI/2
		} else if (Ystart > Ytarget) {
			result = 3*Math.PI/2
		} else {}
	} else if (Xstart < Xtarget) {
		result = Math.atan((Ytarget - Ystart)/(Xtarget - Xstart))
	} else if (Xstart > Xtarget) {
		result = Math.PI + Math.atan((Ytarget - Ystart)/(Xtarget - Xstart))
	}
	
	result = (result + 2*Math.PI)%(2*Math.PI)
	
	if (!realOrWeb) {
		result = 2*Math.PI - result
	}
	
	return result
}

document.addEventListener('DOMContentLoaded', () => {
	App.setup()
	App.start()

	let frame = () => {
		App.evolve()
		requestAnimationFrame(frame)
	}
	
	frame()
})