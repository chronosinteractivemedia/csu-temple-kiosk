
import Image from '../../../components/Image/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Footer } from '../../../components/Footer/Footer';
import { apiUrl, imgUrl } from '../../../config';
import styles from './PublicationsLanding.module.scss'
import _, { filter, groupBy, set } from 'lodash';
import { MdClose } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import Scroller from '../../../components/Scroller/Scroller';

export default function PublicationsLanding({data, pubsData}){
  const [currentItemIndex, setCurrentItemIndex] = useState();
  const [accessibilityTimer, setAccessibilityTimer] = useState();
  const [filters, setFilters] = useState({categories: [], topics: []})
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredPubs, setFilteredPubs] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const scrollParent = useRef();
  const router = useRouter();

	useEffect(() => {
		const categories = pubsData.reduce((reduced, pub) => {
			return _.unionBy(reduced, pub.categories, 'id');
		}, []);
		const topics = pubsData.reduce((reduced, pub) => {
			return _.unionBy(reduced, pub.topics, 'id');
		}, []);
		setCategories(categories);
		setTopics(topics);
		setFilters({
			categories: categories.map(o => o.id),
			topics: topics.map(o => o.id)
		});
	}, [pubsData])

	useEffect(() => {
		if(categories){
			let filtered = pubsData;
			let categoryFiltered = filtered.filter(o => {
				return o.categories.find(c => filters.categories.includes(c.id));
			});
			filtered = categoryFiltered.filter(o => {
				return o.topics.find(c => filters.topics.includes(c.id));
			});
			let grouped = categories.reduce((red, category) => {
				const items = filtered.filter(p => !!p.categories.find(c => c.id === category.id));
				if(items.length){
					red.push({
						name: category.title,
						items 
					});
				}
				return red;
			}, []);
			setFilteredPubs(grouped);
		}
	}, [pubsData, filters, categories])

  useEffect(() => {
    scrollParent.current.scrollTo(0, 0);
  }, [filteredPubs]);

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
      if(newStep > -1 && newStep < data.featuredPublications.length){
        setCurrentItemIndex(newStep);
      }
    }
    clearTimeout(accessibilityTimer); 
    setAccessibilityTimer(setTimeout(() => setCurrentItemIndex(null), 60000));
  }

  function goToCurrentHighlight(){
		const item = data.featuredPublications[currentItemIndex];
    if(item && item.detailView){
      router.push(`/pub-detail/${item.detailView.id}`)
    }
  }

	function toggleFilter(type, id){
		if(type === 'cat'){
			if(filters.categories.includes(id)){
				setFilters({...filters, categories: filters.categories.filter(o => o !== id)});
			} else {
				setFilters({...filters, categories: [...filters.categories, id]});
			}
		}
		else{
			if(filters.topics.includes(id)){
				setFilters({...filters, topics: filters.topics.filter(o => o !== id)});
			} else {
				setFilters({...filters, topics: [...filters.topics, id]});
			}
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
          <h1>Publications</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <ReactMarkdown children={data.introText} />
        </div>
        <div className={styles.highlights}>
          <div className={styles.hlList}>
            {data.featuredPublications.map((pub, idx) => (
              <div key={pub.id} className={styles.hlItem}>
                <Link href={`/pub-detail/${pub.detailView.id}`}>
                  <div
                    className={`${styles.hlImg} ${
                      currentItemIndex === idx ? styles.isActive : ""
                    }`}
                  >
                    <Image
                      loader={({ src }) => src}
                      src={`${imgUrl}${pub.detailView.thumbnail.url}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Link>
                <span className={styles.hlLink}>Learn more</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pubs}>
          <h2>Publications ({filteredPubs.reduce((red, pubGroup) => {
            return red + pubGroup.items.length;
          }, 0)})</h2>
          <div
            className={styles.filterToggle}
            onClick={() => setFiltersOpen(true)}
          >
            Open Filters to Sort List
          </div>
          <div className={styles.list} ref={scrollParent}>
            <Scroller>
              {filteredPubs.map((pubGroup) => (
                <div key={pubGroup.name} className={styles.pubGroup}>
                  <h3>{pubGroup.name} ({pubGroup.items.length})</h3>
                  {pubGroup.items.map((pub) => (
                    <div key={pub.id} className={styles.pubItem}>
                      <ReactMarkdown children={pub.body} />
                    </div>
                  ))}
                </div>
              ))}
            </Scroller>
          </div>
        </div>
      </div>
      <div
        className={styles.geometric}
        style={{ backgroundImage: `url(${_getGeometricUrl()})` }}
      />
      {!!filtersOpen && (
        <div className={styles.filters}>
          <div className={styles.filtersHead}>
            <h2>Filters</h2>
            <div
              className={styles.filtersClose}
              onClick={() => setFiltersOpen(false)}
            >
              close <MdClose />{" "}
            </div>
          </div>
          <div className={styles.filtersBody}>
            <div className={styles.cats}>
              <h3>Categories</h3>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.filter}>
                  <div
                    className={styles.checkbox}
                    data-checked={
                      filters.categories.includes(cat.id) ? "yes" : "no"
                    }
                    onClick={() => toggleFilter("cat", cat.id)}
                  >
                    {!!filters.categories.includes(cat.id) && <ImCheckmark />}
                  </div>
                  <span>{cat.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.topics}>
              <h3>Topics</h3>
              {topics.map((top) => (
                <div key={top.id} className={styles.filter}>
                  <div
                    className={styles.checkbox}
                    data-checked={
                      filters.topics.includes(top.id) ? "yes" : "no"
                    }
                    onClick={() => toggleFilter("top", top.id)}
                  >
                    {!!filters.topics.includes(top.id) && <ImCheckmark />}
                  </div>
                  <span>{top.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.apply} onClick={() => setFiltersOpen(false)}>
              Apply
            </div>
          </div>
        </div>
      )}
      <Footer
        setFiltersOpen={setFiltersOpen}
        filtersOpen={filtersOpen}
        onHighlight={changeHighlight}
        onChooseHighlight={goToCurrentHighlight}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${apiUrl}/publication-landing`);
  const data = await res.json();
  const pubsRes = await fetch(`${apiUrl}/publications?_limit=1000&_sort=id:ASC`);
  const pubsData = await pubsRes.json();
  if (!data) return { notFound: true };
  return { props: { data, pubsData } };
}