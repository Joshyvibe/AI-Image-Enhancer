import React, { useState } from 'react';
import { restoreImage } from '../api';
import '../styles/ImageRestore.css';

const ImageRestore = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setRestoredImageUrl(null); // Clear previous restored image
      setError(null); // Clear errors
    }
  };

  const handleRestoreImage = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const data = await restoreImage(formData);
      setRestoredImageUrl(data.image_url);
      setImage(null); // Clear uploaded image for new restoration
      setImagePreview(null); // Remove preview for the next upload
    } catch (err) {
      setError("Error restoring image: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPNG = () => {
    if (!restoredImageUrl) return;
    console.log(restoredImageUrl)
  
    // Create an image element to load the image
    const imgElement = document.createElement("img");
    imgElement.crossOrigin = "Anonymous"; // Enable CORS for cross-origin images
    imgElement.src = restoredImageUrl; // Use the Cloudinary URL directly
  
    imgElement.onload = () => {
      // Create a canvas element to draw the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Set canvas dimensions to match the image
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
  
      // Draw the image on the canvas
      ctx.drawImage(imgElement, 0, 0);
  
      // Convert canvas to a PNG data URL
      const dataURL = canvas.toDataURL("image/png");
  
      // Create a link element to trigger download
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `restored_image_${Date.now()}.png`; // Set download filename
      a.click();
    };
  
    imgElement.onerror = () => {
      console.error("Error loading image for download.");
    };
  };
  

  return (
    <div className="image-restore-container">
      <h2>AI Image Restorer</h2>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-label">Choose an image</label>
      </div>

      {error && <p className="error-message">{error}</p>}

      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Uploaded" className="image-preview" />
        </div>
      )}

      {loading && <div className="loader"></div>}

      {!loading && image && (
        <button
          onClick={handleRestoreImage}
          className="restore-button"
        >
          Restore Image
        </button>
      )}

      {restoredImageUrl && (
        <div className="restored-image-container">
          <h3>Here's the restored</h3>
          <img src={restoredImageUrl} alt="Restored" className="restored-image" />
          <button onClick={handleDownloadPNG} className="download-button">
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageRestore;
