import { Edit, Image, ImageIcon, Sparkles, Download } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ImageStyle = [
  "Realistic",
  "Ghibli Style",
  "Anime Style",
  "Cartoon Style",
  "Fantasy Style",
  "Realistic Style",
  "3D Style",
  "Portrait Style",
];

const GenerateImages = () => {
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(selectedStyle);
      
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const response = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      const data = response.data;
      if (data?.content) {
        setContent(data.content);
        toast.success("Image generated ✅");
      } else {
        toast.error(data?.message || "Failed to generate Image");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

const handleDownload = async () => {
  try {
    const response = await fetch(content);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-generated-image.png"; 
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
        className="w-full max-w-lg p-4 bg-slate-300 rounded-lg border border-gray-800"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD52]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none bg-slate-200 text-sm rounded-md border text-slate-900 border-white"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {ImageStyle.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border border-black rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-gray-200 text-green-900"
                  : "text-slate-600 border-slate-800"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-400 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button
          disabled={loading}
          className="flex w-full justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer "
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <ImageIcon className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-slate-300 rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-black">
              <Image className="w-9 h-9" />
              <p>Enter a topic and click “Generate image” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full flex flex-col">
            <img src={content} alt="Generated" className="w-full h-full object-contain rounded-md" />
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

export default GenerateImages;
