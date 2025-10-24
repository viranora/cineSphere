import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserLists } from '../context/UserListsContext'; 

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { profilePic, setProfilePic } = useUserLists(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('likedMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('profilePic');
    setProfilePic(null);
    setIsDropdownOpen(false);
    navigate('/'); 
  };

  return (
    <nav className="p-4 bg-white/10 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Sol Taraf: Marka ve Keşfet */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-3xl font-bold text-white tracking-wider">
            CineSphere
          </Link>
          <Link 
            to="/discover" 
            className="text-lg text-gray-200 hover:text-white transition-colors duration-200"
          >
            Keşfet
          </Link>
        </div>

        {/* Sağ Taraf: Profil Menüsü */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg
                       focus:outline-none ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500
                       overflow-hidden"
          >
            {profilePic ? (
              <img src={profilePic} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Açılır Menü */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50
                         ring-1 ring-black ring-opacity-5"
            >
              <Link
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white"
              >
                Profil
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white"
              >
                Ayarlar
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white"
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;