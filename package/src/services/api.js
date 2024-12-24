import axios from "axios";

export const uploadPropertyImages = async (images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));

  const response = await axios.post("/api/properties/upload-images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};