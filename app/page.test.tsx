import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import MainSection from "./components/main-section/main-section";
import Gallery from "./components/gallery/gallery";
import { fetchMedia } from "./actions/fetch-media";
import { fetchRange } from "./actions/fetch-range";
import { dateString } from './utils';

jest.mock('./components/main-section/main-section');
jest.mock('./components/gallery/gallery');

jest.mock('./actions/fetch-media', () => ({
    fetchMedia: jest.fn()
}));
jest.mock('./actions/fetch-range', () => ({
    fetchRange: jest.fn()
}));

describe('home', () => {

    const mockedFetchMedia = fetchMedia as jest.Mock;
    const mockedFetchRange = fetchRange as jest.Mock;

    it('should render home', async() => {
        render(<Home/>);

        const label= screen.getByText(/choose date:/i)
        await waitFor(() => expect(label).toBeInTheDocument());

        const today = new Date();
        const todayString = dateString(today);
        const startDay = new Date();
        startDay.setDate(startDay.getDate() - 7);
        const startDayString = dateString(startDay);

        const date = screen.getByDisplayValue(todayString);
        expect(date).toBeInTheDocument();

        expect(fetchMedia).toHaveBeenCalledWith(todayString);
        expect(fetchRange).toHaveBeenCalledWith(startDayString, todayString);
    });

    it('should render an error', async() => {
        mockedFetchMedia.mockImplementationOnce(async() => {throw new Error});
        mockedFetchRange.mockImplementationOnce(async() => {throw new Error});

        render(<Home/>);

        const label= screen.getByText(/choose date:/i)
        await waitFor(() => expect(label).toBeInTheDocument());

        const errorElement = screen.getByText('Opps, no image found');
        expect(errorElement).toBeInTheDocument();
        
    });

    it('should render MainSection with media', async() => {
        const mockMediaData = {
            title: 'Mock Image Title',
            url: 'https://example.com/mock-image.jpg',
            media_type: 'image',
        };

        mockedFetchMedia.mockReturnValue(mockMediaData);

        render(<Home/>);

        const label= screen.getByText(/choose date:/i)
        await waitFor(() => expect(label).toBeInTheDocument());

        expect(MainSection).toHaveBeenCalledWith({media: mockMediaData}, {});

        const errorElement = screen.queryByText('Opps, no image found');
        expect(errorElement).not.toBeInTheDocument();
        
    });

    it('should render Gallery with media array', async() => {
        const mockMediaArray = [{
            title: 'Mock Image Title',
            url: 'https://example.com/mock-image.jpg',
            media_type: 'image',
        }];

        mockedFetchRange.mockReturnValue(mockMediaArray);

        render(<Home/>);

        const label= screen.getByText(/choose date:/i)
        await waitFor(() => expect(label).toBeInTheDocument());

        expect(Gallery).toHaveBeenCalledWith({mediaArray: mockMediaArray}, {});

        const errorElement = screen.queryByText('Opps, no image found');
        expect(errorElement).not.toBeInTheDocument();
        
    });
})