const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
const messagesDiv = document.getElementById('messages');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const plantCount = 20;
const plantGrowthInterval = 2000;

const images = {
    plant: new Image(),
    herbivore: new Image(),
    carnivore: new Image()
};

images.plant.src = 'Icons/grass.png'; // Path to your grass image
images.herbivore.src = 'Icons/zebra.png'; // Path to your zebra image
images.carnivore.src = 'Icons/lion.png'; // Path to your lion image

class Entity {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 40;
        this.lastAte = Date.now();
        this.meetCounter = 0;
    }

    draw() {
        const img = images[this.type];
        ctx.drawImage(img, this.x, this.y, this.size, this.size);
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

    hasStarved() {
        return Date.now() - this.lastAte > 20000;
    }

    updateLastAte() {
        this.lastAte = Date.now();
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

    if (herbivoreCount > 0 && carnivoreCount > 0) {
        addEntities('herbivore', herbivoreCount);
        addEntities('carnivore', carnivoreCount);

        // Disable input fields and button
        document.getElementById('herbivoreCountInput').disabled = true;
        document.getElementById('carnivoreCountInput').disabled = true;
        document.getElementById('addAnimalsButton').disabled = true;

        // Start the simulation after adding animals
        requestAnimationFrame(update);
    } else {
        alert("Kérem, adjon meg érvényes számot mindkét mezőben!");
    }
});

// Function to grow new plants
function growPlant() {
    const newPlant = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'plant');
    entities.push(newPlant);
}

setInterval(growPlant, plantGrowthInterval);

function updateCounts() {
    const herbivoreCountElement = document.getElementById('herbivoreCount');
    const carnivoreCountElement = document.getElementById('carnivoreCount');

    let herbivoreCount = 0;
    let carnivoreCount = 0;

    entities.forEach(entity => {
        if (entity.type === 'herbivore') {
            herbivoreCount++;
        } else if (entity.type === 'carnivore') {
            carnivoreCount++;
        }
    });

    herbivoreCountElement.textContent = `Növényevők (zebrák): ${herbivoreCount}`;
    carnivoreCountElement.textContent = `Ragadozók (oroszlánok): ${carnivoreCount}`;
}

function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    let herbivoreCount = 0;
    let carnivoreCount = 0;
    let plantCount = 0;

    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];
        entity.move();
        entity.draw();

        if (entity.type === 'herbivore') {
            herbivoreCount++;
        } else if (entity.type === 'carnivore') {
            carnivoreCount++;
        } else if (entity.type === 'plant') {
            plantCount++;
        }

        // Check if entity has starved
        if (entity.type !== 'plant' && entity.hasStarved()) {
            entities.splice(i, 1);
            addMessage(new Date().toLocaleTimeString() + ` Egy ${entity.type === 'herbivore' ? 'zebra' : 'oroszlán'} éhen halt.`);
            continue;
        }

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
                        entity.updateLastAte();
                        addMessage(new Date().toLocaleTimeString() + " Egy zebra megevett egy füvet.");
                    } else if (entity.type === 'carnivore' && other.type === 'herbivore') {
                        // Carnivore eats herbivore
                        entities.splice(j, 1);
                        entity.updateLastAte();
                        addMessage(new Date().toLocaleTimeString() + " Egy oroszlán megevett egy zebrát.");

                    } else if (entity.type === 'herbivore' && other.type === 'herbivore') {
                        // Herbivores meet
                        entity.meetCounter++;
                        other.meetCounter++;
                        if (entity.meetCounter >= 10 && other.meetCounter >= 10 && herbivoreCount < 20) {
                            // Herbivores breed
                            const newHerbivore = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'herbivore');
                            entities.push(newHerbivore);
                            entity.meetCounter = 0;
                            other.meetCounter = 0;
                            addMessage(new Date().toLocaleTimeString() + " A zebrák szaporodtak.");

                        }

                    } else if (entity.type === 'carnivore' && other.type === 'carnivore') {
                        // Carnivore meet
                        entity.meetCounter++;
                        other.meetCounter++;
                        if (entity.meetCounter >= 10 && other.meetCounter >= 10 && carnivoreCount < 10) {
                            // Carnivore breed
                            const newCarnivore = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'carnivore');
                            entities.push(newCarnivore);
                            entity.meetCounter = 0;
                            other.meetCounter = 0;
                            addMessage(new Date().toLocaleTimeString() + " Az oroszlánok szaporodtak.");
                        }
                    }
                }
            }
        }
        updateCounts();
    }

    // Check if any entity type is exhausted
    if (plantCount === 0) {
        addMessage("Nincs több fű. A szimuláció véget ért.");
        return;
    }
    if (herbivoreCount === 0) {
        addMessage("Nincs több zebra. A szimuláció véget ért.");
        return;
    }
    if (carnivoreCount === 0) {
        addMessage("Nincs több oroszlán. A szimuláció véget ért.");
        return;
    }

    requestAnimationFrame(update);
}

// Betöltés figyelése
Promise.all(Object.values(images).map(img => new Promise(resolve => {
    if (img.complete) {
        resolve();
    } else {
        img.onload = resolve;
    }
}))).then(() => {
    // Minden betöltve, de a szimuláció nem indul automatikusan
});