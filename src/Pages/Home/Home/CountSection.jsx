

const CountSection = () => {
    return (
        <div>
               <section className=" mt-16 mb-16">
      <h1 className=" text-6xl mb-5"> Premium Subscribtion Plan Prices</h1>
      
      <div className="flex flex-col  ">

        <div>

        <div  className="w-64 mt-15 p-16 text-lg border-8 border-yellow-500  ">
          <h2>100tk</h2>
        </div>
        </div>

        <div>
        <div  className="w-64 mt-15 p-16 text-lg border-8 ">
          <h2>200tk</h2>
        </div>
        </div>

        <div>
        <div  className="w-64 mt-15 p-16 text-lg border-8 border-red-600 ">
          <h2>500tk</h2>
        </div>
        </div>


<div>
        <div  className="w-64 mt-15 p-16 text-lg border-8 ">
          <h2>1000tk</h2>
        </div>
        </div>

<div>
        <div  className="w-64 mt-15 p-16 text-lg border-8 border-lime-500">
          <h2>5000tk</h2>
        </div>
        </div>

      </div>
      <h4 className="hr1">
       
        <hr />
      </h4>
     
    </section>

   
        </div>
    );
};

export default CountSection;