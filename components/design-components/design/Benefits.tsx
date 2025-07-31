export const GradientLight = () => {
  return (
    // <div className="absolute top-0 left-1/4 w-full aspect-square backdrop-blur-lg rounded-full bg-gradient-to-tl from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />
     <div className="absolute top-[18.25rem] left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
        <img
          className="w-full"
          src={'/gradient.png'}
          width={942}
          height={942}
          alt="Gradient"
        />
      </div>
    </div>
  );
};
