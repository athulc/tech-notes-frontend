import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesStr = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesStr}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button tabl-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
