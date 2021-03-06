import React from 'react';
import styles from './Crumb.module.scss';
import { useRouter } from 'next/router'

export default function Crumb({section, title, link}){
	const router = useRouter();
	return <div className={styles.component}>
		<span className={styles.section} onClick={() => router.back()}>{section}</span>
		{!!title && <span className={styles.seperate}>//</span>}
		{!!title && <span className={styles.title}>{title}</span>}
	</div>
}