import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilePen, faRightFromBracket, faUserGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  let dashClass = null;

  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small";
  }

  let newNoteBtn = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteBtn = (
      <button className="icon-button" title="New Note" onClick={onNewNoteClicked}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserBtn = null;
  if (USERS_REGEX.test(pathname)) {
    newUserBtn = (
      <button className="icon-button" title="New User" onClick={onNewUserClicked}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userBtn = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userBtn = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesBtn = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesBtn = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={() => sendLogout()}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let btnContent;
  if (isLoading) {
    <p>Logging out...</p>;
  } else {
    btnContent = (
      <>
        {newNoteBtn}
        {newUserBtn}
        {notesBtn}
        {userBtn}
        {logoutButton}
      </>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash__header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">{btnContent}</nav>
        </div>
      </header>
    </>
  );
};

export default DashHeader;
