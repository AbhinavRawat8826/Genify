import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import LogoCarousel from "./LogoCarousel";
import { X } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 mt-10 md:mt-0 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center min-h-screen">
      <section className="text-center mb-6">
        <BlurCircle
          bottom="120px"
          left="80px"
          opacity="0.4"
          className="w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px]"
        />

        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl text-secondary font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-primary">AI tools</span>
        </h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-secondary">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs mt-6">
          <button
            onClick={() => navigate("/ai")}
            className="bg-green-500 text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            Start creating now
          </button>

          <BlurCircle
            top="150px"
            left="50%"
            translateX="-40%"
            opacity="0.15"
            className="hidden sm:block w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px]"
          />
          <BlurCircle
            top="180px"
            left="50%"
            translateX="-10%"
            opacity="0.15"
            className="hidden lg:block lg:w-[600px] lg:h-[600px]"
          />
         
          <button
            className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            Watch demo
          </button>
        </div>
      </section>

      <div className="flex items-center gap-4 mt-8 mx-auto text-secondary">
        <img src={assets.user_group} alt="" className="h-8" />
        Trusted by 10k+ people
      </div>

      <div className="w-full mt-20 max-w-7xl">
        <LogoCarousel />
      </div>
    </div>
  )
};

export default Hero;
