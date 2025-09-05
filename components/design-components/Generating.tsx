

const Generating = ({ className }:{className?:string}) => {
  return (
    <div
      className={`flex items-center text-white h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <img className="w-5 h-5 mr-4 animate-spin" src={'/loading.png'} alt="Loading" />
      AI is generating
    </div>
  );
};

export default Generating;
