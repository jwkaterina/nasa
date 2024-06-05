import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Thumbnail from './thumbnail';
import { DateContext } from '@/app/date-context';

describe('thumbnail', () => {

    it('should render thumbnail', async() => {
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
            <Thumbnail {...props} />
        </DateContext.Provider>);

        const imageContainer = container.querySelector('.image_container');

        await user.click(imageContainer!);
        expect(contextValue.setCurrentDate).toHaveBeenCalledWith(props.media.date);

        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    });
})