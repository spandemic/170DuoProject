title = "OFF-DUTY COP";

description = `
[HOLD] to Brake
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
 * @typedef {{ pos: Vector, type: number
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
let lineGroup;
let diffUp;
let playerPosition;
let playerX;

function update() {
  if (!ticks) {
    diffUp = 0;
    player = [];
    playerPosition = 1;
    playerX = 0;
    // needlessly complicated street line generation
    streetLine = [];
    lineGroup = [];
    // create group of streetLine
    for (let n = 0; n < 5; n++) {
        const drawPos = 1 * (n * 72);   // distance between each draw
        // draw a 2x6 array that represents a street line
        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < 6; k++) {
                const pos = vec((G.WIDTH/2 + 1) + (i * G.STREETLINE_SIZE), (drawPos - (6 * G.STREETLINE_SIZE)) + (k * G.STREETLINE_SIZE));
                streetLine.push({ pos });
            }
        }
        // adds the entire line into one element of lineGroup
        lineGroup.push(streetLine);
    }
    obstacle = [];
    }

    // addScore(floor(2 * G.OBSTACLESPEED));

    diffUp--;
    if (diffUp < 0 && G.OBSTACLESPEED < 7 && !input.isPressed) {
        G.OBSTACLESPEED += 0.5;
        diffUp = 10;
        console.log(G.OBSTACLESPEED);
    }

    if(input.isPressed) {
        if (G.OBSTACLESPEED < 0.16) {
            G.OBSTACLESPEED -= 0.01;
        } else {
            G.OBSTACLESPEED -= 0.15;
        }
    }

    if (G.OBSTACLESPEED < 0.1) {
        G.OBSTACLESPEED = 0;
    }

    if(input.isJustReleased) {
        player = [];
        if (playerPosition === 2) {
            playerPosition = 0;
        } else {
            playerPosition++;
        }
    }

    
    // draw sidewalks
    color("light_black");
    box(0, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);
    box(G.WIDTH, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);

  // iterates through each array of sprites in streetLine
  remove(lineGroup, (l) => {
    // retrieves pos from each sprite in streetLine
    for (let i = 0; i < l.length; i++) {
        l[i].pos.y += G.OBSTACLESPEED / 3; // speed of line relative to obstacleSpeed
        color("yellow");
        box(l[i].pos, G.STREETLINE_SIZE); // draw sprite

        // cycles lines from bottom of screen to top
        if(l[i].pos.y > G.HEIGHT) {
            l[i].pos.y = -24;
        }
    }
    });
    
    if(player.length === 0) {
        console.log(playerPosition);
        if (playerPosition === 1) {
            playerX = 91;
        } else if (playerPosition === 0) {
            playerX = 46
        } else if (playerPosition === 2) {
            playerX = 136
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
        let posX = G.WIDTH/2;
        let posY = -rnd(400, 1000);
        let type = floor(rnd(0, 2));
        obstacle.push({ pos: vec(posX, posY), type });
         posX = G.WIDTH/2;
         posY = -rnd(1000, 2000);
         type = floor(rnd(0, 2)); 
        obstacle.push({ pos: vec(posX, posY), type });
    }

    remove(obstacle, (o) => {
        o.pos.y += (G.OBSTACLESPEED);
        
        color(o.type === 0 ? "green" : "red");
        box(o.pos, G.WIDTH, 8);

        return(o.pos.y > G.HEIGHT);
        
    });

    
  text(floor(G.OBSTACLESPEED * 25).toString(), 3, 10);
}