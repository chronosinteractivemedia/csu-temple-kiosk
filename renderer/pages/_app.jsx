import './global.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Nav from '../components/Nav/Nav';
export default function MyApp({Component, pageProps}){
  return <>
    <Nav />
    <Component {...pageProps} />
  </>
}
