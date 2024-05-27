export default function getImageUrl(image : File) {
  try {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      console.error('Invalid image data:', image);
      return '';
    }
  } catch (error) {
    console.error('Error creating object URL:', error);
    return '';
  }
}
