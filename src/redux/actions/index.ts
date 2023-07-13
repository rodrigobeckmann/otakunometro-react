export const SET_TARGET_TIME = 'SET_TARGET_TIME';




export const setTargetTime = (targetTime: number, isIncrease: boolean) => ({
    type: SET_TARGET_TIME,
    timeToAdd: targetTime,
    isToIncrease: isIncrease,
})