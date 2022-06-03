import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterAction } from "../store/actions/userActions";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(RegisterAction(formData.email, formData.password));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInput} placeholder="email" name="email" />
      <input onChange={handleInput} placeholder="password" name="password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
