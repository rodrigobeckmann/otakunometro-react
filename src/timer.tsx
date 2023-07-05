import Countdown, { zeroPad } from "react-countdown";
import { useState } from "react";
import styles from './timer.module.css'
import React from 'react'
import { CircularInput, CircularTrack, CircularProgress, CircularThumb } from 'react-circular-input'

const oneMin = 60000;
const threeMin = 180000;
const fiveMin = 300000;
const oneHour = 3600000 - oneMin;


type RendererProps = {
    minutes: number,
    seconds: number,
}

type ClockProps = {
    onHandleStartClick: (time: number) => void,
    onHandleStopClick: () => void,
    disableTimerBtn: boolean,
    onHandleComplete: () => void,
    startBtn: boolean,
    onHandleVolume: (target: HTMLInputElement) => void,
    volume: number,
}

const Clock = React.forwardRef(({ onHandleStartClick, onHandleStopClick, disableTimerBtn, onHandleComplete, startBtn, onHandleVolume, volume }: ClockProps, countdownRef: any) => {

    const [time, setTime] = useState(0);

    const renderer = ({ minutes, seconds }: RendererProps) => (
        <span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
    )

    return (
        <aside className={styles.container}>
            <Countdown
                ref={countdownRef}
                date={Date.now() + time}
                daysInHours
                autoStart={false}
                renderer={renderer}
                onComplete={() => onHandleComplete()}
                controlled={false}
                onStop={() => setTime(0)}
            />
            <section className={styles.timerButtons}>
                <section className={styles.timerButtonsLeft}>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < oneMin ? 0 : time - oneMin)}>-1 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < threeMin ? 0 : time - threeMin)}>-3 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time < fiveMin ? 0 : time - fiveMin)}>-5 minuto</button>
                </section>
                <section className={styles.timerButtonsRight}>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - oneMin ? oneHour : time + oneMin)}>+1 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - threeMin ? oneHour : time + threeMin)}>+3 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time >= oneHour - fiveMin ? oneHour : time + fiveMin)}>+5 minuto</button>
                </section>
            </section>
            {startBtn ? <button onClick={() => onHandleStartClick(time)}>Start</button> : <button onClick={() => onHandleStopClick()}>Stop</button>}
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={({ target }) => onHandleVolume(target)} />
        </aside>
    )

})

export default Clock;