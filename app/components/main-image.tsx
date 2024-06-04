import { useEffect, useRef } from 'react';
import Image from 'next/image';

type MainImageProps = {
    url: string,
    title: string
}

const MainImage = ({ url, title }: MainImageProps): JSX.Element => {

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
                src={url}
                alt={title}
                fill={true}
            />
}

export default MainImage