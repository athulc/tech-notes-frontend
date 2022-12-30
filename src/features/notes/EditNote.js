// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetNotesQuery } from "./notesApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const EditNote = () => {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();
  // const note = useSelector((state) => selectNoteById(state, id));
  // const users = useSelector(selectAllUsers);

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};

export default EditNote;
