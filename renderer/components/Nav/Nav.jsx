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

  return (
    <>
      {isOpen && (
        <div className={styles.cover} onClick={() => setIsOpen(false)} />
      )}
      <div className={`${styles.component} ${isOpen ? styles.isOpen : ""}`}>
        <div className={styles.body}>
          <ul className={styles.items}>
            {items.map((item) => {
              if (item.listView) {
                return (
                  <>
                    <li>
                      <Link href={`/list/${item.listView.id}`} passHref>
                        <a>{item.title}</a>
                      </Link>
                    </li>
                  </>
                );
              } else {
                return (
                  <>
                    <li>
                      <Link href={item.path} passHref>
                        <a>{item.title}</a>
                      </Link>
                    </li>
                  </>
                );
              }
            })}
          </ul>
        </div>
        <div
          className={styles.head}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundImage: `url(/images/menutab${isOpen ? "close" : ""}.svg)`,
          }}
        ></div>
      </div>
    </>
  );
}

