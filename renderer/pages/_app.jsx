import App from "next/app";
import './global.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Nav from '../components/Nav/Nav';
import { apiUrl } from "../config";
export default function MyApp({Component, pageProps, menuItems}){
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