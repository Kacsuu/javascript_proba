// entitiesManager.js
const entities = [];

function generateEntities(count, type, canvasWidth, canvasHeight) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        entities.push(new Entity(x, y, type));
    }
}

function addEntities(type, count, canvasWidth, canvasHeight) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        entities.push(new Entity(x, y, type));
    }
}

function getHerbivoreCount() {
    return entities.filter(entity => entity.type === 'herbivore' || entity.type === 'gazelle').length;
}

function getCarnivoreCount() {
    return entities.filter(entity => entity.type === 'carnivore').length;
}

// Globálisan elérhetővé tesszük az entitáskezelő függvényeket és az entities tömböt
window.generateEntities = generateEntities;
window.addEntities = addEntities;
window.getHerbivoreCount = getHerbivoreCount;
window.getCarnivoreCount = getCarnivoreCount;
window.entities = entities;
