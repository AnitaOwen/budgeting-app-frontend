import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('userId');
        if (!token) {
            navigate('/login');
            return;
        }
        if (token && id) {
            navigate(`/dashboard/${id}`);
        }
    }, []);
}

export default Home;