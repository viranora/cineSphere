import React, { useState, useEffect } from 'react';
import { useUserLists } from '../context/UserListsContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useUserLists(); 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
 
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-lg"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Giriş Yap</h1>
        
        {error && (
          <div className="bg-red-500/30 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            E-posta
          </label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Şifre
          </label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full px-6 py-3 bg-indigo-600 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-indigo-700"
        >
          Giriş Yap
        </button>
        <p className="text-center text-gray-400 mt-6">
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Kayıt Ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;