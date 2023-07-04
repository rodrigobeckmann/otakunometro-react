import Countdown, { zeroPad } from "react-countdown";
import { useRef, useState } from "react";
import styles from './timer.module.css'
import React from 'react'

const oneMin = 60000;
const threeMin = 180000;
const fiveMin = 300000;


type RendererProps = {
    minutes: number,
    seconds: number,
}

type ClockProps = {
    onHandleStartClick: (time: number) => void,
    onHandleStopClick: () => void,
    disableTimerBtn: boolean,
    onHandleComplete: () => void,
}

const Clock = React.forwardRef(({onHandleStartClick, onHandleStopClick, disableTimerBtn, onHandleComplete}: ClockProps, countdownRef: any) => {

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
                    <button disabled={disableTimerBtn} onClick={() => setTime(time + oneMin)}>+1 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time + threeMin)}>+3 minuto</button>
                    <button disabled={disableTimerBtn} onClick={() => setTime(time + fiveMin)}>+5 minuto</button>
                </section>
            </section>
            <button onClick={() => onHandleStartClick(time)}>Start</button>
            <button onClick={() => onHandleStopClick()}>Stop</button>
        </aside>
    )

})

export default Clock;