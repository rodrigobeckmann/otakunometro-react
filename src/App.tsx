import { useState, useEffect } from 'react'
import Player from './player'
import React from 'react'
import { videos, colorBars } from './videosData'
import Clock from './timer'
import styles from './App.module.css'
import Swal from 'sweetalert2'
import { zeroPad } from "react-countdown";
import sound from './assets/alert.mp3'

type RendererProps = {
  minutes: number,
  seconds: number,
}

const arraySize = videos.length;

const sortPlaylist = (playList: string[]) => {
  for (let i = playList.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = playList[i];
    playList[i] = playList[j];
    playList[j] = temp;
  }
}


const fixedDate = new Date();

function App() {

  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(colorBars);
  const [loopOn, setLoopOn] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [volume, setVolume] = useState(0.10);
  const [startDate, setStartDate] = useState<number>(Date.now());

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
      setStartDate(Date.now())
      ref.current.volume = volume;
      sortPlaylist(videos);
      setStartBtn(false)
      setDisableBtn(true);
      setLoopOn(false);
      setVideo(videos[0])
      countdownRef.current.start();
      ref.current.play();
    }
  }

  useEffect(() => {
    fixedDate.setTime(startDate)
    console.log(fixedDate)
  },)


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
    new Audio(sound).play()
    Swal.fire({
      title: 'Fim do seu intervalo',
      text: 'Volte a ser produtivo',
      allowOutsideClick: true,
      timer: 13000,
      showConfirmButton: false,
      timerProgressBar: true,
    })
  }

  const onHandleVolume = (target: HTMLInputElement) => {
    setVolume(parseFloat(target.value))
    ref.current.volume = target.value;
  }

  const renderer = ({ minutes, seconds }: RendererProps) => {

    return (
      <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
    )
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
        renderer={renderer}
        date={startDate}
        newDate={() => setStartDate(Date.now())}
      />
    </main>


  )
}

export default App
