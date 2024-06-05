'use server'

/**
 * @returns nasa images for a given range of dates
 */

export const fetchRange = async(startDate: string, endDate: string) => {

    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`;

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