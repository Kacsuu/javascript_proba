// images.js
const images = {
    plant: new Image(),
    herbivore: new Image(),
    gazelle: new Image(),
    carnivore: new Image(),
    rock: new Image()
};

let imagesLoaded = 0;
const totalImages = Object.keys(images).length;

const onImageLoad = () => {
    imagesLoaded += 1;
    if (imagesLoaded === totalImages) {
        document.dispatchEvent(new Event('imagesLoaded'));
    }
};

for (let key in images) {
    images[key].onload = onImageLoad;
}

images.plant.src = 'Images/grass.png';
images.carnivore.src = 'Images/lion.png';
images.herbivore.src = 'Images/zebra.png';
images.gazelle.src = 'Images/gazelle.png';
images.rock.src = 'Images/rock.png';
