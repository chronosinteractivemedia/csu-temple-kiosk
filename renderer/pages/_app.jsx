import App from "next/app";
import './global.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Nav from '../components/Nav/Nav';
import { apiUrl } from "../config";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function MyApp({Component, pageProps, menuItems}){
  const router = useRouter();
  useEffect(() => {
    window.interruptResetTimer = () => {
      if(window.resetTimer) clearTimeout(window.resetTimer);
      window.resetTimer = setTimeout(() => {
        router.push('/home');
      }, 30000);
    };
    document.addEventListener('touchstart', window.interruptResetTimer);
  }, []);
  return <>
    <Nav items={menuItems} />
    <Component {...pageProps} />
  </>
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const res = await fetch(`${apiUrl}/menu`);
  const data = await res.json();
  return { ...appProps,  menuItems: data.menuItems}
}