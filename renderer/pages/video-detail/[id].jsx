import React, { useEffect, useState } from "react";
import { apiUrl, imgUrl } from "../../config";
import styles from "./VideoDetail.module.scss";
import { Footer } from "../../components/Footer/Footer";
import Crumb from "../../components/Crumb/Crumb";
import QrDisplay from "../../components/QrDisplay/QrDisplay";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import {
  BsArrowLeft,
  BsArrowRight,
  BsPauseFill,
  BsPlayFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import Scroller from "../../components/Scroller/Scroller";

export default function VideoDetail({ data, allData }) {
  const [playing, setPlaying] = useState();
  const router = useRouter();

  const thisIndex = allData.findIndex((o) => o.id === data.id);

  function _getGraphicUrl() {
    return `/images/animals/${data.graphicStyle}.svg`;
  }

  function go(dir) {
    let newIndex;
    if (dir === "next") {
      newIndex = allData[thisIndex + 1] ? thisIndex + 1 : 0;
    } else if (dir === "prev") {
      newIndex = allData[thisIndex - 1] ? thisIndex - 1 : allData.length - 1;
    }
    router.replace(`/video-detail/${allData[newIndex].id}`);
  }

  const controls = (cn) => (
    <div className={`${styles.controls} ${cn}`}>
      <div className={styles.prev} onClick={() => go("prev")}>
        <BsArrowLeft />
        <span>Prev Video</span>
      </div>
      <div className={styles.playPause}>
        {!playing && (
          <div className={styles.play} onClick={() => setPlaying(true)}>
            <BsPlayFill />
          </div>
        )}
        {!!playing && (
          <div className={styles.pause} onClick={() => setPlaying(false)}>
            <BsPauseFill />
          </div>
        )}
      </div>
      <div className={styles.next} onClick={() => go("next")}>
        <BsArrowRight />
        <span>Next Video</span>
      </div>
    </div>
  );

  return (
    <div className={styles.component}>
      <div className={styles.hero}>
        <ReactPlayer
          url={`https://www.vimeo.com/${data.vimeoId}`}
          playing={playing}
          onPlay={() => setPlaying(true)}
          onProgress={() => window.interruptResetTimer()}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          config={{
            vimeo: {
              playerOptions: {
                byline: false,
                title: false,
                speed: false,
                controls: true,
              },
              iframeParams: { fullscreen: 0 },
            },
          }}
        />
      </div>
      {controls()}
      <div className={styles.content}>
        <Crumb section="Videos" title={data.title} />
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
          <Crumb section="Videos" title={data.title} />
        </div>
      </div>
      <div
        className={styles.geometric}
        style={{ backgroundImage: `url(${_getGraphicUrl()})` }}
      />
      {controls(styles.footer)}
    </div>
  );
}

export async function getStaticProps(context) {
  const allRes = await fetch(`${apiUrl}/video-views`);
  const allData = await allRes.json();
  const data = allData.find((o) => o.id === parseInt(context.params.id, 10));
  allData.sort((a, b) => a.id - b.id);
  if (!data) return { notFound: true };
  return {
    props: { data, allData },
    revalidate: process && process.env && process.env.IS_SERVER ? 1 : false, //if running on server
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${apiUrl}/video-views`);
  const data = await res.json();
  return {
    paths: data.map((o) => ({ params: { id: `${o.id}` } })),
    fallback: true,
  };
}
