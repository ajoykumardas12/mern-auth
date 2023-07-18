export default function BrandLogo() {
  return (
    <div className="w-6/12 bg-light flex items-center justify-center">
      <div className="w-44 h-44 relative">
        <div className="w-full h-full bg-brand rounded-full shadow-md"></div>
        <div className="absolute w-[150%] h-3/4 left-[-25%] -bottom-1/4 bg-gradient-to-b from-light/20 to-light/50 backdrop-blur-md"></div>
      </div>
    </div>
  );
}
