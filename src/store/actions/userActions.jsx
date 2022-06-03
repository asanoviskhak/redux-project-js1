import { login } from "../slices/user";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfigs";
import { toast } from "react-toastify";

export const RegisterAction = (email, password) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((user) => {
      dispatch(
        login({
          email,
          uid: user.user.uid,
        })
      );
      toast.success("User sucessfully created!");
    });
  } catch (error) {
    toast.error("Some problems with registration");
  }
};
