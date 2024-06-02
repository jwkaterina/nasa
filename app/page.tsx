'use client'

import fetchMedia from "./actions/fetch-media";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import MainSection from "./components/main-section";
import Gallery from "./components/gallery";
import { Media } from './types';
import { dateString } from './utils';

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
            const newMediaArr = [];
            const date = new Date();
            let i = 1;
            while(i < 10) {
                date.setDate(date.getDate() - 1);
                try {
                    const mediaItem: Media = await fetchMedia(dateString(date));
                    newMediaArr.push(mediaItem);
                } 
                catch(err) {
                    console.log(err);
                    setError('Opps, no image found');
                }
                i++;
            }
            setLastMedia(newMediaArr);
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
        <>
            <div className={styles.date_form}>
                <label>Choose Date:</label>
                <input type='date' value={currentDate} onChange={handleDateChange} max={today}></input>
            </div>
            {!error ? 
                <div className={styles.image_container}>
                    <MainSection media={media}/>
                    <Gallery mediaArray={lastMedia}/>
                </div> : 
                <div className={styles.error}>{error}</div>
            }
        </>
    );
}
