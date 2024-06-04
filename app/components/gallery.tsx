import styles from './gallery.module.css';
import commonStyles from '../page.module.css';
import { Media } from '../types';
import Image from 'next/image';
import { useState, useEffect } from "react";
import calculateWidth from '../width-hook';

type GalleryProps = {
    mediaArray: Media[],
    setCurrentDate: (date: string) => void;
}

const Gallery = ({ mediaArray, setCurrentDate }: GalleryProps): JSX.Element => {

    const mediaArr1: Media[] = mediaArray.slice(0,4);
    const mediaArr2: Media[] = mediaArray.slice(4,8);

    const widthHeight = calculateWidth();

    let imageArr1: JSX.Element[] = [], imageArr2: JSX.Element[] = [];
    
    if(mediaArray.length == 0) {
        for(let i = 1; i < 5; i++) {
            imageArr1.push( 
            <div key={i} style={{width: widthHeight, height: widthHeight}}>
                <div className={commonStyles.loading}></div>
            </div>);
        }
        for(let i = 1; i < 5; i++) {
            imageArr2.push( <div key={i} style={{width: widthHeight, height: widthHeight}}>
                <div className={commonStyles.loading}></div>
            </div>);
        }
    }

    const Img = ({media}: {media: Media}) => {
        return (
            <div key={media.date} className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)} >
                <Image className={styles.img} src={media.url} alt={media.title} fill={true} />
                <div className={styles.info}>{media.date}<br/>{media.title}</div>
            </div>
        )
    }

    const Thumbnail = ({media}: {media: Media}) => {
        return (
            <div key={media.date} className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)} >
                <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
                <div className={styles.info}>{media.date}<br/>{media.title}</div>
            </div>
        )
    }

    if(mediaArray.length > 0) {
        imageArr1 = mediaArr1.map((media, i) => {
            if(media.media_type == 'image') {
                return <Img media={media}/>
            } else {
                return <Thumbnail media={media}/>
            }
        });
        imageArr2 = mediaArr2.map((media, i) => {
            if(media.media_type == 'image') {
                return <Img media={media}/>
            } else {
                return <Thumbnail media={media}/>
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

