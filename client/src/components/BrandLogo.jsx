export default function BrandLogo() {
  return (
    <div className="sm:w-6/12 p-6 sm:bg-light flex items-center justify-center">
      <div className="w-36 h-36 sm:w-44 sm:h-44 relative">
        <div className="w-full h-full bg-brand rounded-full shadow-md"></div>
        <div className="absolute w-[150%] h-3/4 left-[-25%] -bottom-1/4 bg-gradient-to-b from-light/20 to-light/50 backdrop-blur-md"></div>
      </div>
    </div>
  );
}
