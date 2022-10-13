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
 * }}
 */


let obstacle;


function update() {
  if (!ticks) {
    obstacle = {
      pos: vec(20, 20)
    }
  }

  color("cyan");
  rect(obstacle.pos, 4);
  
  if(obstacle.pos.y < G.HEIGHT){
    obstacle.pos.y += G.OBSTACLESPEED;
    obstacle.pos.x += G.OBSTACLESPEED; 
  }
  
}