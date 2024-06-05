const DonatePlan = () => {
  return (
    <div className=" mt-16 mb-16 bg-base-300 ">
      <div className=" text-6xl mb-5"> This Website was updated last </div>
      
        <div className="grid grid-flow-col gap-2 text-center auto-cols-max ">
          <div className="flex flex-col p-10 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 4 }}></span>
            </span>
            DATE
          </div>
          <div className="flex flex-col p-10 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 6 }}></span>
            </span>
            MONTH
          </div>
          <div className="flex flex-col p-10 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-10xl">
              <span style={{ "--value": 2024 }}></span>
            </span>
          2024  YEAR
          </div>
         
        </div>
      </div>
    
  );
};

export default DonatePlan;
