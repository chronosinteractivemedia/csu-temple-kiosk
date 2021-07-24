import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Nav.module.scss';
export default function Nav({items}){
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsOpen(false);
    })
  }, []);

  return <div className={`${styles.component} ${isOpen ? styles.isOpen : ''}`}>
    <div className={styles.body}>
      <ul className={styles.items}>
        <li><Link href="/list/5" passHref><a>Autism</a></Link></li>
      </ul>
    </div>
    <div className={styles.head} onClick={() => setIsOpen(!isOpen)}style={{backgroundImage: `url(/images/menutab${isOpen ? 'close' : ''}.svg)`}}></div>
  </div>
}

