import React, { useEffect, useRef, useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { BsPlayFill } from 'react-icons/bs';
import styles from './Scroller.module.scss'

export default function Scroller({ children, scrollToIndex }) {

	const scrollParentRef = useRef();
	const scrollBarRef = useRef();
	const scrollHandleRef = useRef();
	const [scrollPos, setScrollPos] = useState(0);
	const [hideScroller, setHideScroller] = useState(true);
	const lastPageY = useRef(null);

	function handleDrag(e){
		if(scrollBarRef.current && scrollHandleRef.current){
			const barHeight = scrollBarRef.current.offsetHeight;
			const handleHeight = scrollHandleRef.current.offsetHeight;
			let totalPossibleLength = barHeight - handleHeight;
			if(lastPageY.current){
				const delta = e.touches[0].clientY - lastPageY.current;
				const scrollY = totalPossibleLength * scrollPos;
				let newPos = scrollY + delta;
				newPos = Math.min(newPos, totalPossibleLength);
				newPos = Math.max(newPos, 0);
				if(scrollY !== newPos){
					lastPageY.current = e.touches[0].clientY;
				}
				setScrollPos(newPos / totalPossibleLength);
			} else {
				lastPageY.current = e.touches[0].clientY;
			}
		}
	}

	function getHandlePosition(){
		if(scrollBarRef.current && scrollHandleRef.current)	{
			let lengthAdjustmentFactor = 1 - (scrollHandleRef.current.offsetHeight / scrollBarRef.current.offsetHeight);
			return (scrollPos * 100 * lengthAdjustmentFactor);
		} else {
			return 0;
		}
	}

	useEffect(() => {
		const scrollListener = e => {
			const pos = e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight);
			if (pos !== scrollPos) setScrollPos(pos);
		};
		if(scrollParentRef.current){
			scrollParentRef.current.addEventListener('scroll', scrollListener);
			setTimeout(() => {
				if(scrollParentRef.current.offsetHeight >= scrollParentRef.current.scrollHeight){
					setHideScroller(true)
				} else {
					setHideScroller(false)
				}
			}, 500)
		}
	}, [scrollParentRef.current])

	useEffect(() => {
		if(scrollParentRef.current){
			const newPos = (scrollParentRef.current.scrollHeight - scrollParentRef.current.offsetHeight) * scrollPos;
			scrollParentRef.current.scrollTo(0, newPos);
		}
	}, [scrollPos]);

	useEffect(() => {
		let newScroll = 0;
		if(typeof scrollToIndex === 'number' && scrollParentRef.current){
			const indexItem = scrollParentRef.current.querySelector(`[data-item-index="${scrollToIndex}"]`);
			if(scrollToIndex === 0 || indexItem.offsetTop < 100){
				newScroll = 0;
			} else {
				if(indexItem){
					const offset = indexItem.offsetTop + indexItem.offsetHeight;
					const scrollPosition = offset / scrollParentRef.current.scrollHeight;
					newScroll = scrollPosition;
				}
			}
			const newPos = (scrollParentRef.current.scrollHeight - scrollParentRef.current.offsetHeight) * newScroll;
			scrollParentRef.current.scrollTo({top: newPos, left: 0, behavior: 'smooth'});
		}

	}, [scrollToIndex, scrollParentRef.current]);


	return <div className={styles.component}>
		<div className={`${styles.container} ${hideScroller ? styles.hide : ''}`} ref={scrollParentRef}>
			{children}
		</div>
		<div ref={scrollBarRef} className={`${styles.scroller} ${hideScroller ? styles.hide : ''}`} >
			<div 
				onTouchMove={handleDrag}
				onTouchStart={e => {lastPageY.current = e.touches[0].clientY}}
				className={styles.handle} 
				ref={scrollHandleRef} 
				style={{top: `${getHandlePosition()}%`}}
			> <MdDragHandle /> </div>
		</div>
		<div className={`${styles.arrows} ${hideScroller ? styles.hide : ''}`}>
			<div className={styles.up} onClick={() => scrollParentRef.current.scrollBy({left:0, top:-100, behavior: 'smooth'})}><BsPlayFill /></div>
			<div className={styles.down} onClick={() => scrollParentRef.current.scrollBy({left:0, top:100, behavior: 'smooth'})}><BsPlayFill /></div>
		</div>
	</div>
}