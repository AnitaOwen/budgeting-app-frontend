import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRedirect = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">

        <p className="lead">Oops! The page you're looking for doesn't exist.</p>

        <div className="mt-4">
          <button
            onClick={handleRedirect}
            className="btn btn-info btn-lg mt-3"
          >
            {token ? "Go to Dashboard" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FourOFour;
