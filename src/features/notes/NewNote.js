// import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import { PulseLoader } from "react-spinners";

const NewNote = () => {
  // const users = useSelector(selectAllUsers);

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  return <NewNoteForm users={users} />;
};

export default NewNote;
