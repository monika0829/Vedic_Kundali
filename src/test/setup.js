import '@testing-library/jest-dom';

// Mock canvas for jsdom environment
const mockContext = {
  clearRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  measureText: () => ({ width: 0 }),
  fillText: () => {},
  strokeText: () => {},
  rect: () => {},
  fillRect: () => {},
  strokeRect: () => {},
  drawImage: () => {},
  getImageData: () => ({ data: [] }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  reset: () => {},
  save: () => {},
  restore: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  clip: () => {},
  moveTo: () => {},
  lineTo: () => {},
  quadraticCurveTo: () => {},
  bezierCurveTo: () => {},
  closePath: () => {},
  stroke: () => {},
  get canvas() { return null; },
};

HTMLCanvasElement.prototype.getContext = (type) => mockContext;