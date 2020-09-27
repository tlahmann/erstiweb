import boxCollides from "./boxCollides.function";
import getBound from "./getBound.function";
import randInt from "./randInt.function";

export function reposition(
  boxes: any[],
  sep: number,
  randOffset: number
): void {
  // `sep` defines the separation between elements
  sep = (sep || 0) + 1;

  boxes = Array.prototype.slice.call(boxes);

  // Awesome (and probably bad) `shuffle` implementation
  boxes.sort(() => Math.random() - 0.5);

  const parBound = getBound(boxes[0].parentNode, true);

  // Consider the 1st box "ready"; position it
  let numReady = 1;
  boxes[0].style.left =
    randInt(parBound.x - randOffset, parBound.x + randOffset) + "px";
  boxes[0].style.top =
    randInt(parBound.y - randOffset, parBound.y + randOffset) + "px";

  while (numReady < boxes.length) {
    const box = boxes[numReady];
    const bound = getBound(box);

    let x = 0;
    let y = 0;
    let attempts = 0;
    const collisionBoxes = boxes.slice(0, numReady);

    do {
      // Choose a random, "ready" box to align to
      const randInd = randInt(0, numReady);
      const alignBound = getBound(boxes[randInd]);

      // Choose a random side to align to
      const side = randInt(0, 4);
      if (side === 0) {
        // Align to the left
        x = alignBound.x - (alignBound.hw + bound.hw + sep);
        y = alignBound.y + randInt(-randOffset, randOffset);
      } else if (side === 1) {
        // Align to the right
        x = alignBound.x + (alignBound.hw + bound.hw + sep);
        y = alignBound.y + randInt(-randOffset, randOffset);
      } else if (side === 2) {
        // Align to the top
        y = alignBound.y - (alignBound.hh + bound.hh + sep);
        x = alignBound.x + randInt(-randOffset, randOffset);
      } else if (side === 3) {
        // Align to the bottom
        y = alignBound.y + (alignBound.hh + bound.hh + sep);
        x = alignBound.x + randInt(-randOffset, randOffset);
      }

      box.style.left = x + "px";
      box.style.top = y + "px";
    } while (
      attempts++ < 100 &&
      boxCollides(box, collisionBoxes, parBound, sep)
    );

    numReady++;
  }
}
