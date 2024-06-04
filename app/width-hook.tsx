import { useEffect, useState } from "react";

const useWidth = () => {

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

    return widthHeight;
};

export default useWidth;