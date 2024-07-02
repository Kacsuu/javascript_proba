document.addEventListener('imagesLoaded', () => {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    const crosshair = document.getElementById('crosshair');

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const plantCount = 20;
    const plantGrowthInterval = 500;

    const MAX_HERBIVORE_COUNT = 20;
    const MAX_CARNIVORE_COUNT = 10;

    const rockCount = 5;

    // Generate initial entities
    generateEntities(plantCount, 'plant', canvasWidth, canvasHeight);
    generateEntities(rockCount, 'rock', canvasWidth, canvasHeight);

    document.getElementById('addAnimalsButton').addEventListener('click', () => {
        const herbivoreCount = parseInt(document.getElementById('herbivoreCountInput').value, 10);
        const carnivoreCount = parseInt(document.getElementById('carnivoreCountInput').value, 10);

        if (herbivoreCount > 0 && carnivoreCount > 0) {
            for (let i = 0; i < herbivoreCount; i++) {
                addEntities(Math.random() < 0.5 ? 'herbivore' : 'gazelle', 1, canvasWidth, canvasHeight);
            }
            addEntities('carnivore', carnivoreCount, canvasWidth, canvasHeight);

            document.getElementById('herbivoreCountInput').disabled = true;
            document.getElementById('carnivoreCountInput').disabled = true;
            document.getElementById('addAnimalsButton').disabled = true;

            requestAnimationFrame(update);
        } else {
            alert("Kérem, adjon meg érvényes számot mindkét mezőben!");
        }
    });

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
            if (entity.type === 'herbivore' || entity.type === 'gazelle') {
                herbivoreCount++;
            } else if (entity.type === 'carnivore') {
                carnivoreCount++;
            }
        });

        herbivoreCountElement.textContent = `Növényevők (zebrák, gazellák): ${herbivoreCount}`;
        carnivoreCountElement.textContent = `Ragadozók (oroszlánok): ${carnivoreCount}`;
    }

    function update() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        let herbivoreCount = 0;
        let carnivoreCount = 0;
        let plantCount = 0;

        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            entity.move(canvasWidth, canvasHeight, entities);
            entity.draw(ctx, images);

            if (entity.type === 'herbivore' || entity.type === 'gazelle') {
                herbivoreCount++;
            } else if (entity.type === 'carnivore') {
                carnivoreCount++;
            } else if (entity.type === 'plant') {
                plantCount++;
            }

            if (entity.type !== 'plant' && entity.type !== 'rock' && entity.hasStarved()) {
                entities.splice(i, 1);
                addMessage(new Date().toLocaleTimeString() + ` Egy ${entity.type === 'herbivore' ? 'zebra' : 'oroszlán' ||
                    entity.type === 'gazelle' ? 'gazella' : 'oroszlán'} éhen halt.`);
                continue;
            }

            for (let j = entities.length - 1; j >= 0; j--) {
                if (i !== j) {
                    const other = entities[j];
                    if (entity.x < other.x + other.size &&
                        entity.x + entity.size > other.x &&
                        entity.y < other.y + other.size &&
                        entity.y + entity.size > other.y) {

                        if ((entity.type === 'herbivore' || entity.type === 'gazelle') && other.type === 'plant') {
                            entities.splice(j, 1);
                            entity.updateLastAte();
                            addMessage(new Date().toLocaleTimeString() + ` Egy 
                            ${entity.type === 'herbivore' ? 'zebra' : 'gazella'} megevett egy füvet.`);
                        } else if (entity.type === 'carnivore' && (other.type === 'herbivore' || other.type === 'gazelle')) {
                            entities.splice(j, 1);
                            entity.updateLastAte();
                            addMessage(new Date().toLocaleTimeString() + ` Egy oroszlán megevett egy 
                            ${entity.type === 'herbivore' ? 'zebrát' : 'gazellát'}.`);

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

                        } else if (entity.type === 'gazelle' && other.type === 'gazelle') {
                            entity.meetCounter++;
                            other.meetCounter++;
                            if (entity.meetCounter >= 100 && other.meetCounter >= 100) {
                                if (getHerbivoreCount() < MAX_HERBIVORE_COUNT) {
                                    const newGazelle = new Entity(Math.random() * canvasWidth, Math.random() * canvasHeight, 'gazelle');
                                    entities.push(newGazelle);
                                    entity.meetCounter = 0;
                                    other.meetCounter = 0;
                                    addMessage(new Date().toLocaleTimeString() + " A gazellák szaporodtak.");
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
            addMessage("Nincs több zebra és gazella. A szimuláció véget ért.");
            return;
        }
        if (carnivoreCount === 0) {
            addMessage("Nincs több oroszlán. A szimuláció véget ért.");
            return;
        }

        requestAnimationFrame(update);
    }

    // Eseménykezelők beállítása
    setupEventHandlers(canvas, crosshair, updateCounts);

    // Kezdjük el a szimulációt
    requestAnimationFrame(update);
});
