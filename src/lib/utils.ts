type Quaternion = {
    x: number,
    y: number,
    z: number,
    w: number
}

type Euler = {
    x: number,
    y: number,
    z: number
}

const quaternionToEuler = ({x,y,z,w}: Quaternion): Euler => {
    const t0 = 2 * (w * x + y * z);
    const t1 = 1 - 2 * (x * x + y * y);
    const t2 = 2 * (w * y - z * x);
    const t3 = 2 * (w * z + x * y);
    const t4 = 1 - 2 * (y * y + z * z);

    return {
        x: Math.asin(Math.max(-1, Math.min(1, t0))),
        y: Math.atan2(t2, t1),
        z: Math.atan2(t3, t4)
    }
}