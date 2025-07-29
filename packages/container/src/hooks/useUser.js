import { useEffect, useState } from "react";

const USER_KEY = "user";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (user) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setUser(user);
    } else {
      localStorage.removeItem(USER_KEY);
      setUser(null);
    }
  };

  return [user, updateUser];
};

export default useUser;
