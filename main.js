title = "Car Game";

description = `

`;

const G = {
    WIDTH: 200,
    HEIGHT: 200,
    OBSTACLESPEED: 1.2
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
lcccl
cclcc
l   l
c   c
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

function update() {
  if (!ticks) {

  }
}