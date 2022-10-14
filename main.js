title = "SWERVE";

description = `
[HOLD] to Brake
[RELEASE] to Swerve
`;

const G = {
    WIDTH: 200,
    HEIGHT: 200,
    OBSTACLESPEED: 2,

    STREETLINE_SIZE: 4,
    PLAYER_SIZE: 6
};

characters = [
`
gggggg
gggggg
gggggg
gggggg
gggggg
gggggg
`
];

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark",
    isReplayEnabled: true,
    // isCapturing: true,
    seed: 2
};

/**
 * @typedef {{pos: Vector, state: number
 * }} Player
 */

/**
@type { Player [] }
 */ 
let player;

/**
 * @typedef {{ pos: Vector
 * }} Obstacle
 */

/**
 * @type { Obstacle [] }
 */
let obstacle;


/**
 * @typedef {{
 * pos: Vector,
 * }} StreetLine
 */

/**
 * @type { StreetLine []}  
 */
let streetLine;

let diffUp;
let playerPosition;
let playerX;
let obstacleSpawn;
let moving;
let playerLives;

function update() {
  if (!ticks) {
    diffUp = 0;
    player = [];
    playerPosition = 1;
    playerX = 0;
    obstacleSpawn = 0;
    moving = 1;
    obstacle = [];
    streetLine = [];
    playerLives = 3;
    // create group of streetLine
    for (let n = 0; n < 3; n++) {
        const drawPos = 1 * (n * 72);   // distance between each draw
        let pos = vec((G.WIDTH/3 + 12), (-drawPos - (28)));
        streetLine.push({ pos });
        pos = vec((G.WIDTH * 2/3 - 6), (-drawPos - (28)));
        streetLine.push({ pos });
        }
    }

    addScore(floor(2 * floor(G.OBSTACLESPEED / 2)));

    if (playerLives === 3) {
        color("green");
    } else if (playerLives === 2) {
        color("yellow");
    } else if (playerLives === 1) {
        color("red");
    } else {
        color("light_red");
        end();
    }
    box(0, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);
    box(G.WIDTH, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);

    diffUp--;
    if (diffUp < 0 && G.OBSTACLESPEED < 6 && !input.isPressed) {
        G.OBSTACLESPEED += 0.5;
        diffUp = 10;
        console.log(G.OBSTACLESPEED);
    }

    if(input.isPressed) {
        if (G.OBSTACLESPEED < 0.31) {
            G.OBSTACLESPEED -= 0.01;
        } else {
            G.OBSTACLESPEED -= 0.3;
        }
    }

    if (G.OBSTACLESPEED < 0.1) {
        G.OBSTACLESPEED = 0;
    }

    if(input.isJustReleased) {
        player = [];
        play("click");
        if (playerPosition === 2) {
            playerPosition--;
            moving = -1;
        } else if (playerPosition === 0) {
            playerPosition++;
            moving = 1;
        } else {
            if (moving < 0) {
                playerPosition--;
            } else {
                playerPosition++;
            }
        }
    }

  // iterates through each array of sprites in streetLine
  remove(streetLine, (l) => {
    // retrieves pos from each sprite in streetLine 
        color("yellow");
        box(l.pos, 8, 40); // draw sprite
        l.pos.y += G.OBSTACLESPEED;

        // cycles lines from bottom of screen to top
        if(l.pos.y > G.HEIGHT + 24) {
            l.pos.y = 0;
        }
    
    });
    
    if(player.length === 0) {
        console.log(playerPosition);
        if (playerPosition === 1) {
            playerX = 91;
        } else if (playerPosition === 0) {
            playerX = 40;
        } else if (playerPosition === 2) {
            playerX = 142;
        }
        for (let i = 0; i < 8; i++) {
            for (let k = 0; k < 5; k++) {
                const pos = vec((playerX) + (k * G.PLAYER_SIZE), (G.HEIGHT/2 + (G.PLAYER_SIZE * 6)) + (i * G.PLAYER_SIZE));
                let state = 0;
                if ((i === 1 || i === 2 || i === 6) && (k === 1 || k === 2 || k === 3)) {
                    state = 3
                } else if ((i === 0) && (k != 2) || (i === 7) && (k === 1 || k === 3)) {
                    state = 2;
                } else if ((i === 7) && (k === 0 || k === 4)) {
                    state = 1;
                } else {
                    state = 0;
                }
                player.push({ pos, state });
            }
        }
    }

    remove(player, (p) => {
        if (p.state === 0) {
            color("light_cyan");
        } else if (p.state === 1) {
            color(input.isPressed ? "red" : "light_red");
        } else if (p.state === 3) {
            color("cyan");
        } else {
            color("yellow");
        }
        char("a", p.pos);

        if (input.isPressed) {
            color("purple");
            particle(p.pos.x, p.pos.y + 6);
        }
    });
  
    if (obstacle.length === 0) {
        console.log("hi");
        for (let i = 0; i < 4; i++) {
            obstacleSpawn = floor(rnd(0, 3));
            let posX = 0;
            if (obstacleSpawn === 0) {
                posX = G.WIDTH/2 - 51;
            } else if (obstacleSpawn === 1) {
                posX = G.WIDTH/2 + 3;
            } else {
                posX = G.WIDTH/2 + 51;
            }
            const posY = -rnd(400, 2500);
            obstacle.push({pos: vec(posX, posY)});
        }
    }

    remove(obstacle, (o) => {
        o.pos.y += (G.OBSTACLESPEED);
        color("red");

        const isCollidingWithPlayer = box(o.pos, 30, 8).isColliding.char.a;

        if (isCollidingWithPlayer) {
            particle(o.pos.x, o.pos.y);
            play("hit");
            playerLives--;
        }
        return(o.pos.y > G.HEIGHT || isCollidingWithPlayer);
    });

    
  text("MPH: " + floor(G.OBSTACLESPEED * 25).toString(), 3, 10);
}