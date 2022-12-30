import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeBtn = null;

  if (pathname !== "/dash") {
    goHomeBtn = (
      <button className="dash-footer__button icon-button" title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeBtn}
      <p>
        Current User: <span>{username}</span>
      </p>
      <p>
        Status: <span>{status}</span>
      </p>
    </footer>
  );
  return content;
};

export default DashFooter;
