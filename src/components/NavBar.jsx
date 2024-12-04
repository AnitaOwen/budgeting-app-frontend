import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const NavBar = ({currentUserId}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar sticky-top navbar-light bg-info p-2">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Budgeting App</span>
        <div className="d-flex ms-auto">
          <button className="btn btn-light" type="button" onClick={handleLogout} >
              <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar