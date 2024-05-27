import { v4 as uuidv4 } from 'uuid';
const getImageFile = (imageLink: string, imageName : string): [File] => {
  let response : File = {} as File
  fetch(imageLink)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], `${imageName}/${uuidv4()}`, { type: blob.type });
      response = file;
    });
  return response;
};

export default getImageFile;
