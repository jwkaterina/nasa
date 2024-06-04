import Image from 'next/image';
import { Media } from '../../types';
import styles from './gallery.module.css';
import { DateContext } from '../../date-context';
import { useContext } from 'react';


type GalleryImgProps = {
    media: Media, 
    widthHeight: string
}

const GalleryImg = ({media, widthHeight}: GalleryImgProps): JSX.Element => {

    const { setCurrentDate } = useContext(DateContext);

    return (
        <div className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)} >
            <Image className={styles.img} src={media.url} alt={media.title} fill={true} />
            <div className={styles.info}>{media.date}<br/>{media.title}</div>
        </div>
    )
}

export default GalleryImg;