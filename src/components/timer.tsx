import Countdown, { CountdownRendererFn } from "react-countdown";
import styles from './timer.module.css'
import React from 'react'
import { useDispatch } from "react-redux";
import { setTargetTime } from "../redux/actions";
import { useSelector } from 'react-redux'
import { RootReduxState } from "../types";

const oneMin = 60000;
const threeMin = 180000;
const fiveMin = 300000;

type ClockProps = {
    onHandleStartClick: () => void,
    onHandleStopClick: () => void,
    disableTimerBtn: boolean,
    onHandleComplete: () => void,
    startBtn: boolean,
    onHandleVolume: (target: HTMLInputElement) => void,
    volume: number,
    renderer: CountdownRendererFn,
    date: number,
}



const Clock = React.forwardRef(({ onHandleStartClick, onHandleStopClick, disableTimerBtn, onHandleComplete, startBtn, onHandleVolume, volume, renderer, date }: ClockProps, countdownRef: any) => {

    const dispatch = useDispatch();
    const rootState = useSelector((state: RootReduxState) => state)

    return (
        <aside className={styles.container}>
            <Countdown
                ref={countdownRef}
                date={date}
                daysInHours
                autoStart={false}
                renderer={renderer}
                onComplete={() => onHandleComplete()}
                controlled={false}
            // onStop={() => setTime(0)}
            />
            <section className={styles.timerButtons}>
                <section className={styles.timerButtonsLeft}>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(oneMin, false))}>-1</button>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(threeMin, false))}>-3</button>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(fiveMin, false))}>-5</button>
                </section>
                <section className={styles.timerButtonsRight}>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(oneMin, true))}>+1</button>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(threeMin, true))}>+3</button>
                    <button disabled={disableTimerBtn} onClick={() => dispatch(setTargetTime(fiveMin, true))}>+5</button>
                </section>
            </section>
            {startBtn ? <button className={styles.startStopBtn} onClick={() => rootState.timerReducer.time > 0 && onHandleStartClick()}>Start</button> : <button className={styles.startStopBtn} onClick={() => onHandleStopClick()}>Stop</button>}
            <label className={styles.volumeRange} htmlFor="volumeRange">Volume
                <input id="volumeRange" type="range" min={0} max={1} step={0.01} value={volume} onChange={({ target }) => onHandleVolume(target)} />
            </label>
        </aside>
    )

})

export default Clock;