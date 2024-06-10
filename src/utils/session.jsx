const storeInSession = (key, value) => {
  sessionStorage.setItem(key, value);
};

const lookInSession = (key) => {
  return sessionStorage.getItem(key);
};

const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};

const logoutUser = () => {
  sessionStorage.clear();
};

export { storeInSession, logoutUser, removeFromSession, lookInSession };
