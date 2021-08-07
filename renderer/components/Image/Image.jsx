import React from 'react';
import styles from './Image.module.scss';

export default function Image({src}){
	return <div className={styles.component} style={{backgroundImage: `url(${src})`}} />
}