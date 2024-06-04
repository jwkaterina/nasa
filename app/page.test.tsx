import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import MainSection from "./components/main-section";
import Gallery from "./components/gallery/gallery";
import fetchMedia from "./actions/fetch-media";
import fetchRange from "./actions/fetch-range";
import { dateString } from './utils';

jest.mock('./components/main-section');
jest.mock('./components/gallery');
jest.mock('./actions/fetch-media');
jest.mock('./actions/fetch-range');

describe('home', () => {

    it('should render page', async() => {
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
        expect(MainSection).toHaveBeenCalled();
        expect(Gallery).toHaveBeenCalled();
    });
})