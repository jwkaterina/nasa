import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './main-section.module.css'

type MainImageProps = {
    url: string,
    title: string
}

const MainImage = ({ url, title }: MainImageProps) => {

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

        if(!imgRef.current) return;
        imgRef.current.animate(keyframes, options);
    }, [url]);
       

    return <Image
        ref={imgRef}
        className={styles.img}
        src={url}
        alt={title}
        width={400}
        height={400}
    />;
}

export default MainImage