import React from 'react';
import styles from './GroupTabs.module.scss';

export default function GroupTabs({style, groups, currentGroup, setCurrentGroup}){
	return (
    <div className={styles.component} data-style={style}>
      <ul className={styles.tabs}>
        {groups.map((group, index) => (
          <li
            key={index}
            className={`${styles.tab}`}
            onclick={() => setCurrentGroup(group)}
          >
            {group.category}
          </li>
        ))}
      </ul>
    </div>
  );
}