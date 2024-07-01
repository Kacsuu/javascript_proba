const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
const messagesDiv = document.getElementById('messages');
const crosshair = document.getElementById('crosshair');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const plantCount = 20;
const plantGrowthInterval = 500;

const MAX_HERBIVORE_COUNT = 20;
const MAX_CARNIVORE_COUNT = 10;

const images = {
    plant: new Image(),
    herbivore: new Image(),
    carnivore: new Image()
};

canvas.addEventListener('mousemove', function (event) {
    crosshair.style.display = 'block';

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - (crosshair.width / 2);
    const y = event.clientY - rect.top - (crosshair.height / 2);

    crosshair.style.left = `${x}px`;
    crosshair.style.top = `${y}px`;
});

canvas.addEventListener('mouseleave', function () {
    crosshair.style.display = 'none';
});

images.plant.src = 'Images/grass.png';
images.herbivore.src = 'Images/zebra.png';
images.carnivore.src = 'Images/lion.png';

class Entity {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 40;
        this.lastAte = Date.now();
        this.meetCounter = 0;
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
        this.directionPersistence = 30;
        this.persistenceCounter = 0;
    }

    draw() {
        const img = images[this.type];
        ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }

    move() {
        const maxSpeed = 3;
        if (this.type !== 'plant') {
            if (this.persistenceCounter <= 0) {
                this.directionX = Math.random() * 2 - 1;
                this.directionY = Math.random() * 2 - 1;
                this.persistenceCounter = this.directionPersistence;
            }

            this.x += this.directionX * maxSpeed;
            this.y += this.directionY * maxSpeed;

            if (this.x < 0) {
                this.x = 0;
                this.directionX = -this.directionX;
            }
            if (this.x > canvasWidth - this.size) {
                this.x = canvasWidth - this.size;
                this.directionX = -this.directionX;
            }
            if (this.y < 0) {
                this.y = 0;
                this.directionY = -this.directionY;
            }
            if (this.y > canvasHeight - this.size) {
                this.y = canvasHeight - this.size;
                this.directionY = -this.directionY;
            }

            this.persistenceCounter--;
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

        document.getElementById('herbivoreCountInput').disabled = true;
        document.getElementById('carnivoreCountInput').disabled = true;
        document.getElementById('addAnimalsButton').disabled = true;

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

function getHerbivoreCount() {
    let count = 0;
    entities.forEach(entity => {
        if (entity.type === 'herbivore') {
            count++;
        }
    });
    return count;
}

function getCarnivoreCount() {
    let count = 0;
    entities.forEach(entity => {
        if (entity.type === 'carnivore') {
            count++;
        }
    });
    return count;
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

        if (entity.type !== 'plant' && entity.hasStarved()) {
            entities.splice(i, 1);
            addMessage(new Date().toLocaleTimeString() + ` Egy ${entity.type === 'herbivore' ? 'zebra' : 'oroszlán'} éhen halt.`);
            continue;
        }

        for (let j = entities.length - 1; j >= 0; j--) {
            if (i !== j) {
                const other = entities[j];
                if (entity.x < other.x + other.size &&
                    entity.x + entity.size > other.x &&
                    entity.y < other.y + other.size &&
                    entity.y + entity.size > other.y) {

                    if (entity.type === 'herbivore' && other.type === 'plant') {
                        entities.splice(j, 1);
                        entity.updateLastAte();
                        addMessage(new Date().toLocaleTimeString() + " Egy zebra megevett egy füvet.");
                    } else if (entity.type === 'carnivore' && other.type === 'herbivore') {
                        entities.splice(j, 1);
                        entity.updateLastAte();
                        addMessage(new Date().toLocaleTimeString() + " Egy oroszlán megevett egy zebrát.");

                    } else if (entity.type === 'herbivore' && other.type === 'herbivore') {
                        entity.meetCounter++;
                        other.meetCounter++;
                        if (entity.meetCounter >= 100 && other.meetCounter >= 100) {
                            if (getHerbivoreCount() < MAX_HERBIVORE_COUNT) {
                                const newHerbivore = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'herbivore');
                                entities.push(newHerbivore);
                                entity.meetCounter = 0;
                                other.meetCounter = 0;
                                addMessage(new Date().toLocaleTimeString() + " A zebrák szaporodtak.");
                            }
                        }

                    } else if (entity.type === 'carnivore' && other.type === 'carnivore') {
                        entity.meetCounter++;
                        other.meetCounter++;
                        if (entity.meetCounter >= 200 && other.meetCounter >= 200 && getCarnivoreCount() < MAX_CARNIVORE_COUNT) {
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

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Click at (${x}, ${y})`);

    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];
        console.log(`Entity: ${entity.type} at (${entity.x}, ${entity.y})`);

        if (x > entity.x && x < entity.x + entity.size && y > entity.y && y < entity.y + entity.size) {
            console.log(`Clicked on ${entity.type}`);
            if (entity.type === 'herbivore' || entity.type === 'carnivore') {
                entities.splice(i, 1);
                addMessage(new Date().toLocaleTimeString() + ` Egy ${entity.type === 'herbivore' ? 'zebra' : 'oroszlán'} meghalt egy kattintásra.`);
                break;
            }
        }
    }
});

Promise.all(Object.values(images).map(img => new Promise(resolve => {
    if (img.complete) {
        resolve();
    } else {
        img.onload = resolve;
    }
}))).then(() => {
    // All images are loaded, but the simulation does not start automatically
});
