import { combineReducers } from "redux";
import { SET_TARGET_TIME } from "../actions";
import { targetTimeReducer } from "../../types";

const INITIAL_STATE = {
    time: 0,
    countdownSetTime: Date.now(),
}

export const timerReducer = (state = INITIAL_STATE, action: targetTimeReducer) => {
    switch (action.type) {
        case SET_TARGET_TIME:

            if (action.isToIncrease) {
                if (state.time + action.timeToAdd <= 3540000) {
                    return { time: state.time + action.timeToAdd, countdownSetTime: Date.now() + state.time + action.timeToAdd }
                } else {
                    return { time: 3540000, countdownSetTime: Date.now() + 3540000 }
                }
            } else {
                if (state.time > action.timeToAdd) {
                    return { time: state.time - action.timeToAdd, countdownSetTime: Date.now() + state.time - action.timeToAdd }
                } else {
                    return { time: 0, countdownSetTime: Date.now() }
                }
            }



        default: return state;
    }
}



const rootReducer = combineReducers({ timerReducer });

export default rootReducer;