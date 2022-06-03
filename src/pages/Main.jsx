import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/user";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return (
    <div>
      Hello to Movie list!
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Main;
