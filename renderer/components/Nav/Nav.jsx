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
        <li><Link href="/home" passHref><a>Home</a></Link></li>
        <li><Link href="/list/5" passHref><a>Autism</a></Link></li>
        <li><Link href="/list/3" passHref><a>Biography</a></Link></li>
        <li><Link href="/list/6" passHref><a>Tg Equine Center</a></Link></li>
        <li><Link href="/landing/video" passHref><a>Videos</a></Link></li>
        <li><Link href="/landing/publications" passHref><a>Publications</a></Link></li>
        <li><Link href="/landing/honors" passHref><a>Honors</a></Link></li>
      </ul>
    </div>
    <div className={styles.head} onClick={() => setIsOpen(!isOpen)} style={{backgroundImage: `url(/images/menutab${isOpen ? 'close' : ''}.svg)`}}></div>
  </div>
}

