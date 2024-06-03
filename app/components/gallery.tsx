import styles from './gallery.module.css';
import { Media } from '../types';
import Image from 'next/image';

type GalleryProps = {
    mediaArray: Media[],
    setCurrentDate: (date: string) => void;
}

const Gallery = ({ mediaArray, setCurrentDate }: GalleryProps): JSX.Element => {

    let mediaQuery1000: MediaQueryList | null = null;
    if(typeof window !== 'undefined') {
        mediaQuery1000 = window.matchMedia('(max-width: 1000px)');
    }

    let widthHeight: string;
    const padding = 20;
    if(mediaQuery1000 && (mediaQuery1000 as MediaQueryList).matches) {
        widthHeight = `calc((100vw - 2 * ${padding}px) / 4)`;
    } else {
        widthHeight = `calc((100vw - 2 * ${padding}px) / 8)`;
    }
    console.log(widthHeight);
    let imageArr1: JSX.Element[] = [], imageArr2: JSX.Element[] = [];
    
    if(mediaArray.length == 0) {
        for(let i = 1; i < 5; i++) {
            imageArr1.push(<div key={i} className={styles.gallery_loading} style={{width: widthHeight, height: widthHeight}}></div>);
        }
        for(let i = 1; i < 5; i++) {
            imageArr2.push(<div key={i} className={styles.gallery_loading} style={{width: widthHeight, height: widthHeight}}></div>);
        }
    }

    if(mediaArray.length > 0) {
        imageArr1 = mediaArray.map((media, i) => {
            if(media.media_type == 'image' && i < 4) {
                return (
                <div key={media.date} style={{width: widthHeight, height: widthHeight, position: 'relative'}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.img} src={media.url} alt={media.title} fill={true} />
                </div>
                )
            } else if(media.media_type == 'video' && i < 4) {
                return (
                <div key={media.date} style={{width: widthHeight, height: widthHeight, position: 'relative'}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
                    </div>
                )
            } else {
                return <></>;
            }
        });
        imageArr2 = mediaArray.map((media, i) => {
            if(media.media_type == 'image' && i >= 4 && i < 9) {
                return (
                <div key={media.date} style={{width: widthHeight, height: widthHeight, position: 'relative'}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.img} src={media.url} alt={media.title} fill={true} />
                </div>
                )
            } else if(media.media_type == 'video' && i >= 4 && i < 9) {
                return (
                <div key={media.date} style={{width: widthHeight, height: widthHeight, position: 'relative'}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
                    </div>
                )
            } else {
                return <></>;
            }
        });
    }

    return (
        <div className={styles.gallery_container}>
            <div className={styles.images1}>
                {imageArr1}
            </div>
            <div className={styles.images2}>
                {imageArr2}
            </div>
        </div>
    )
};

export default Gallery;