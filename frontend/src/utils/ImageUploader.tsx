import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // you can upload to Cloudinary here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-4 border-1 border-dashed p-5 text-center rounded-3 cursor-pointer ${
        isDragActive ? "bg-light border-primary" : "border-secondary"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p className="text-black-50 mb-0">
          Drag & drop an image here, or click to select one
        </p>
      )}
    </div>
  );
}

export default ImageUploader;
