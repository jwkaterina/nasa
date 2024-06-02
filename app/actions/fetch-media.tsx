'use server'

const fetchMedia = async(date: string) => {

    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        console.log(result);

        return result;
        
    } catch (err) {
        console.error(err);
        return err;
    }
};

export default fetchMedia;