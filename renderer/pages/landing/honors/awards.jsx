import Image from '../../../components/Image/Image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import { Footer } from '../../../components/Footer/Footer';
import Tabs from '../../../components/Tabs/Tabs';
import { apiUrl, imgUrl } from '../../../config';
import styles from './HonorsLanding.module.scss'

export default function HonorsLanding({data}){
  const [currentItemIndex, setCurrentItemIndex] = useState();
  const [accessibilityTimer, setAccessibilityTimer] = useState();
  const router = useRouter();
  const scrollParent = useRef();

  data.allAwards.sort((a,b) => b.year - a.year);
  const yearsWithDetails = data.allAwards.filter(o => !!o.detailView);

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
      if(newStep > -1 && newStep < yearsWithDetails.length){
        setCurrentItemIndex(newStep);
      }
    }
    clearTimeout(accessibilityTimer); 
    setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
  }

  function goToCurrentHighlight(){
    if(yearsWithDetails[currentItemIndex]){
      router.push(`/award-detail/${yearsWithDetails[currentItemIndex].detailView.id}`)
    }
  }

  useEffect(() => {
    const initialParams = new URLSearchParams(location.search);
    const initialScroll = parseInt(initialParams.get('scroll'), 10);
    const initialAdaItem = initialParams.has('ada') ? parseInt(initialParams.get('ada'), 10) : null;

    scrollParent.current.scrollTo(0, initialScroll);

    const scrollHandler = () => {
      const params = new URLSearchParams(location.search);
      params.set('scroll', scrollParent.current.scrollTop);
      router.replace(`${location.pathname}?${params}`, null, {shallow: true});
    }
    scrollParent.current.addEventListener('scroll', scrollHandler);

    if(initialAdaItem){
      setCurrentItemIndex(initialAdaItem);
      clearTimeout(accessibilityTimer); 
      setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
    }
  }, [scrollParent.current])

  useEffect(() => {
      const params = new URLSearchParams(location.search);
    if(currentItemIndex){
      const item = scrollParent.current.querySelectorAll('.detail-view')[currentItemIndex];
      scrollParent.current.scrollTo({top: item.offsetTop - item.offsetHeight - 100, left: 0, behavior: 'smooth'});
      params.set('ada', currentItemIndex);
    }
    else {
      scrollParent.current.scrollTo({top:0, left: 0, behavior: 'smooth'});
      params.delete('ada');
    }
    router.replace(`${location.pathname}?${params}`, null, {shallow: true})
  }, [currentItemIndex])

  let detailYearIndex = 0;
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
        <Tabs
          tabs={[
            {
              name: "Overview",
              isActive: false,
              fn: () => router.push("/landing/honors"),
            },
            { name: "Awards", isActive: true, fn: () => true },
          ]}
        />
      </div>
      <div className={styles.timeline}>
        <div className={styles.tlItems} ref={scrollParent}>
          {data.allAwards.map((award) => {
            if (award.detailView) {
              let isActive = detailYearIndex === currentItemIndex;
              detailYearIndex++;
              return (
                <Link href={`/award-detail/${award.detailView.id}?year=${award.year}`}>
                  <div
                    key={award.id}
                    className={`${styles.tlItem} ${styles.hasDetail} detail-view ${isActive ? styles.isActive : ''}`}
                  >
                    <div className={styles.tlYear}>{award.year}</div>
                    <div className={styles.tlSummary}>
                      <span>{award.title}</span>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <div key={award.id} className={styles.tlItem}>
                  <div className={styles.tlYear}>{award.year}</div>
                  <div className={styles.tlSummary}>
                    <span>{award.title}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={styles.tlControl}>
          <div
            className={styles.up}
            onClick={() => scrollParent.current.scrollBy(0, -795)}
          >
            <BsTriangleFill />
          </div>
          <div
            className={styles.down}
            onClick={() => scrollParent.current.scrollBy(0, 795)}
          >
            <BsTriangleFill />
          </div>
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