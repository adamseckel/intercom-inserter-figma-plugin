export const resizeNodes = (...nodes) => (width, height = 32) =>
  nodes.forEach(node => node.resize(width, height));

export const appendNodesToFrame = (...nodes) => frame =>
  nodes.forEach(node => frame.appendChild(node));
