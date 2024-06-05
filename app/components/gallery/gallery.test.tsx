import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from './gallery';

jest.mock('../../width-hook', () => ({
    useWidth: jest.fn(() => '200px')
}));

describe('gallery', () => {

    it('should render gallery', async() => {
        const media = {
            date: '2024-06-04',
            explanation: 'explanation',
            media_type: 'video',
            title: 'title',
            url: '/url',
        }
        const props = {
            mediaArray: Array(8).fill(media)
        }

        render(<Gallery {...props} />);

        const imgs = screen.getAllByRole('img');
        expect(imgs).toHaveLength(8);
    });
})