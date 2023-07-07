import React from 'react'
import styles from './player.module.css'


type PlayerProps = {
    video: string,
    onEnd: () => void,
    loopOn: boolean,
    isMuted: boolean,
}

const Player = React.forwardRef(({ video, onEnd, loopOn, isMuted }: PlayerProps, ref: any,) => {

    return (
        <div>
            <video
                ref={ref}
                className={styles.videoPlayer}
                id="video-player"
                muted={isMuted}
                loop={loopOn}
                onEnded={() => onEnd()}>
                <source src={video} type='video/webm' />
            </video>
        </div>
    )
})

export default Player;