import { cloudName, uploadPreset } from "@/config/config";
import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData: string)=>{
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName)
  
  const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
  
  return response.data.secure_url
}