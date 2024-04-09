// import LocalStorageService from "../../../logic/localStorageAuth.ts";


import React from 'react';

interface ProfileProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  phone,
  address,
  avatar = 'https://via.placeholder.com/150',
}) => {
  return (
    <div className="bg-dark rounded-lg shadow-md p-6 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-32 h-32 md:mr-8 mb-4 md:mb-0">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600 mb-2">{email}</p>
          <p className="text-gray-600 mb-2">{phone}</p>
          <p className="text-gray-600">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;