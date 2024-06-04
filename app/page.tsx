'use client'

import { ChangeEvent, useEffect, useState } from "react";
import MainSection from "./components/main-section";
import Gallery from "./components/gallery";
import { Media } from './types';
import { dateString } from './utils';
import { DateContext } from "./date-context";
import fetchMedia from "./actions/fetch-media";
import fetchRange from "./actions/fetch-range";
import styles from "./page.module.css";

export default function Home(): JSX.Element {
    
    const [today, setToday] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [media, setMedia] = useState<Media | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastMedia, setLastMedia] = useState<Media[]>([]);

    useEffect(() => {
        const today = dateString(new Date());
        setToday(today);
        setCurrentDate(today);

        const fetchLast = async() => {
            const startDay = new Date();
            startDay.setDate(startDay.getDate() - 7);

            try {
                const mediaItems: Media[] = await fetchRange(dateString(startDay), today);
                setLastMedia(mediaItems);
            } 
            catch(err) {
                console.log(err);
                setError('Opps, no image found');
            }
        }
        fetchLast();
    }, []);

    useEffect(() => {

        const fetchCurrent = async() => {
            try {
                const mediaItem: Media = await fetchMedia(currentDate);
                setMedia(mediaItem);
            } 
            catch(err) {
                console.log(err);
                setError('Opps, no image found');
            }
        }
        fetchCurrent();
    }, [currentDate]);

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentDate(e.target.value);
    }


    return (
        <div className={styles.container}>
            <DateContext.Provider value={{
                currentDate,
                setCurrentDate
            }}>
                <div className={styles.date_form}>
                    <label>Choose Date:</label>
                    <input type='date' value={currentDate} onChange={handleDateChange} max={today}></input>
                </div>
                {!error ? 
                    <div>
                        <MainSection media={media}/>
                        <Gallery mediaArray={lastMedia}/>
                    </div> : 
                    <div className={styles.error}>{error}</div>
                }
            </DateContext.Provider>
        </div>
    );
}
