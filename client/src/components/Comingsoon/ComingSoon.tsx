import React from 'react';

const ComingSoonBanner: React.FC = () => {
    return (
        <div className="bg-gray-400 text-white text-center py-4 px-8 md:px-16 lg:px-24 w-[50%] h-[50%] flex justify-center items-center rounded-lg">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Products are coming soon
            </h1>
        </div>
    );
};

export default ComingSoonBanner;
