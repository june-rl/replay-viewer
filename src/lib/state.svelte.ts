let currentFrame = $state(0);

export const setCurrentFrame = (frame: number) => {
    currentFrame = frame;
}

export const getCurrentFrame = () => {
    return currentFrame;
}

let focus: number | null = $state(null);

export const setFocus = (actorId: number) => {
    focus = actorId;
}

export const getFocus = () => {
    return focus;
}