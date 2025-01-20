import './Slider.css';
import { useState } from 'react';

interface ISliderProps {
  images: string[];
}

export default function Slider({ images }: ISliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='slider'>
      <div className='slider__inner'>
        <div className='slider__images'>
          <img
            className='slider__img'
            key={crypto.randomUUID()}
            src={images[currentIndex]}
            alt=''
          />
        </div>

      </div>
      <div className='slider__buttons'>
        <button className='slider__button' onClick={handlePrev}>{'<'}</button>
        <button className='slider__button' onClick={handleNext}>{'>'}</button>
      </div>
    </div>
  )
}
