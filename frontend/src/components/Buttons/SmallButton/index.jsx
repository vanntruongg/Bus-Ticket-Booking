const SmallButton = ({ children }) => {
  return (
    <div className="w-[25%] border rounded-md overflow-hidden">
      <button className="w-full py-1 bg-gradient-to-br from-purple-400 to-sky-400 text-white transition-all hover:from-purple-500 hover:to-sky-500">
        {children}
      </button>
    </div>
  );
};

export default SmallButton;
