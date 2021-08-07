import React, { useEffect } from 'react';
import styles from './ViewsList.module.scss';
import Image from '../Image/Image';
import Link from 'next/link';
import { imgUrl } from '../../config';
import TextTruncate from 'react-text-truncate';

export default function ViewsList({heading, description, items, currentItemIndex}){
  return (
    <div className={styles.component}>
      <div className={styles.heading}>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.list}>
        <ul className={styles.items}>
          {items.map((item, idx) => (
            <Link href={`/detail/${item.id}`} passHref>
              <a>
                <li
                  className={`${styles.item} ${
                    currentItemIndex === idx ? styles.isActive : ""
                  }`}
                >
                  <div className={styles.image}>
                    {item.thumbnail && (
                      <Image
                        loader={({ src }) => src}
                        src={`${imgUrl}${item.thumbnail.url}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className={styles.summary}>
                    <h3>{item.title}</h3>
                    <p>
                      <TextTruncate line={3} text={item.summary} />
                    </p>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  ); 
}