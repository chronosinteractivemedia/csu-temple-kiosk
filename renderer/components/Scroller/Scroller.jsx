import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import {MdDragHandle} from  'react-icons/md';
export default function Scroller({children}){
	const scrollParentRef = useRef();
	const scrollHandleRef = useRef();

	useEffect(() => {

		function handleDrag(e){

		}

		const handle = new Hammer(scrollHandleRef.current, myOptions);
		handle.on('pan', handleDrag);

		return () => {
			handle.off('pan', handleDrag);
		}
	}, [scrollParentRef.current, scrollHandleRef.current])

	return <div className={styles.component}>
		<div className={styles.container}>
			{children}
		</div>
		<div ref={scrollParentRef} className={styles.scroller}>
			<div ref={scrollHandleRef}> <MdDragHandle /> </div>
		</div>
	</div>
}