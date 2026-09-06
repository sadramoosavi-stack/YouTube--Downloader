import api from "./api";


export async function registerUser(username, email, password) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data; // { message, user_id }
}


export async function loginUser(email, password) {
  const response = await api.post("/auth/login", { email, password });
  const { access_token } = response.data;
  localStorage.setItem("access_token", access_token);
  return response.data; // { access_token, token_type }
}


export function logoutUser() {
  localStorage.removeItem("access_token");
}
