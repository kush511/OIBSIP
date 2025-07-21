import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
            console.log('Login Success:', response.data);


            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            navigate('/dashboard');

        } catch (error) {
            console.log('Login failed:', error.response?.data?.message);
            alert(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 px-4'>

                <div className='text-center mb-8'>
                    <div className='text-5xl mb-2 animate-bounce'>🍕</div>
                    <h1 className='text-4xl font-bold text-orange-500 mb-2'>Mario's Pizzeria</h1>
                    <p className='text-lg text-gray-600'>Welcome back! Sign in to order delicious pizza</p>
                </div>

                <div className='w-full max-w-md flex flex-col bg-white backdrop-blur-sm rounded-xl shadow-lg p-8'>

                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-full'>

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
                            placeholder='Password'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 hover:border-gray-400 transition-all duration-200'
                        />

                        <div className='flex items-center justify-between text-sm'>
                            <label className='flex items-center gap-2 text-gray-600'>
                                <input type='checkbox' className='rounded border-gray-300 text-orange-500 focus:ring-orange-200' />
                                Remember me
                            </label>
                            <a href='#' className='text-orange-500 hover:text-orange-600 transition-colors'>
                                Forgot password?
                            </a>
                        </div>


                        <button
                            type='submit'
                            className='w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'
                        >
                            Sign In to Order
                        </button>
 
                    </form>
                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Don't have an account?
                            <a href='#' className='text-orange-500 hover:text-orange-600 font-semibold transition-colors'>
                                Sign up here
                            </a>
                        </p>
                    </div>

                </div>
            </div>

        </>
    )
}
export default Login;