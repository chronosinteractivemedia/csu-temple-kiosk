import React from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import styles from './Footer.module.scss';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export function Footer({onHighlight, onChooseHighlight, playing, setPlaying, currentSlide, setCurrentSlide}){
	return (
    <div className={styles.component}>
      {!!onHighlight && !!onChooseHighlight && (
        <Sections
          onHighlight={onHighlight}
          onChooseHighlight={onChooseHighlight}
        />
      )}
			{!!setPlaying && <div className={styles.playControls}>
				{!playing && <div className={styles.play} onClick={() => setPlaying(true)}><BsPlayFill /></div>}
				{!!playing && <div className={styles.pause} onClick={() => setPlaying(false)}><BsPauseFill /></div>}
			</div>}
			{!!setCurrentSlide && <div className={styles.sliderControls}>
				<div className={styles.prev} onClick={() => setCurrentSlide(currentSlide - 1)}><BsChevronLeft /></div>
				<div className={styles.next} onClick={() => setCurrentSlide(currentSlide + 1)}><BsChevronRight /></div>
			</div>}
    </div>
  );
}


function Sections({onHighlight, onChooseHighlight}){
	return <div className={styles.sections}>
		<div className={styles.up} onClick={() => onHighlight(-1)}><BsPlayFill /></div>
		<div className={styles.select} onClick={onChooseHighlight}><span>Select</span></div>
		<div className={styles.down} onClick={() => onHighlight(1)}><BsPlayFill /></div>
	</div>
}