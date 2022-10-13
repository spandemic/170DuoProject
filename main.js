title = "Car Game";

description = `

`;

const G = {
    WIDTH: 200,
    HEIGHT: 200,
    OBSTACLESPEED: 1.2,

    STREETLINE_SIZE: 4
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
 * @typedef {{
 * pos: Vector,
 * state: number
 * }} Player
 */

/**
 * @type { Player [] }
 */ 
let player;

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

function update() {
  if (!ticks) {
    player = [];
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            const pos = vec((G.WIDTH/2 - 6) + (k * 6), (G.HEIGHT/2 + (6 * 7)) + (i * 6));
            const state = 0;
            player.push({ pos, state });
        }
    }
    obstacle = {
      pos: vec(20, 20)
    }
    streetLine = [];
    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 6; k++) {
            const pos = vec((G.WIDTH/2) + (i * G.STREETLINE_SIZE), (0 - (6 * G.STREETLINE_SIZE)) + (k * G.STREETLINE_SIZE));
            streetLine.push({ pos });
        }
    }
  }

  if(obstacle.pos.y < G.HEIGHT){
    obstacle.pos.y += G.OBSTACLESPEED;
    obstacle.pos.x += G.OBSTACLESPEED;
  }

  color("red");
  char("b", obstacle.pos);

  remove(player, (p) => {
    if (p.state === 0) {
        color("blue");
    }
    char("a", p.pos);
  });

  remove(streetLine, (s) => {
    s.pos.y++;
    color("yellow");
    box(s.pos.x, s.pos.y, G.STREETLINE_SIZE);
  })
}