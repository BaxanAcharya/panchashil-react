import { auth } from "./config/firebase";

const getUser = async () => {
  const user = auth.currentUser;

  return user;
};

export default getUser;
