import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import MainImage from './main-image';

HTMLElement.prototype.animate = jest.fn();

describe('MainImage', () => {

    it('should render MainImage', async() => {
        const props = {
           url: '/url',
           title: 'title'
        }
     
        render(<MainImage {...props} />);

        const options: KeyframeAnimationOptions  = {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        const keyframes: Keyframe[] = [
            { opacity: 0 },
            { opacity: 1 }
        ];

        const mockedAnimation = HTMLElement.prototype.animate;
        expect(mockedAnimation).toHaveBeenCalledWith(keyframes, options);

    });
})