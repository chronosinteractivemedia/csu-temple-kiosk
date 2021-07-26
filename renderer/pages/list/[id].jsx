import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GroupTabs from '../../components/GroupTabs/GroupTabs';
import ViewsList from '../../components/ViewsList/ViewsList';
import { imgUrl } from '../../config';
import { apiUrl } from '../../config';
import styles from './List.module.scss';
import ReactMarkdown from 'react-markdown';
import { Footer } from '../../components/Footer/Footer';
import {useRouter} from 'next/router';

export default function ListView({data}){
	const [currentGroup, setCurrentGroup] = useState();
  const [currentItemIndex, setCurrentItemIndex] = useState();
  const [accessibilityTimer, setAccessibilityTimer] = useState();
  const router = useRouter();
	useEffect(() => {
		if(data && data.listItems && Array.isArray(data.listItems)){
			setCurrentGroup(data.listItems[0]);
		}
	}, [data]);

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
      if(newStep > -1 && newStep < currentGroup.detailViews.length){
        setCurrentItemIndex(newStep);
      }
    }
    clearTimeout(accessibilityTimer); 
    setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
  }

  function goToCurrentHighlight(){
    if(currentGroup.detailViews[currentItemIndex]){
      router.push(`/detail/${currentGroup.detailViews[currentItemIndex].id}`)
    }
  }

	return (
    <div className={styles.component}>
      <div className={styles.hero}>
        <div className={styles.image}>
          <Image
            src={`${imgUrl}${data.image.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.title}>
          <h1>{data.section}</h1>
        </div>
      </div>
      {data.listItems && data.listItems.length > 1 && (
        <div className={styles.tabs}>
          <GroupTabs
            groups={data.listItems}
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.heading}>
          {!! currentGroup && <>
            {!!currentGroup.category && <h2 className={styles.summaryHead}>{currentGroup.category}</h2>}
            <ReactMarkdown children={currentGroup.summary} />
          </>}
        </div>
        {!!currentGroup && (
          <div className={styles.list}>
            <ViewsList
              items={currentGroup.detailViews}
              currentItemIndex={currentItemIndex}
            />
          </div>
        )}
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

export async function getStaticProps(context){
  const res = await fetch(`${apiUrl}/list-views/${context.params.id}`);
  const data = await res.json();
  if(!data) return {notFound: true};
  return { props: {data} }
}

export async function getStaticPaths(){
  const res = await fetch(`${apiUrl}/list-views`);
  const data = await res.json();
  return {
    paths: data.map(o => ({params: {id: `${o.id}`}})),
    fallback: false
  }
}