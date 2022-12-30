import { store } from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing...");
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    store.dispatch(notesApiSlice.util.prefetch("getNotes", "notesList", { force: true }));
    store.dispatch(usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }));

    // return () => {
    //   console.log("Unsubscribing...");
    //   users.unsubscribe();
    //   notes.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};

export default Prefetch;
