import styles from './gallery.module.css';
import commonStyles from '../page.module.css';
import { Media } from '../types';
import Image from 'next/image';
import { useState, useEffect } from "react";

type GalleryProps = {
    mediaArray: Media[],
    setCurrentDate: (date: string) => void;
}

const Gallery = ({ mediaArray, setCurrentDate }: GalleryProps): JSX.Element => {

    const mediaArr1: Media[] = [];
    for(let i = 0; i < 4; i++) {
        mediaArr1.push(mediaArray[i])
    }
    const mediaArr2: Media[] = [];
    for(let i = 4; i < 8; i++) {
        mediaArr2.push(mediaArray[i])
    }

    const [mediaQuery1000, setMediaQuery1000] = useState<MediaQueryList | null>(null);

    useEffect(() => {
        setMediaQuery1000(window.matchMedia('(max-width: 1000px)'));
    }, []);

    let widthHeight: string;
    const padding = 20;
    if(mediaQuery1000 && (mediaQuery1000 as MediaQueryList).matches) {
        widthHeight = `calc((100vw - 2 * ${padding}px) / 4)`;
    } else {
        widthHeight = `calc((100vw - 2 * ${padding}px) / 8)`;
    }
    let imageArr1: JSX.Element[] = [], imageArr2: JSX.Element[] = [];
    
    if(mediaArray.length == 0) {
        for(let i = 1; i < 5; i++) {
            imageArr1.push( 
            <div key={i} style={{width: widthHeight, height: widthHeight}}>
                <div className={commonStyles.loading}></div>
            </div>);
        }
        for(let i = 1; i < 5; i++) {
            imageArr2.push(<div key={i} className={commonStyles.loading} style={{width: widthHeight, height: widthHeight}}></div>);
        }
    }

    if(mediaArray.length > 0) {
        imageArr1 = mediaArr1.map((media, i) => {
            if(media.media_type == 'image') {
                return (
                    <div className={styles.image_container} key={i} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)}>
                        <Image  className={styles.img} src={media.url} alt={media.title} fill={true} />
                    </div>
                    )
            } else {
                return (
                    <div key={i} className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)}>
                        <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
                    </div>
                    )
            }
        });
        imageArr2 = mediaArr2.map((media, i) => {
            if(media.media_type == 'image') {
                return (
                <div key={i} className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.img} src={media.url} alt={media.title} fill={true} />
                </div>
                )
            } else {
                return (
                <div key={i} className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)}>
                    <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
                    </div>
                )
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