import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from 'src/utils/firebase';

export const uploadImage = async (file: File) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);

  try {
    // Tải ảnh lên Firebase Storage
    await uploadBytes(storageRef, file);

    // Lấy URL tải xuống của ảnh
    const downloadURL = await getDownloadURL(storageRef);

    // Trả về URL ảnh để sử dụng
    return downloadURL;
  } catch (error) {
    // Xử lý lỗi tải ảnh
    console.log('Lỗi tải ảnh:', error);
    return null;
  }
};
