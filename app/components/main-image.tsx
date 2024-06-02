import styles from './main-image.module.css';
import { Media } from '../types';
import { useEffect, useRef } from 'react';

type MainImageProps = {
    media: Media | null
}

const MainImage =  ({ media }: MainImageProps): JSX.Element => {

    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const options: KeyframeAnimationOptions  = {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        const keyframes: Keyframe[] = [
            { opacity: 0 },
            { opacity: 1 }
        ];

        if(!media || !imgRef.current) return;

        imgRef.current.animate(keyframes, options);

    }, [media]);

    if(!media) {
        return (
            <div className={styles.main_picture}>
                <div className={styles.loading_image}></div>
                <div className={styles.loading_description}>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.main_picture}>
            {media.media_type == 'image' ?
                <img
                    ref={imgRef}
                    className={styles.img}
                    src={media.url}
                    alt='nasa'
                /> : <></>}
            {media.media_type == 'video' ?
                <iframe className={styles.img}
                    src={`${media.url}&autoplay=1&mute=1`} allow='autoplay'>
                </iframe> : <></>}
            <div className={styles.description}>
                <p>{media.date}</p>
                <h3>{media.title}</h3>
                <p>{media.explanation}</p>
            </div>
        </div>
    );
}

export default MainImage;