import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    const formData = new FormData();

    // append image file to form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // set header for file upload
            },
        });
        return response.data;  // return the response data containing image URL
    } catch (error) {
        console.error ("Error uploading the image: ", error);
        throw error;  // rethrow the error for handling in the calling function
    }
};


export default uploadImage;