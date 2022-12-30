import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false); // holds value even after compoenent unmounts and remounts

  const [trueSuccess, setTrueSuccess] = useState(false);

  //isUninitialized means API didn't called yet.
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      //React 18 strict mode

      const verifyRefreshToken = async () => {
        console.log("Verifying refresh token...");
        try {
          //   const response =
          await refresh();
          //   const { accesstoken } = response.data;
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (!persist) {
    // no persist
    console.log("No persist");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token & uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
