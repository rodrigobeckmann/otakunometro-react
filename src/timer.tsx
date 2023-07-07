import Countdown, {  CountdownRendererFn } from "react-countdown";
import { useState } from "react";
import styles from './timer.module.css'
import React from 'react'

const oneMin = 60000;
const threeMin = 180000;
const fiveMin = 300000;
const oneHour = 3600000 - oneMin;

type ClockProps = {
    onHandleStartClick: (time: number) => void,
    onHandleStopClick: () => void,
    disableTimerBtn: boolean,
    onHandleComplete: () => void,
    startBtn: boolean,
    onHandleVolume: (target: HTMLInputElement) => void,
    volume: number,
    renderer: CountdownRendererFn,
    date: number,
    newDate: () => void,
}



const Clock = React.forwardRef(({ onHandleStartClick, onHandleStopClick, disableTimerBtn, onHandleComplete, startBtn, onHandleVolume, volume, renderer, date, newDate }: ClockProps, countdownRef: any) => {

    const [time, setTime] = useState(0);

    return (
        <aside className={styles.container}>
            <Countdown
                ref={countdownRef}
                date={date + time}
                daysInHours
                autoStart={false}
                renderer={renderer}
                onComplete={() => onHandleComplete()}
                controlled={false}
                onStop={() => setTime(0)}
            />
            <section className={styles.timerButtons}>
                <section className={styles.timerButtonsLeft}>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < oneMin ? 0 : time - oneMin)} onMouseDown={newDate}>-1</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < threeMin ? 0 : time - threeMin)} onMouseDown={newDate}>-3</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < fiveMin ? 0 : time - fiveMin)} onMouseDown={newDate}>-5</button>
                </section>
                <section className={styles.timerButtonsRight}>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - oneMin ? oneHour : time + oneMin)} onMouseDown={newDate}>+1</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - threeMin ? oneHour : time + threeMin)} onMouseDown={newDate}>+3</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - fiveMin ? oneHour : time + fiveMin)} onMouseDown={newDate}>+5</button>
                </section>
            </section>
            {startBtn ? <button className={styles.startStopBtn} onClick={() => onHandleStartClick(time)}>Start</button> : <button className={styles.startStopBtn} onClick={() => onHandleStopClick()}>Stop</button>}
            <label className={styles.volumeRange} htmlFor="volumeRange">Volume
                <input id="volumeRange" type="range" min={0} max={1} step={0.01} value={volume} onChange={({ target }) => onHandleVolume(target)} />
            </label>
        </aside>
    )

})

export default Clock;