import React from 'react';
import styles from "./Tabs.module.scss";

export default function Tabs({ tabs }) {
  return (
    <div className={styles.component}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            className={`${styles.tab} ${tab.isActive ? styles.isActive : ""}`}
            key={tab.name}
            onClick={tab.fn}
          >
            <span>{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}