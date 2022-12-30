import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

//custom hook
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("SAC Solutions");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />}></Route>
        <Route path="login" element={<Login />}></Route>

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />}></Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />}></Route>
                    <Route path=":id" element={<EditUser />}></Route>
                    <Route path="new" element={<NewUserForm />}></Route>
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />}></Route>
                  <Route path=":id" element={<EditNote />}></Route>
                  <Route path="new" element={<NewNote />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/*  End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
