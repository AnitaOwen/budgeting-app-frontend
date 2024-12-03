import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faKey } from "@fortawesome/free-solid-svg-icons";


const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-light bg-info">
      <div className="container-fluid">
        {/* <span className="navbar-brand mb-0 h1">Budgeting App</span> */}
        <div className="d-flex ms-auto">
          <button className="btn btn-light me-2" type="button" title="Change Password">
              <FontAwesomeIcon icon={faKey} />
          </button>
          <button className="btn btn-light" type="button" title="Logout">
              <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar