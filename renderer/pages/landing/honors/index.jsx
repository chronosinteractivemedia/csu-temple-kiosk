import Image from '../../../components/Image/Image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Footer } from '../../../components/Footer/Footer';
import Tabs from '../../../components/Tabs/Tabs';
import { apiUrl, imgUrl } from '../../../config';
import styles from './HonorsLanding.module.scss'

export default function HonorsLanding({data}){
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
      if(newStep > -1 && newStep < data.featuredAwards.length){
        setCurrentItemIndex(newStep);
      }
    }
    clearTimeout(accessibilityTimer); 
    setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
  }

  function goToCurrentHighlight(){
    if(currentGroup.detailViews[currentItemIndex]){
      // router.push(`/detail/${currentGroup.detailViews[currentItemIndex].id}`)
    }
  }

	return (
    <div className={styles.component}>
      <div className={styles.hero}>
        <div className={styles.image}>
          <Image
            loader={({src}) => src}
            src={`${imgUrl}${data.image.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.title}>
          <h1>{data.title}</h1>
        </div>
      </div>
      <div className={styles.tabs}>
        <Tabs tabs={[
          {name: 'Overview', isActive: true, fn: () => true},
          {name: 'Awards', isActive: false, fn: () => router.push('/landing/honors/awards')}
        ]}/>
      </div>
      <div className={styles.highlights}>
        <div className={styles.highlightsHeading}>
          <h2>{data.featuredAwardsTitle}</h2>
          <p>{data.featuredAwardsDescription}</p>
        </div>
        <div className={styles.hlList}>
          {data.featuredAwards.map((award) => (
            <Link href={award.detailView ? `/award-detail/${award.detailView.id}?year=${award.year}` : '#'}><div key={award.id} className={styles.hlItem}>
              <div className={styles.hlWrap}>
                <div className={styles.hlYear}>{award.year}</div>
                <div className={styles.hlTitle}>{award.title}</div>
                {!!award.detailView && (
                  <div className={styles.hlExtra}> {award.detailView.preTitle} </div>
                )}
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.education}>
          <h3>Education</h3>
          <ReactMarkdown children={data.education} />
        </div>
        <div className={styles.memberships}>
          <h3>Professional Memberships</h3>
          <ReactMarkdown children={data.professionalMemberships} />
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
  const res = await fetch(`${apiUrl}/honors`);
  const data = await res.json();
  if (!data) return { notFound: true };
  return { props: { data } };
}