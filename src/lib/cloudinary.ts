import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// Helper function to upload a file to Cloudinary
export async function uploadFileToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const cloudForm = new FormData();
  cloudForm.append(
    "file",
    new Blob([buffer], { type: file.type }),
    file.name
  );
  cloudForm.append("upload_preset", "unsigned_raw");
  cloudForm.append("folder", folder);

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, // Changed to /upload for general files/images
    {
      method: "POST",
      body: cloudForm,
    }
  );

  const uploadResult = await cloudRes.json();
  return uploadResult;
}

export default cloudinary;
