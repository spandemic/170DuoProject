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
`,`
 gggg
gggggg
gg  gg
gg  gg
gg  gg
`
];

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark"
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
 * @typedef {{ pos: Vector,
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

function update() {
  if (!ticks) {
    diffUp = 0;
    player = [];
    playerPosition = 1;
    playerX = 0;
    obstacleSpawn = 0;
    moving = 1;
  
    streetLine = [];
    // create group of streetLine
    for (let n = 0; n < 3; n++) {
        const drawPos = 1 * (n * 72);   // distance between each draw
        let pos = vec((G.WIDTH/3 + 12), (-drawPos - (28)));
        streetLine.push({ pos });
        pos = vec((G.WIDTH * 2/3 - 6), (-drawPos - (28)));
        streetLine.push({ pos });
    }
    obstacle = [];
    }

    addScore(floor(2 * floor(G.OBSTACLESPEED / 2)));

    diffUp--;
    if (diffUp < 0 && G.OBSTACLESPEED < 9 && !input.isPressed) {
        G.OBSTACLESPEED += 0.75;
        diffUp = 10;
        console.log(G.OBSTACLESPEED);
    }

    if(input.isPressed) {
        if (G.OBSTACLESPEED < 0.11) {
            G.OBSTACLESPEED -= 0.01;
        } else {
            G.OBSTACLESPEED -= 0.1;
        }
    }

    if (G.OBSTACLESPEED < 0.1) {
        G.OBSTACLESPEED = 0;
    }

    if(input.isJustReleased) {
        player = [];
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

    
    // draw sidewalks
    color("light_black");
    box(0, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);
    box(G.WIDTH, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);

  // iterates through each array of sprites in streetLine
  remove(streetLine, (l) => {
    // retrieves pos from each sprite in streetLine 
        color("yellow");
        box(l.pos, 8, 40); // draw sprite
        l.pos.y += G.OBSTACLESPEED;

        // cycles lines from bottom of screen to top
        if(l.pos.y > G.HEIGHT) {
            l.pos.y = -24;
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
        });
  
    

    if (obstacle.length === 0) {
        for (let i = 0; i < 4; i++) {
            obstacleSpawn = floor(rnd(0, 3));
            let posX = 0;
            if (obstacleSpawn === 0) {
                posX = G.WIDTH - 54;
            } else if (obstacleSpawn === 1) {
                posX = G.WIDTH/2;
            } else {
                posX = G.WIDTH/2 + 54
            }
            const posY = rnd(400, 1800);
            obstacle.push({pos: vec(posX, posY)})
        }
    }

    remove(obstacle, (o) => {
        color("red");
        box(o.pos, G.WIDTH, 8);

        o.pos.y += (G.OBSTACLESPEED);
        return(o.pos.y > G.HEIGHT);
    });

    
  text(floor(G.OBSTACLESPEED * 25).toString(), 3, 10);
}