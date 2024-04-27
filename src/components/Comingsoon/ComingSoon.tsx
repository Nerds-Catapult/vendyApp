
const ComingSoonBanner = () => {
    return (
        <div
            className="flex flex-col justify-center items-center bg-indigo-500 text-white rounded-lg p-8 md:p-12 lg:p-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Site Under Construction
            </h1>
            <p className="text-center mb-8">
                We're working hard to bring you an amazing experience. Please check back soon!
            </p>
            <div className="text-lg md:text-xl lg:text-2xl mb-4">
                <p>Features coming soon:</p>
            </div>
            <ul className="list-disc list-inside">
                <li>Admin Dashboard</li>
                <li>User Dashboard</li>
                <li>Login for Various Entities</li>
                <li>Comprehensive Product Catalog</li>
            </ul>
        </div>
    );
};

export default ComingSoonBanner;