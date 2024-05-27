/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getDownloadURL } from 'firebase/storage';

import './style.scss';
import { Box, fabClasses } from '@mui/material';

interface Props {
  parentCallback?: (image: any) => void;
  isClear?: boolean;
  once?: boolean;
  parentImage?: string;
  typeImage?: string;
  listParentImage?: string[];
  imageKey?: string | number;
}

function BaseDropzone(props: Props) {
  const { parentCallback, imageKey, once, parentImage } = props;
  const [images, setImages] = useState<any>([]);
  const [image, setImage] = useState<File | null | string>(null);
  const [isDrapping, setIsDrapping] = useState(false);
  console.log(parentImage, imageKey);
  const didMountRef = useRef(false);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    setImages([]);
    setImage(parentImage || null);
    didMountRef.current= false;
  }, [imageKey]);
  useEffect(() => {
    if (didMountRef.current) {
      once && typeof image !== 'string'
        ? parentCallback && parentCallback(image)
        : parentCallback && parentCallback(images);
    }
  }, [images, image]);
  const selectFiles = () => {
    fileInputRef.current !== null && fileInputRef.current.click();
    didMountRef.current= true;
  };
  const onFileSelect = (e: any) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      once
        ? setImage(files[i])
        : !images.some((e: { name: any }) => e.name === files[i].name) &&
          setImages((prevImages: any) => [...prevImages, files[i]]);
    }
  };
  const deleteImage = (index: any) => {
    setImages((prevImages: any) => prevImages.filter((_: any, i: any) => i !== index));
    setImage(null);
  };
  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsDrapping(true);
    e.dataTransfer.dropEffect = 'copy';
  };
  const onDragLeave = (e: any) => {
    e.preventDefault();
    setIsDrapping(false);
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    setIsDrapping(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      once
        ? setImage(files[i])
        : !images.some((e: { name: any }) => e.name === files[i].name) &&
          setImages((prevImages: any) => [...prevImages, files[i]]);
    }
  };
  return (
    <Box className="BaseDropzone w-100">
      <Box className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDrapping ? (
          <span>Kéo thả ảnh vào đây</span>
        ) : (
          <>
            {once && parentImage ? (
              <Box className="image-item m-2">
                <span
                  className="delete-img d-flex justify-content-center align-items-center rounded-circle"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
                <img
                  role="presentation"
                  src={
                    // typeof image !== 'string' && image
                    //   ? URL.createObjectURL(image)
                    //   : typeof image === 'string' && parentImage && image && image !== ''
                    //   ? image
                    //   : ''
                    parentImage ? parentImage : ''
                  }
                  alt={props.typeImage}
                  onClick={selectFiles}
                />
              </Box>
            ) : (
              <Box>
                Kéo thả ảnh hoặc{' '}
                <span className="btn-upload" role="button" onClick={selectFiles}>
                  tải ảnh từ thiết bị
                </span>
              </Box>
            )}
          </>
        )}
        <input className="d-none" type="file" name="file" multiple ref={fileInputRef} onChange={onFileSelect} />
      </Box>
      <Box className="img-list w-100 d-flex justify-content-start align-items-start flex-wrap">
        <React.Fragment>
          {props?.listParentImage?.map((image, index) => (
            <Box className="image-item m-2" key={index}>
              <span
                className="delete-img d-flex justify-content-center align-items-center rounded-circle"
                onClick={() => deleteImage(index)}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
              <img src={image} alt="product" />
            </Box>
          ))}
          {images.map((fileImg: any, index: any) => (
            <Box className="image-item m-2" key={index}>
              <span
                className="delete-img d-flex justify-content-center align-items-center rounded-circle"
                onClick={() => deleteImage(index)}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
              <img src={URL.createObjectURL(fileImg)} alt={fileImg.name} />
            </Box>
          ))}
        </React.Fragment>
      </Box>
    </Box>
  );
}

export default React.memo(BaseDropzone);
