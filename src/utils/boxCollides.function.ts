export default function boxCollides(
  box: any,
  boxes: any[],
  parBound: {
    x: number;
    y: number;
    w: number;
    h: number;
    hw: number;
    hh: number;
  },
  sep: number
): boolean {
  const b1 = box.bounds;
  if (parBound) {
    if (
      b1.x - b1.hw < parBound.x - parBound.hw ||
      b1.x + b1.hw > parBound.x + parBound.hw ||
      b1.y - b1.hh < parBound.y - parBound.hh ||
      b1.y + b1.hh > parBound.y + parBound.hh
    ) {
      return true;
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    const b2 = boxes[i].bounds;

    const sepX = Math.max(b1.x, b2.x) - Math.min(b1.x, b2.x);
    const sepY = Math.max(b1.y, b2.y) - Math.min(b1.y, b2.y);

    if (sepX < b1.hw + b2.hw + sep && sepY < b1.hh + b2.hh + sep) {
      return true;
    };
  }
  return false;
}
