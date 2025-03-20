import { BASE_URL } from "../utils/constants";

// Check response and return response status if there's an error
export function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

// Fetch and check responses
export function request(url, options) {
  return fetch(url, options).then(processServerResponse);
}

// Add item
export function addItems(item) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(item),
  });
}

// Get item
export function getItems() {
  return request(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
}

// Delete item
export function deleteItems(id) {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
}

// Like item
export function addCardLike(id, token, isLiked, setIsLiked) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(() => setIsLiked(!isLiked));
}

// Like item
export function removeCardLike(id, token, isLiked, setIsLiked) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(() => setIsLiked(!isLiked));
}
