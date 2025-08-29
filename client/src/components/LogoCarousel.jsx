const logos = [
  "/logos/facebook.svg",
  "/logos/slack.svg",
  "/logos/framer.svg",
  "/logos/netflix.svg",
  "/logos/google.svg",
  "/logos/linkedin.svg",
];

export default function LogoCarousel() {
  return (
    <div className="relative w-full  overflow-hidden py-6 ">
      <div className="flex animate-scroll">
        
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-40 mx-6">
            <img
              src={logo}
              alt="logo"
              className="h-10 mx-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
