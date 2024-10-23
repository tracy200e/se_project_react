export const baseUrl = "http://localhost:3001";

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
  return request(`${baseUrl}/items`, {
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
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
}

// Delete item
export function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
}

// Like item
export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

// Like item
export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
