import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'
import {BsPlayFill, BsPauseFill} from 'react-icons/bs';
import styles from './MediaHero.module.scss';
import ImageSlider from '../ImageSlider/ImageSlider';

export default function MediaHero({
  images,
  vimeoId,
  currentSlide,
  setCurrentSlide,
  playing,
  setPlaying,
}) {

  if (vimeoId)
    return (
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.video}>
            <ReactPlayer
              url={`https://www.vimeo.com/${vimeoId}`}
              playing={playing}
              controls={false}
              config={{
                vimeo: {
                  playerOptions: {
                    byline: false,
                    controls: false,
                    title: false,
                  },
                },
              }}
            />
          </div>
          <div className={styles.controls}>
            {!playing && <div className={styles.play} onClick={() => setPlaying(true)}><BsPlayFill /></div>}
            {!!playing && <div className={styles.pause} onClick={() => setPlaying(false)}><BsPauseFill /></div>}
          </div>
        </div>
      </div>
    );
  else if (images)
    return (
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.images}>
            <ImageSlider images={images} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
          </div>
        </div>
      </div>
    );
}