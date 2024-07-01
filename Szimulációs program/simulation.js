const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
const messagesDiv = document.getElementById('messages');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const plantCount = 20;
const herbivoreCount = 10;
const carnivoreCount = 5;
const plantGrowthInterval = 2000;

class Entity {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 10;
    }

    draw() {
        ctx.fillStyle = this.type === 'plant' ? 'green' : this.type === 'herbivore' ? 'yellow' : 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
        if (this.type !== 'plant') {
            this.x += Math.random() * 10 - 5;
            this.y += Math.random() * 10 - 5;

            // Keep within bounds
            if (this.x < 0) this.x = 0;
            if (this.x > canvasWidth - this.size) this.x = canvasWidth - this.size;
            if (this.y < 0) this.y = 0;
            if (this.y > canvasHeight - this.size) this.y = canvasHeight - this.size;
        }
    }
}

function addMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
}

const entities = [];

// Generate plants
for (let i = 0; i < plantCount; i++) {
    entities.push(new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'plant'));
}

// Generate herbivores
for (let i = 0; i < herbivoreCount; i++) {
    entities.push(new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'herbivore'));
}

// Generate carnivores
for (let i = 0; i < carnivoreCount; i++) {
    entities.push(new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'carnivore'));
}
function addEntities(type, count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        entities.push(new Entity(x, y, type));
    }
}

document.getElementById('addAnimalsButton').addEventListener('click', () => {
    const herbivoreCount = parseInt(document.getElementById('herbivoreCountInput').value, 10);
    const carnivoreCount = parseInt(document.getElementById('carnivoreCountInput').value, 10);
    addEntities('herbivore', herbivoreCount);
    addEntities('carnivore', carnivoreCount);
});

// Function to grow new plants
function growPlant() {
    const newPlant = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'plant');
    entities.push(newPlant);
}

setInterval(growPlant, plantGrowthInterval);

function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];
        entity.move();
        entity.draw();

        // Check for collisions
        for (let j = entities.length - 1; j >= 0; j--) {
            if (i !== j) {
                const other = entities[j];
                if (entity.x < other.x + other.size &&
                    entity.x + entity.size > other.x &&
                    entity.y < other.y + other.size &&
                    entity.y + entity.size > other.y) {

                    if (entity.type === 'herbivore' && other.type === 'plant') {
                        // Herbivore eats plant
                        entities.splice(j, 1);
                        addMessage(new Date().toLocaleTimeString() + " Egy zebra megevett egy füvet.");
                    } else if (entity.type === 'carnivore' && other.type === 'herbivore') {
                        // Carnivore eats herbivore
                        entities.splice(j, 1);
<<<<<<< Updated upstream
                    } else if (entity.type === 'herbivore' && other.type === 'herbivore') {
                        // Herbivores meet
                        entity.meetCounter++;
                        other.meetCounter++;
                        if (entity.meetCounter >= 5 && other.meetCounter >= 5) {
                            // Herbivores breed
                            const newHerbivore = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'herbivore');
                            entities.push(newHerbivore);
                            entity.meetCounter = 0;
                            other.meetCounter = 0;
                        }
=======
                        addMessage(new Date().toLocaleTimeString() + " Egy oroszlán megevett egy zebrát.");
>>>>>>> Stashed changes
                    }
                }
            }
        }
    }

    requestAnimationFrame(update);
}

update();