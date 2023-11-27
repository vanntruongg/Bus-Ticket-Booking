const StepGuide = ({ title, content }) => {
  return (
    <div className="p-4 my-2 flex flex-col gap-4 justify-center items-center border">
      <h2 className="text-24 font-semibold">{title}</h2>
      {content.map((stepData) => {
        return (
          <div key={stepData.step} className="mx-32">
            <img src={stepData.image} alt="" className="" />
            {stepData.subSteps && (
              <ul className="py-4 grid grid-cols-2 gap-8">
                {stepData?.subSteps.map((subStep) => (
                  <li
                    key={subStep.number}
                    className="flex gap-2 text-20 font-openSans"
                  >
                    <span className="text-primary-500">{subStep.number}.</span>
                    <span>{subStep.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepGuide;
