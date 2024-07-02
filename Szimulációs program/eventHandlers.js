// eventHandlers.js
function setupEventHandlers(canvas, crosshair, updateCounts) {
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

    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (canvas.width / rect.width);
        const y = (event.clientY - rect.top) * (canvas.height / rect.height);

        console.log(`Click coordinates: (${x}, ${y})`);

        handleCanvasClick(x, y, updateCounts);
    });
}

function handleCanvasClick(x, y, updateCounts) {
    const hitboxMargin = 10;

    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];

        if (entity.type === 'plant') continue;

        const left = entity.x - hitboxMargin;
        const right = entity.x + entity.size + hitboxMargin;
        const top = entity.y - hitboxMargin;
        const bottom = entity.y + entity.size + hitboxMargin;

        console.log(`Checking entity: ${entity.type} at (${entity.x}, ${entity.y})`);
        console.log(`Hitbox: left=${left}, right=${right}, top=${top}, bottom=${bottom}`);

        if (x > left && x < right && y > top && y < bottom) {
            console.log(`Hit detected on ${entity.type}!`);
            if (entity.type === 'herbivore' || entity.type === 'carnivore' || entity.type === 'gazelle') {
                console.log(`Removing ${entity.type}`);
                entities.splice(i, 1);
                addMessage(new Date().toLocaleTimeString() + ` Egy ${entity.type === 'herbivore' ? 'zebra' : entity.type === 'carnivore' ? 'oroszlán' : 'gazella'} meghalt egy kattintásra.`);
                updateCounts();
                return;
            }
        }
    }
    console.log("No entity was clicked");
}

// Globálisan elérhetővé tesszük az eseménykezelő függvényeket
window.setupEventHandlers = setupEventHandlers;
