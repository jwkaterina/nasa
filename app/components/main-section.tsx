import styles from './main-section.module.css';
import commonStyles from '../page.module.css';
import { Media } from '../types';
import MainImage from './main-image';

type MainSectionProps = {
    media: Media | null
}

const MainSection =  ({ media }: MainSectionProps): JSX.Element => {

    if(!media) {
        return (
            <div className={styles.container}>
                <div className={styles.image_container}>
                    <div className={commonStyles.loading}></div>
                </div>
                <div className={styles.description}>
                    <div className={commonStyles.loading}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                {media.media_type == 'image' ?
                    <MainImage url={media.url} title={media.title}/> : <></>}
                {media.media_type == 'video' ?
                    <iframe className={styles.video}
                        src={`${media.url}&autoplay=1&mute=1`} allow='autoplay'>
                    </iframe> : <></>}
            </div>
            <div className={styles.description}>
                <p>{media.date}</p>
                <h3>{media.title}</h3>
                <p>{media.explanation}</p>
            </div>
        </div>
    );
}

export default MainSection;