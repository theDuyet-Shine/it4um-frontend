export const userLogin = (user) => ({
  type: "USER_LOGIN",
  payload: user,
});

export const adminLogin = (admin) => ({
  type: "ADMIN_LOGIN",
  payload: admin,
});

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

export const adminLogout = () => ({
  type: "ADMIN_LOGOUT",
});
