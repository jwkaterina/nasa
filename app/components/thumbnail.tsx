import Image from 'next/image';
import styles from './gallery.module.css';
import { Media } from '../types';

const Thumbnail = ({media, widthHeight, setCurrentDate}: {media: Media, widthHeight: string, setCurrentDate: (date: string) => void})  => {
    return (
        <div className={styles.image_container} style={{width: widthHeight, height: widthHeight}} onClick={() => setCurrentDate(media.date)} >
            <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} fill={true}/>
            <div className={styles.info}>{media.date}<br/>{media.title}</div>
        </div>
    )
}

export default Thumbnail;