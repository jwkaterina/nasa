import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainSection from './main-section';
import MainImage from './main-image';

jest.mock('./main-image');

describe('main-section', () => {

    it('should render main section without image', async() => {
        const props = {
            media: null
        }
        render(<MainSection {...props} />);

        expect(MainImage).not.toHaveBeenCalled();
    });

    it('should render main section with video', async() => {
        const props = {
            media: {
                date: '2024-06-04',
                explanation: 'explanation',
                media_type: 'video',
                title: 'title',
                url: 'url',
            }
        }
        const {container} = render(<MainSection {...props} />);
        const video = container.querySelector('.video');
        expect(video).toBeInTheDocument();
        
    });

    it('should render main section with image', async() => {
        const props = {
            media: {
                date: '2024-06-04',
                explanation: 'explanation',
                media_type: 'image',
                title: 'title',
                url: 'url',
            }
        }
        render(<MainSection {...props} />);
       
        expect(MainImage).toHaveBeenCalledWith({title: 'title', url: 'url'},{});
    });
})