import React from 'react';
import { apiUrl } from '../config';
import AttractLoops from '../components/AttractLoops/AttractLoops';
import dynamic from 'next/dynamic';

export default function Home({data}) {
  let SecretClose;

  if(typeof window !== 'undefined' && window.process && window.process.type){ // Only load on electron
    SecretClose = dynamic(
      () => import('../components/SecretClose/SecretClose'),
      { ssr: false }
    )
  } else {
    SecretClose = () => null
  }

  return (
    <>
      <SecretClose />
      <AttractLoops screens={data.screens} />
    </>
  );
};

export async function getStaticProps(context){
  const res = await fetch(`${apiUrl}/attract-loops`);
  const data = await res.json();
  if(!data) return { notFound: true };
  console.log('\n\nHI!!!!!!!!!!!');
  console.log(process.env.IS_SERVER);
  if(process && process.env && process.env.IS_SERVER){
    console.log('ISR Enabled !!!!!!!!!!!!!!!!!!!!!!!');
  }
  return {
    props: {data},
    revalidate: (process && process.env && process.env.IS_SERVER) ? 10 : false //if running on server
  }
}
