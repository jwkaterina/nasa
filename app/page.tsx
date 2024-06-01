'use client'

import fetchPhotos from "./actions/fetch-photos";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
    
    const [currentDate, setCurrentDate] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        calculateCurrentDate();
    }, []);

    useEffect(() => {

        const fetchPhoto = async() => {
            try {
                const photo = await fetchPhotos(currentDate);
                setUrl(photo.url);
            } 
            catch(err) {
                console.log(err);
            }
        }
        fetchPhoto();
    }, [currentDate]);

    const calculateCurrentDate = () => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
        const day = (new Date().getDate()).toString().padStart(2, "0");

        setCurrentDate(`${year}-${month}-${day}`);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setCurrentDate(e.target.value);
    }

    return (
        <>
        <div>
            <label>Choose Date</label>
            <input type='date' value={currentDate} onChange={handleDateChange}></input>
        </div>
        <div>{url ? <img
                className={styles.img}
                src={url}
                alt='nasa'
            /> : <p className={styles.img}>Opps, no image found</p>}</div> 
        </>
    );
}
