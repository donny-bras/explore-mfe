const MOCK_USER = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const signIn = (email, password) => {
  return Promise.resolve(MOCK_USER);
};

const signUp = (userData) => {
  return Promise.resolve(MOCK_USER);
};

export { signIn, signUp };
