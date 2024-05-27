import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { resolve } from 'path';
import { useState } from 'react';
import app from 'src/utils/firebase';

export const useUploadImage = (): [(data: File) => Promise<string | null>, boolean] => {
  const storage = getStorage(app);
  const [isPendingUploadImage, setIsPendingUploadImage] = useState(false);
  const uploadImage = async (file: File) => {
    setIsPendingUploadImage(true);
    const storageRef = ref(storage, 'images/' + file.name);
    try {
      // Tải ảnh lên Firebase Storage
      await uploadBytes(storageRef, file);

      // Lấy URL tải xuống của ảnh
      const downloadURL = await getDownloadURL(storageRef);
      setIsPendingUploadImage(false);
      // Trả về URL ảnh để sử dụng
      return downloadURL;
    } catch (error) {
      // Xử lý lỗi tải ảnh
      console.log('Lỗi tải ảnh:', error);
      return null;
    }
  };
  return [uploadImage, isPendingUploadImage];
};

export default useUploadImage;
