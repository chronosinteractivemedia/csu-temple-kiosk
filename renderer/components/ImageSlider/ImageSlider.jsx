import React, { useEffect } from "react";
import Image from "../Image/Image";
import { imgUrl } from "../../config";
import styles from "./ImageSlider.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function ImageSlider({
  images,
  imageStyle,
  currentSlide,
  setCurrentSlide,
}) {
	useEffect(() => {
		if(currentSlide < 0){
			setCurrentSlide(images.length - 1);
		} else if(currentSlide >= images.length){
			setCurrentSlide(0);
		}
	}, [currentSlide])
  return (
    <div className={styles.component}>
			{(images.length > 1) && (<>
				<div className={styles.prev} onClick={() => setCurrentSlide(currentSlide - 1)}><BsChevronLeft /></div>
				<div className={styles.next} onClick={() => setCurrentSlide(currentSlide + 1)}><BsChevronRight /></div>
			</>)}
      <div className={styles.slider}>
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={`${styles.slide} ${
              currentSlide === idx ? styles.isActive : ""
            }`}
          >
            <div className={styles.slideWrapper}>
              <Image
                loader={({src}) => src}
                src={`${imgUrl}${img.url}`}
                layout="fill"
                objectFit={imageStyle}
                objectPosition={imageStyle === 'contain' ? '12vw bottom' : 'center center'}
              />
              {!!img.caption && (
                <div className={styles.desc}>{img.caption}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
