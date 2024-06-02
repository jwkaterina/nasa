'use client'

import fetchMedia from "./actions/fetch-media";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import MainImage from "./components/main-image";
import { Media } from './types';

export default function Home(): JSX.Element {
    
    const [today, setToday] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [media, setMedia] = useState<Media | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        calculateToday();
    }, []);

    useEffect(() => {

        const fetch = async() => {
            try {
                const mediaItem = await fetchMedia(currentDate);
                setMedia(mediaItem);
            } 
            catch(err) {
                console.log(err);
                setError('Opps, no image found');
            }
        }
        fetch();
    }, [currentDate]);

    const calculateToday = () => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
        const day = (new Date().getDate()).toString().padStart(2, "0");

        const now = `${year}-${month}-${day}`;
        setToday(now);
        setCurrentDate(now);
    };

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
                <MainImage media={media}/>
                <div className={styles.gallery}>
                </div>
            </div> : 
            <div className={styles.error}>{error}</div>}
        </>
    );
}
