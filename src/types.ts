export type targetTimeReducer = {
    type: string,
    timeToAdd: number,
    isToIncrease: boolean,
}

export type targetTimeState = {
    time: number,
    countdownSetTime: number,
}

export type RootReduxState = {
    timerReducer: targetTimeState,
}