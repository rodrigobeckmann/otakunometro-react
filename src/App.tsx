import { useState, useEffect } from 'react'
import Player from './player'
import React from 'react'
import { videos, colorBars } from './videosData'
import Clock from './timer'
import styles from './App.module.css'

const arraySize = videos.length;

const sortPlaylist = () => {
  videos.sort(() => (Math.random() > arraySize / 10) ? 1 : -1)
}

function App() {

  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(colorBars);
  const [loopOn, setLoopOn] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [ volume, setVolume ] = useState(0.10);

  const countdownRef = React.createRef<any>();
  const ref = React.createRef<any>();

  const onEnd = () => {
    if (index === arraySize - 1) {
      console.log('ssaa')
      setIndex(0)
      setVideo(videos[0])
    } else {
      console.log('ss')
      setIndex((index) => index + 1);
      setVideo(videos[index + 1])
    }

  }

  useEffect(() => {

    const newVideo = () => {
      ref.current.load();
      ref.current.play();
    }

    newVideo();

  }, [video])

  const startClock = (time: number) => {
    if (time > 0) {
      ref.current.volume = volume;
      sortPlaylist();
      setStartBtn(false)
      setDisableBtn(true);
      setLoopOn(false);
      setVideo(videos[0])
      countdownRef.current.start();
      ref.current.play();
    }
  }

  const stopClock = () => {
    setStartBtn(true)
    setLoopOn(true);
    countdownRef.current.stop();
    ref.current.pause();
    setVideo(colorBars)
  }

  const onHandleComplete = () => {
    setDisableBtn(false)
    stopClock();
  }

  const onHandleVolume = (target: HTMLInputElement) => {
    setVolume(parseFloat(target.value))
    ref.current.volume = target.value;
  }

  return (

    <main className={styles.container}>
      <Player
        isMuted={false}
        video={video}
        onEnd={onEnd}
        ref={ref}
        loopOn={loopOn}
      />
      <Clock
        ref={countdownRef}
        disableTimerBtn={disableBtn}
        onHandleComplete={onHandleComplete}
        onHandleStartClick={startClock}
        onHandleStopClick={stopClock}
        startBtn={startBtn}
        onHandleVolume={onHandleVolume}
        volume={volume}
      />
    </main>


  )
}

export default App
