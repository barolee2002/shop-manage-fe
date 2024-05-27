import { v4 as uuidv4 } from 'uuid';

const getImageFile = async (imageLink: string, imageName: string): Promise<File> => {
  const response = await fetch(imageLink);
  const blob = await response.blob();
  return new File([blob], `${imageName}${uuidv4()}.${blob.type.split('/')[1]}`, { type: blob.type });
};

export default getImageFile;
