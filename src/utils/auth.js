const baseUrl = "http://localhost:3001";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
    });
};

export const authorize = (name, password) => {
  return fetch(`${baseUrl}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      } else {
        return;
      }
    });
};
