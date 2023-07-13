import { useState, useEffect } from 'react'
import Player from './components/player'
import React from 'react'
import Clock from './components/timer'
import styles from './App.module.css'
import Swal from 'sweetalert2'
import { zeroPad } from "react-countdown";
import sound from './assets/alert.mp3'
import { createArrayOfVideos, sortPlaylist } from './services/videos'
import { colorBars } from './services/videos'
import { useSelector, useDispatch } from 'react-redux'
import { RootReduxState } from './types'
import { setTargetTime } from './redux/actions'

type RendererProps = {
  minutes: number,
  seconds: number,
}

const finish = new Audio(sound);


function App() {

  const [index, setIndex] = useState(0);
  const [videos, setVideos] = useState<string[]>([])
  const [video, setVideo] = useState(colorBars);
  const [loopOn, setLoopOn] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [volume, setVolume] = useState(0.10);

  const dispatch = useDispatch();

  const rootState = useSelector((state: RootReduxState) => state)

  const countdownRef = React.createRef<any>();
  const ref = React.createRef<any>();

  const onEnd = () => {
    if (index === videos.length - 1) {
      setIndex(0)
      setVideo(videos[0])
    } else {
      setIndex((index) => index + 1);
      setVideo(videos[index + 1])
    }

  }

  useEffect(() => {
    const listVideos = async () => {
      const arrayOfVideos = await createArrayOfVideos();
      setVideos(arrayOfVideos);
    }
    listVideos();
  }, [])

  useEffect(() => {

    const newVideo = () => {
      ref.current.load();
      ref.current.play();
    }

    newVideo();

  }, [video])

  const startClock = () => {
    // setStartDate(rootState.countdownSetTime)
    ref.current.volume = volume;
    sortPlaylist(videos);
    setStartBtn(false)
    setDisableBtn(true);
    setLoopOn(false);
    setVideo(videos[0])
    countdownRef.current.start();
    ref.current.play();
  }

  const stopClock = () => {
    setStartBtn(true)
    setLoopOn(true);
    countdownRef.current.stop();
    ref.current.pause();
    setVideo(colorBars)
    dispatch(setTargetTime(rootState.timerReducer.time, false))
  }

  const onHandleComplete = () => {
    setDisableBtn(false)
    stopClock();
    finish.load();
    finish.play();
    Swal.fire({
      title: 'Fim do seu intervalo',
      text: 'Volte a ser produtivo',
      allowOutsideClick: true,
      timer: 13000,
      showConfirmButton: false,
      timerProgressBar: true,
      didClose: () => finish.pause(),
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
        date={rootState.timerReducer.countdownSetTime}
      />
    </main>


  )
}

export default App
