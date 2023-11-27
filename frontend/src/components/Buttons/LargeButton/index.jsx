const LargeButton = ({ children }) => {
  return (
    <div className="w-full border rounded-md overflow-hidden">
      <button className="py-2 w-full bg-primary-500 text-white font-semibold transition-all duration-200 hover:bg-primary-600">
        {children}
      </button>
    </div>
  );
};

export default LargeButton;
