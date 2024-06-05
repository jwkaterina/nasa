import Image from 'next/image';
import { Media } from '../../types';
import styles from './gallery.module.css';
import { useContext } from 'react';
import { DateContext } from '../../date-context';

type ThumbnailProps = {
    media: Media, 
    widthHeight: string
}

const Thumbnail = ({media, widthHeight}: ThumbnailProps): JSX.Element  => {

    const { setCurrentDate } = useContext(DateContext);

    return (
        <div 
            className={styles.image_container} 
            style={{width: widthHeight, height: widthHeight}} 
            onClick={() => setCurrentDate(media.date)} >
            <Image 
                className={styles.thumbnail} 
                src={media.thumbnail_url!} 
                alt={media.title} 
                fill={true}/>
            <div className={styles.info}>{media.date}<br/>{media.title}</div>
        </div>
    )
}

export default Thumbnail;