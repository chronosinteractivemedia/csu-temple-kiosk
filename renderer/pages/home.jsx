import React from 'react';
import { apiUrl } from '../config';
import AttractLoops from '../components/AttractLoops/AttractLoops';

export default function Home({data}) {
  return (
    <>
      <AttractLoops screens={data.screens} />
    </>
  );
};

export async function getStaticProps(context){
  const res = await fetch(`${apiUrl}/attract-loops`);
  const data = await res.json();
  if(!data) return {notFound: true};
  return {
    props: {data}
  }
}
