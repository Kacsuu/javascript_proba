// entity.js
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

    draw(ctx, images) {
        const img = images[this.type];
        ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }

    move(canvasWidth, canvasHeight, entities) {
        const maxSpeed = 3;
        const gazelleSpeed = 4;

        if (this.type !== 'plant' && this.type !== 'rock') {
            if (this.persistenceCounter <= 0) {
                this.directionX = Math.random() * 2 - 1;
                this.directionY = Math.random() * 2 - 1;
                this.persistenceCounter = this.directionPersistence;
            }
            if (this.type === 'gazelle') {
                this.x += this.directionX * gazelleSpeed;
                this.y += this.directionY * gazelleSpeed;
            } else {
                this.x += this.directionX * maxSpeed;
                this.y += this.directionY * maxSpeed;
            }

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

            this.checkCollisionWithRocks(entities);
        }
    }

    checkCollisionWithRocks(entities) {
        for (const entity of entities) {
            if (entity.type === 'rock' && this !== entity) {
                if (this.x < entity.x + entity.size &&
                    this.x + this.size > entity.x &&
                    this.y < entity.y + entity.size &&
                    this.y + this.size > entity.y) {
                    // Collision
                    const overlapX = Math.min(this.x + this.size - entity.x, entity.x + entity.size - this.x);
                    const overlapY = Math.min(this.y + this.size - entity.y, entity.y + this.size - this.y);

                    if (overlapX < overlapY) {
                        if (this.x < entity.x) {
                            this.x -= overlapX / 2;
                            this.directionX = -Math.abs(this.directionX);
                        } else {
                            this.x += overlapX / 2;
                            this.directionX = Math.abs(this.directionX);
                        }
                    } else {
                        if (this.y < entity.y) {
                            this.y -= overlapY / 2;
                            this.directionY = -Math.abs(this.directionY);
                        } else {
                            this.y += overlapY / 2;
                            this.directionY = Math.abs(this.directionY);
                        }
                    }

                    // Slightly randomize the direction to prevent oscillation
                    this.directionX += (Math.random() - 0.5) * 0.2;
                    this.directionY += (Math.random() - 0.5) * 0.2;
                }
            }
        }
    }

    hasStarved() {
        return Date.now() - this.lastAte > 20000;
    }

    updateLastAte() {
        this.lastAte = Date.now();
    }
}

// Globálisan elérhetővé tesszük az Entity osztályt
window.Entity = Entity;
