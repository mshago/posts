import { config } from "../configuration";

const ME_URL = config.API_URL + "auth/me";
const LOGIN_URL = config.API_URL + "auth/login";
const REGISTER_URL = config.API_URL + "auth/register";
const API_CONFIG = {
  method: "post",
  headers: {
    "Content-Type": "Application/json",
  },
};

export const fetchUserInfo = async (token) => {
  let response = await fetch(ME_URL, {
    method: "get",
    headers: { "Content-Type": "application/json", authorization: token },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  console.log(response);
  // return await response.text()
};

export const login = async (values) => {
  let response = await fetch(LOGIN_URL, {
    ...API_CONFIG,
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
};

export const register = async (values) => {
  try {
    const response = await fetch(REGISTER_URL, {
      ...API_CONFIG,
      body: JSON.stringify(values),
    });
  } catch (error) {
    console.log(error);
  }
};
