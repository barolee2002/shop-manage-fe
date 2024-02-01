import React, { useState, useEffect } from 'react';
import {
  FiberManualRecord as FiberManualRecordIcon,
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
} from '@mui/icons-material';
import './style.scss';
import { IconButton } from '@mui/material';
interface Props {
  images: string[];
  interval: number;
}

const AutoSlider = ({ images, interval = 3000 }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > images?.length - 2 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images?.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImageIndex, interval]);

  return (
    <div className="auto-slider">
      {images && images.length > 0 && <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />}

      <div className="place-buttons">
        {images?.map((image, index) => {
          return currentImageIndex === index ? (
            <IconButton onClick={() => setCurrentImageIndex(index)} key={index}>
              <FiberManualRecordIcon className='place-buttons-btn' />
            </IconButton>
          ) : (
            <IconButton onClick={() => setCurrentImageIndex(index)} key={index}>
              <FiberManualRecordOutlinedIcon className='place-buttons-btn' />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

export default AutoSlider;
