import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const id = localStorage.getItem("userId")

  const handleLogout = () => {
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      toast.success("Logged out successfully.")
    }
    navigate("/login");
  };

  return (
    <nav className="navbar sticky-top navbar-light bg-info p-2">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Budgeting App</span>
        <div className="d-flex ms-auto">
          {token && (
            <button className="btn btn-light" type="button" onClick={handleLogout} >
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar