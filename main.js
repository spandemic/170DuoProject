title = "Car Game";

description = `

`;

const G = {
    WIDTH: 200,
    HEIGHT: 200
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

function update() {
  if (!ticks) {
    player = [];
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            const pos = vec((G.WIDTH/2 - 6) + (k * 6), (G.HEIGHT/2 + 42) + (i * 6));
            const state = 0;
            player.push({ pos, state });
        }
    }
  }

  remove(player, (p) => {
    if (p.state === 0) {
        color("blue");
    }
    char("a", p.pos);
  })
}