export default function getBound(
  elem: any,
  isRoot?: boolean
): { x: number; y: number; w: number; h: number; hw: number; hh: number } {
  const b = elem.getBoundingClientRect();
  return {
    x: isRoot ? b.width >> 1 : parseInt(elem.style.left) || 0,
    y: isRoot ? b.height >> 1 : parseInt(elem.style.top) || 0,
    w: b.width,
    h: b.height,
    hw: b.width >> 1, // half-width
    hh: b.height >> 1 // half-height
  };
}
