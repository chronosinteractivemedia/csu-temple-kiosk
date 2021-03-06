import React, { useEffect, useState } from 'react';
import styles from './AttractLoops.module.scss';
import Image from '../Image/Image';
import { imgUrl } from '../../config';


export default function AttractLoops({screens}){
	const [currentScreen, setCurrentScreen] = useState();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentScreen(screens[currentIndex]);
		const interval = setInterval(() => {
			if(screens[currentIndex+1]){
				setCurrentIndex(currentIndex + 1);
			} else {
				setCurrentIndex(0);
			}
		},15000);
		return () => clearInterval(interval);
	}, [currentIndex]);

	if(!currentScreen) return null;

  return (
    <div className={styles.component}>
      <div className={styles.imageContainer}>
        <div className={styles.image} key={currentScreen.image.url}>
          <Image
            loader={({src}) => src}
            src={`${imgUrl}${currentScreen.image.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className={styles.geometric}
          style={{ backgroundImage: `url(/images/geometric2.svg)` }}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {!!currentScreen.largeQuote && (
            <h2 key={currentScreen.largeQuote}>{currentScreen.largeQuote}</h2>
          )}
          {!!currentScreen.smallQoute && (
            <p key={currentScreen.smallQoute}>{currentScreen.smallQoute}</p>
          )}
        </div>
        <ul className={styles.dots}>
          {screens.map((screen, index) => (
            <li
              key={index}
							onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${
                currentScreen.id === screen.id ? styles.isActive : ""
              }`}
            />
          ))}
        </ul>
      </div>
    </div>
  ); 
}