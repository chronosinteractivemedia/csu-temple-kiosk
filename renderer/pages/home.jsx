import React from 'react';
import { apiUrl } from '../config';
import AttractLoops from '../components/AttractLoops/AttractLoops';
import SecretClose from "../components/SecretClose/SecretClose";

const ipc = ipcRenderer || false;
export default function Home({data}) {
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
  return {
    props: {data}
  }
}
