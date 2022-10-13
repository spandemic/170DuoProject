title = "Car Game";

description = `

`;

const G = {
    WIDTH: 200,
    HEIGHT: 200,
    OBSTACLESPEED: 1.2,

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
let lineGroup;

function update() {
  if (!ticks) {
    player = [];
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            const pos = vec((G.WIDTH/2 - G.PLAYER_SIZE) + (k * G.PLAYER_SIZE), (G.HEIGHT/2 + (G.PLAYER_SIZE * 7)) + (i * G.PLAYER_SIZE));
            const state = 0;
            player.push({ pos, state });
        }
    }
    obstacle = {
      pos: vec(20, 20)
    }
    streetLine = [];
    lineGroup = [];
    // create group of streetLine
    for (let n = 0; n < 5; n++) {
        // create one street line
        const drawPos = 1 * (n * 72);
        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < 6; k++) {
                const pos = vec((G.WIDTH/2 + 1) + (i * G.STREETLINE_SIZE), (drawPos - (6 * G.STREETLINE_SIZE)) + (k * G.STREETLINE_SIZE));
                streetLine.push({ pos });
            }
        }
        lineGroup.push(streetLine);
  }
}
  if(obstacle.pos.y < G.HEIGHT){
    obstacle.pos.y += G.OBSTACLESPEED;
    obstacle.pos.x += G.OBSTACLESPEED;
  }

  color("red");
  char("b", obstacle.pos);

  remove(lineGroup, (l) => {
    for (let i = 0; i < l.length; i++) {
        l[i].pos.y += G.OBSTACLESPEED;
        color("yellow");
        box(l[i].pos, G.STREETLINE_SIZE);

        if(l[i].pos.y > G.HEIGHT) {
            l[i].pos.y = -24;
        }
    }
    });

  remove(player, (p) => {
    if (p.state === 0) {
        color("blue");
    }
    char("a", p.pos);
  });

//   remove(streetLine, (s) => {
//     s.pos.y++;
//     color("yellow");
//     box(s.pos.x, s.pos.y, G.STREETLINE_SIZE);

//     if (s.pos.y > G.HEIGHT) {
//         s.pos.y = -G.STREETLINE_SIZE;
//     }
    
//   })

}