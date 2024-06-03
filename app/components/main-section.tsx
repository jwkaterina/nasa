import styles from './main-section.module.css';
import { Media } from '../types';
import MainImage from './main-image';

type MainSectionProps = {
    media: Media | null
}

const MainSection =  ({ media }: MainSectionProps): JSX.Element => {

    if(!media) {
        return (
            <div className={styles.main_picture}>
                <div className={styles.img}>
                    <div className={styles.loading}></div>
                </div>
                <div className={styles.description}>
                    <div className={styles.loading}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.main_picture}>
            {media.media_type == 'image' ?
                <MainImage url={media.url} title={media.title}/> : <></>}
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

export default MainSection;