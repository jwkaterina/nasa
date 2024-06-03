import styles from './gallery.module.css';
import { Media } from '../types';
import Image from 'next/image';

type GalleryProps = {
    mediaArray: Media[]
}

const Gallery = ({ mediaArray }: GalleryProps): JSX.Element => {

    let imageArr: JSX.Element[] = [];
    
    if(mediaArray.length == 0) {
        for(let i = 1; i < 10; i++) {
            imageArr.push(<div key={i} className={styles.gallery_loading}></div>);
        }
    }

    if(mediaArray.length > 0) {
        imageArr = mediaArray.map((media) => {
            if(media.media_type == 'image') {
                return <Image className={styles.img} src={media.url} key={media.title} alt={media.title} width={150} height={150}/>
            } else if(media.media_type == 'video') {
                return <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} key={media.title} width={150} height={150}/>
            } else {
                return <></>;
            }
        });
    }

    return (
        <div className={styles.gallery_container}>
            {imageArr}
        </div>
    )
};

export default Gallery;