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
let obstacleNum;

function update() {
  if (!ticks) {
    diffUp = 120;
    obstacleNum = 0;
    player = [];
    // populates array with "pixels" that make a car
    for (let i = 0; i < 8; i++) {
        for (let k = 0; k < 5; k++) {
            const pos = vec((G.WIDTH/2 - G.PLAYER_SIZE * 1.5) + (k * G.PLAYER_SIZE), (G.HEIGHT/2 + (G.PLAYER_SIZE * 6)) + (i * G.PLAYER_SIZE));
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

    addScore(floor(2 * G.OBSTACLESPEED));

    diffUp--;
    if (diffUp < 0 && G.OBSTACLESPEED < 7 && !input.isPressed) {
        G.OBSTACLESPEED += 0.5;
        diffUp = 10;
        console.log(G.OBSTACLESPEED);
    }

    if (G.OBSTACLESPEED < 1) {
        G.OBSTACLESPEED = 1.1;
    }

    if(input.isPressed) {
        G.OBSTACLESPEED -= 0.1;
      }

    // draw sidewalks
    color("light_black");
    box(0, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);
    box(G.WIDTH, G.HEIGHT / 2, G.WIDTH / 4, G.HEIGHT);

  // iterates through each array of sprites in streetLine
  remove(lineGroup, (l) => {
    // retrieves pos from each sprite in streetLine
    for (let i = 0; i < l.length; i++) {
        l[i].pos.y += floor(G.OBSTACLESPEED / 3) + 1; // speed of line relative to obstacleSpeed
        color("yellow");
        box(l[i].pos, G.STREETLINE_SIZE); // draw sprite

        // cycles lines from bottom of screen to top
        if(l[i].pos.y > G.HEIGHT) {
            l[i].pos.y = -24;
        }
    }
    });

    if (obstacle.length === 0) {
        const posX = floor(rnd(1, 3)) == 1 ? G.WIDTH - 10 : 10;
        const posY = -32;
        const type = floor(rnd(0, 2));
        obstacle.push({ pos: vec(posX, posY), type }); 
    }

    remove(obstacle, (o) => {
        o.pos.y += (G.OBSTACLESPEED / 3) + 1;
        if (o.type === 1 && o.pos.x < G.WIDTH - 10) {
            o.pos.x += rnd();
        } else if (o.type === 0 && o.pos.x > 10){
            o.pos.x -= rnd(3, 9);
        }
        color("green");
        box(o.pos, 8);

        if (o.pos.y > G.HEIGHT) {
            o.pos.y = -(rnd(16, 128));
            o.pos.x = rnd(10, G.WIDTH - 10);
            o.type = floor(rnd(0, 2));
        }
    });

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

  text(floor(G.OBSTACLESPEED * 25).toString(), 3, 10);
}