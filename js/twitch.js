const svg = document.querySelector('svg');
const eyesight = svg.querySelector('svg #eyesight');
const { left: x, top: y, width, height } = svg.getBoundingClientRect();
const position = {
  x,
  y,
};
const h = {
  domain: [0, width],
  range: [-8, 8],
};

const v = {
  domain: [0, height],
  range: [-4, 4],
};
window.addEventListener('resize', () => {
  const {
    left: x1,
    top: y1,
    width: width1,
    height: height1,
  } = svg.getBoundingClientRect();
  position.x = x1;
  position.y = y1;
  h.domain[1] = width1;
  v.domain[1] = height1;
});
const linearScale = (value = 1, domain = [0, 1], range = [0, 1]) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const m = (r1 - r0) / (d1 - d0);
  const b = r1 - m * d1;
  return m * value + b;
};
function handleMousemove(e) {
  const cX = e.pageX - position.x;
  const cY = e.pageY - position.y;
  const tX = linearScale(cX, h.domain, h.range);
  const tY = linearScale(cY, v.domain, v.range);
  eyesight.setAttribute('transform', `translate(${tX} ${tY})`);
}
svg.addEventListener('mousemove', handleMousemove);
