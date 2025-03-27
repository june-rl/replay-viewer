let currentFrame = $state(0);

export const setCurrentFrame = (frame: number) => {
    currentFrame = frame;
}

export const getCurrentFrame = () => {
    return currentFrame;
}