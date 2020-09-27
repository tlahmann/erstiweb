import getBound from './getBound.function';

export default function boxCollides(box: any, boxes: any[], parBound: { x: number, y: number, w: number, h: number, hw: number, hh: number }, sep: number): boolean {
    var b1 = getBound(box);
    if (parBound) {
        if ((b1.x - b1.hw) < (parBound.x - parBound.hw)
            || (b1.x + b1.hw) > (parBound.x + parBound.hw)
            || (b1.y - b1.hh) < (parBound.y - parBound.hh)
            || (b1.y + b1.hh) > (parBound.y + parBound.hh))
            return true;
    }

    for (var i = 0; i < boxes.length; i++) {
        var b2 = getBound(boxes[i]);

        var sepX = Math.max(b1.x, b2.x) - Math.min(b1.x, b2.x);
        var sepY = Math.max(b1.y, b2.y) - Math.min(b1.y, b2.y);

        if (sepX < (b1.hw + b2.hw + sep) && sepY < (b1.hh + b2.hh + sep)) return true;
    }
    return false;
}
