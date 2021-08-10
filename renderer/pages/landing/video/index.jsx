import Image from '../../../components/Image/Image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, { useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { Footer } from '../../../components/Footer/Footer';
import { apiUrl, imgUrl } from '../../../config';
import styles from './VideoLanding.module.scss';
import Scroller from '../../../components/Scroller/Scroller';

export default function VideoLanding({data}){

	const [currentItemIndex, setCurrentItemIndex] = useState();
	const [accessibilityTimer, setAccessibilityTimer] = useState();
	const router = useRouter();

	function _getGeometricUrl(){
		switch(data.graphicStyle){
			case 'MountainOne': return '/images/geometric1.svg';
			case 'MountainTwo': return '/images/geometric2.svg';
			case 'MountainThree': return '/images/geometric3.svg';
			default: return '/images/geometric1.svg';
		}
	}

  function changeHighlight(step){
    if(typeof currentItemIndex !== 'number') {
      setCurrentItemIndex(0);
    } else {
      const newStep = currentItemIndex + step;
      if(newStep > -1 && newStep < videoData.length){
        setCurrentItemIndex(newStep);
      }
    }
    clearTimeout(accessibilityTimer); 
    setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
  }

  function goToCurrentHighlight(){
    if(videoData[currentItemIndex]){
      router.push(`/video-detail/${videoData[currentItemIndex].id}`)
    }
  }

  const videoData = data.videoListItems.map(i => i.videoView);

	return (
    <div className={styles.component}>
      <div className={styles.hero}>
        <div className={styles.image}>
          <Image
            loader={({ src }) => src}
            src={`${imgUrl}${data.image.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.title}>
          <h1>{data.title}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.scrollContainer}>
          <Scroller scrollToIndex={currentItemIndex}>
            <div className={styles.scrollContainer}>
              <div className={styles.list}>
                {videoData.map((video, idx) => (
                  <div key={video.id} className={`${styles.item} ${currentItemIndex === idx ? styles.isActive : ''}`} data-item-index={idx}>
                    <Link href={`/video-detail/${video.id}`} passHref>
                      <a>
                        <div className={styles.itemContainer}>
                          <div className={styles.thumbnail}>
                            <Image
                              loader={({ src }) => src}
                              src={`${imgUrl}${video.thumbnail.url}`}
                              layout="fill"
                              objectFit="cover"
                            />
                            <div className={styles.icon}>
                              <BsPlayFill />
                            </div>
                          </div>
                          <div className={styles.itemTitle}>{video.title}</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Scroller>
        </div>
      </div>
      <div
        className={styles.geometric}
        style={{ backgroundImage: `url(${_getGeometricUrl()})` }}
      />
      <Footer
        onHighlight={changeHighlight}
        onChooseHighlight={goToCurrentHighlight}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${apiUrl}/video-landing`);
  const data = await res.json();
  if (!data) return { notFound: true };
  return { props: { data } };
}