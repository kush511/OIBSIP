import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // ADD: Separate state for confirm password
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); // ADD: Error state for better UX

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(''); // Clear previous errors

        // ADD: Client-side validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                email,
                password,
                username
            });
            console.log('Register Success:', response.data);

            // SUCCESS: Show message and redirect to login
            toast.success('Registration successful! Please login with your credentials.', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#22c55e',
                    color: '#fff',
                    fontWeight: 'bold',
                }
            });
            navigate('/login');

        } catch (error) {
            console.log('Register failed:', error.response?.data?.message);
            setError(error.response?.data?.message || 'Registration failed');
        }
    }

    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 px-4'>

                <div className='text-center mb-8'>
                    <div className='text-5xl mb-2 animate-bounce'>🍕</div>
                    <h1 className='text-4xl font-bold text-orange-500 mb-2'> Pizzeria </h1>
                    <p className='text-lg text-gray-600'>Welcome! Sign up to order delicious pizza</p>
                </div>

                <div className='w-full max-w-md flex flex-col bg-white backdrop-blur-sm rounded-xl shadow-lg p-8'>

                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-full'>

                        {/* FIXED: Username input with correct type */}
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text" // FIXED: Changed from "username" to "text"
                            required
                            placeholder='Username'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400 transition-all duration-200'
                        />

                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            required
                            placeholder='Email address'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400 transition-all duration-200'
                        />

                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            required
                            placeholder='Password (min 6 characters)'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400 transition-all duration-200'
                        />

                        {/* FIXED: Separate state and onChange for confirm password */}
                        <input
                            value={confirmPassword} // FIXED: Uses confirmPassword state
                            onChange={e => setConfirmPassword(e.target.value)} // FIXED: Updates confirmPassword
                            type="password"
                            required
                            placeholder='Confirm Password'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400 transition-all duration-200'
                        />

                        {/* ADD: Error message display */}
                        {error && (
                            <div className='text-red-500 text-sm text-center bg-red-50 p-2 rounded'>
                                {error}
                            </div>
                        )}

                        <button
                            type='submit'
                            className='w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'
                        >
                            🍕 Sign Up to Order
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            {/* FIXED: Link text and component */}
                            <Link to='/login' className='text-orange-500 hover:text-orange-600 font-semibold transition-colors'>
                                Sign in here
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register;
