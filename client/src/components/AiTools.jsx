import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import { CardSpotlight } from "../components/ui/CardSpotlight"; 

const AiTools = () => {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32">
      
      <div className="text-center">
        <h2 className="text-secondary text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

     
      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <CardSpotlight
            key={index}
            className="p-8 m-4 max-w-xs rounded-lg shadow-lg border border-gray-100 
                       transition-all duration-300 cursor-pointer bg-white dark:bg-neutral-900"
            onClick={() => navigate(`/tools/${tool.slug}`)} 
          >
           
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl relative z-20"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
          
            <h3 className="mt-6 mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100 relative z-20">
              {tool.title}
            </h3>
           
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[95%] relative z-20">
              {tool.description}
            </p>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
