import Thumbnail from './thumbnail';
import GalleryImg from './gallery-img';
import { Media } from '../../types'
import useWidth from '../../width-hook';
import commonStyles from '../../page.module.css';
import styles from './gallery.module.css';

type GalleryProps = {
    mediaArray: Media[]
}

const Gallery = ({ mediaArray}: GalleryProps): JSX.Element => {

    const mediaArr1: Media[] = mediaArray.slice(0,4);
    const mediaArr2: Media[] = mediaArray.slice(4,8);

    const widthHeight: string = useWidth(); 

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

    if(mediaArray.length > 0) {
        imageArr1 = mediaArr1.map((media, i) => {
            if(media.media_type == 'image') {
                return <GalleryImg media={media} key={i} widthHeight={widthHeight}/>
            } else {
                return <Thumbnail media={media} key={i} widthHeight={widthHeight}/>
            }
        });
        imageArr2 = mediaArr2.map((media, i) => {
            if(media.media_type == 'image') {
                return <GalleryImg media={media} key={i} widthHeight={widthHeight}/>
            } else {
                return <Thumbnail media={media} key={i} widthHeight={widthHeight}/>
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


