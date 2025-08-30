import { Eraser, Sparkles, X, Download } from "lucide-react";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import imageCompression from "browser-image-compression";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const options = {
        maxSizeMB: 8,
        maxWidthOrHeight: 5000,
        useWebWorker: true,
        initialQuality: 0.95,
      };

      const compressedFile = await imageCompression(input, options);

      const formData = new FormData();
      formData.append("image", compressedFile);

      const response = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      const data = response.data;
      if (data?.content) {
        setContent(data.content);
        toast.success("Background removed successfully ✅");
      } else {
        toast.error(data?.message || "Failed to remove background");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInput(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const removePreview = () => {
    setPreview(null);
    setInput(null);
    setContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "background-removed.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image ❌");
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-slate-300 rounded-lg border border-gray-800 flex flex-col"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none bg-slate-200 text-sm rounded-md text-slate-900"
          required
        />

        {preview && (
          <div className="relative inline-block mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto object-cover rounded-lg shadow"
            />
            <button
              type="button"
              onClick={removePreview}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <button
          disabled={loading}
          className="flex w-full justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove background
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-slate-300 rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-sm text-center text-black">Upload an image and click "Remove Background"</p>
          </div>
        ) : (
          <div className="mt-3 flex flex-col">
            <img src={content} alt="image" className="w-full h-auto rounded-lg" />
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" />
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
