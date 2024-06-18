import { useState, useEffect } from "react";

interface Business {
  id: string | number;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  imageUrl: string | null;
}

interface ExpectedBusinessProps {
  status: number;
  message: string;
  entity: Business[] | null;
}

const BusinessCatalogue = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4200/api/businesses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: ExpectedBusinessProps = await response.json();
        if (data.entity) {
          setBusinesses(data.entity);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? businesses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === businesses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleBusinesses = businesses.slice(currentIndex, currentIndex + 5);

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          Our catalogue
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loading />
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap scroll-smooth">
              <div className="flex justify-center space-x-8">
                {visibleBusinesses.map((business) => (
                  <div
                    key={business.id}
                    className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out"
                    onClick={() => {
                      window.location.href = `/business/${business.id}`;
                    }}
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg overflow-y-hidden">
                      <img
                        src={
                          business.imageUrl || "https://via.placeholder.com/150"
                        }
                        alt={business.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {business.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md focus:outline-none"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md focus:outline-none"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BusinessCatalogue;
