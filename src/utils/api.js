const baseUrl = "http://localhost:3001";

// Check response and return response status if there's an error
export function processServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

// Add item
export function addItems(item) {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item),
    })
    .then(processServerResponse);
};

// Get item
export function getItems() {
    return fetch(`${baseUrl}/items`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(processServerResponse);
};

// Delete item
export function deleteItems(_id) {
    return fetch(`${baseUrl}/items/${_id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(processServerResponse);
};