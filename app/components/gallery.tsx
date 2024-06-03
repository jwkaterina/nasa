import styles from './gallery.module.css';
import { Media } from '../types';
import Image from 'next/image';

type GalleryProps = {
    mediaArray: Media[]
}

const Gallery = ({ mediaArray }: GalleryProps): JSX.Element => {

    const padding = 20;
    const widthHeight = `calc((100vw - 2 * ${padding}px) / 9)`;

    let imageArr: JSX.Element[] = [];
    
    if(mediaArray.length == 0) {
        for(let i = 1; i < 10; i++) {
            imageArr.push(<div key={i} className={styles.gallery_loading} style={{width: widthHeight, height: widthHeight}}></div>);
        }
    }

    if(mediaArray.length > 0) {
        imageArr = mediaArray.map((media) => {
            if(media.media_type == 'image') {
                return (
                <div style={{width: widthHeight, height: widthHeight, position: 'relative'}}>
                    <Image className={styles.img} src={media.url} key={media.title} alt={media.title} fill={true} />
                </div>
                )
            } else if(media.media_type == 'video') {
                return (
                <div style={{width: widthHeight, height: widthHeight, position: 'relative'}}>
                    <Image className={styles.thumbnail} src={media.thumbnail_url!} alt={media.title} key={media.title} fill={true}/>
                </div>
                )
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