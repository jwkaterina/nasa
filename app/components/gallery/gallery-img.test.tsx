import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import GalleryImg from './gallery-img';
import { DateContext } from '@/app/date-context';

describe('gallery-img', () => {

    it('should render gallery image', async() => {
        const props = {
            media: {
                date: '2024-06-04',
                explanation: 'explanation',
                media_type: 'video',
                title: 'title',
                url: '/url',
            },
            widthHeight: '100'
        }

        const currentDate = '2024-06-05';
        const contextValue = {
            currentDate,
            setCurrentDate: jest.fn()
        }

        const { container } = render(   
        <DateContext.Provider value={contextValue}>
            <GalleryImg {...props} />
        </DateContext.Provider>);

        const imageContainer = container.querySelector('.image_container');

        await user.click(imageContainer!);
        expect(contextValue.setCurrentDate).toHaveBeenCalledWith(props.media.date);

        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    });
})