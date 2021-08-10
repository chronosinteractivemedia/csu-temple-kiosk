import React, { useEffect, useState } from "react";
import MediaHero from "../../components/MediaHero/MediaHero";
import { apiUrl, imgUrl } from "../../config";
import styles from "./Detail.module.scss";
import ReactMarkdown from 'react-markdown'
import QrDisplay from "../../components/QrDisplay/QrDisplay";
import { Footer } from "../../components/Footer/Footer";
import Crumb from "../../components/Crumb/Crumb";
import Scroller from "../../components/Scroller/Scroller";

export default function DetailView({ data }) {

  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  function _getGraphicUrl() {
    return `/images/animals/${data.graphicStyle}.svg`;
  }

  const footer = () => {
      if(data.vimeoId){ 
        return <Footer playing={mediaPlaying} setPlaying={setMediaPlaying} />
      } else {
        if(data.images && data.images.length > 1){
          return <Footer currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        } else {
          return <Footer />
        }
      }
  };
  console.log(data.images.length)
  return (
    <div className={styles.component}>
      <div className={styles.hero}>
        {(data.images.length === 1 && !data.vimeoId) && <div className={styles.singleImage} style={{backgroundImage: `url(${imgUrl}${data.images[0].url})`}} />}
        {(data.images.length > 1 || data.vimeoId) && <MediaHero
          images={data.images && data.images.length ? data.images : false}
          imageStyle="contain"
          vimeoId={data.vimeoId}
          playing={mediaPlaying}
          setPlaying={setMediaPlaying}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />}
      </div>
      <div className={styles.content}>
        {!!data.section && <Crumb section={data.section} title={data.title} />}
        <div className={styles.layout}>
          <div className={`${styles.title} ${data.qrCode ? styles.short : ""}`}>
            <h2>{data.title}</h2>
          </div>
          <div
            className={`${styles.body} ${!data.qrUrl ? styles.loneBody : ""}`}
          >
            <Scroller>
              <div className={styles.bodyWrapper}>
                <ReactMarkdown children={data.body} />
              </div>
            </Scroller>
          </div>
          {!!data.qrUrl && (
            <div className={styles.qrCode}>
              {!!data.qrUrl && (
                <QrDisplay url={data.qrUrl} description={data.qrTitle} />
              )}
            </div>
          )}
        </div>
        <div className={styles.tail}>
          {!!data.section && (
            <Crumb section={data.section} title={data.title} />
          )}
        </div>
        <div
          className={styles.geometric}
          style={{ backgroundImage: `url(${_getGraphicUrl()})` }}
        />
      </div>
      {footer()}
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${apiUrl}/detail-views/${context.params.id}`);
  const data = await res.json();
  if (!data) return { notFound: true };
  return { props: { data } };
}

export async function getStaticPaths(){
  const res = await fetch(`${apiUrl}/detail-views`);
  const data = await res.json();
  return {
    paths: data.map(o => ({params: {id: `${o.id}`}})),
    fallback: false
  }
}