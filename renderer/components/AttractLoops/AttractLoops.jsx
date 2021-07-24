import React, { useEffect, useState } from 'react';
import styles from './AttractLoops.module.scss';
import Image from 'next/image';
import { imgUrl } from '../../config';

export default function AttractLoops({screens}){
	const [currentScreen, setCurrentScreen] = useState();
	useEffect(() => {
		let index = 0;

		setCurrentScreen(screens[index]);

		const interval = setInterval(() => {
			if(screens[index+1]){
				setCurrentScreen(screens[index+1]);
				index = index + 1;
			} else {
				index = 0;
				setCurrentScreen(screens[0]);
			}
		}, 10000);

		return () => {
			clearInterval(interval);
		}
	}, [screens])
	if(!currentScreen) return null;

  return <div className={styles.component}>
		<div className={styles.imageContainer}>
			<div className={styles.image}>
				<Image src={`${imgUrl}${currentScreen.image.url}`} layout="fill" objectFit="cover" />
			</div>
			<div className={styles.geometric} style={{backgroundImage: `url(/images/geometric2.svg)`}} />
		</div>
		<div className={styles.contentContainer}>
			<div className={styles.content}>
				{!!currentScreen.largeQuote && <h2>&ldquo;{currentScreen.largeQuote}</h2>}
				{!!currentScreen.smallQuote && <p>{currentScreen.smallQoute}&rdquo;</p>}
			</div>
			<ul className={styles.dots}>
				{screens.map((screen, index) => (
					<li key={index} className={`${styles.dot} ${currentScreen.id === screen.id ? styles.isActive : ''}`} />
				))}
			</ul>
		</div>
  </div> 
}