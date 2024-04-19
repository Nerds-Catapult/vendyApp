
const MobileIsNotSupported = () => {
 return (
   <div className="flex flex-col bg-indigo-400 text-white rounded-lg p-8 md:p-12 lg:p-16 h-screen">
       <div className="flex justify-center items-center flex-col h-full">
           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
               Mobile View Not Yet Supported
           </h1>
           <p className="text-lg md:text-xl lg:text-2xl mb-8 text-center">
               We're still working on optimizing the experience for mobile devices.<br/>
               Please access the site using your laptop or desktop computer.
           </p>
       </div>
   </div>
 );
};

export default MobileIsNotSupported;