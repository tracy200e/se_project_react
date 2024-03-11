const baseUrl = "http://localhost:3001";

// Check response and return response status if there's an error
export function processServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

// Fetch and check responses
function request(url, options) {
    return fetch(url, options).then(processServerResponse);
};

// Add item
export function addItems(item) {
    request(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item),
    })
};

// Get item
export function getItems() {
    request(`${baseUrl}/items`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
};

// Delete item
export function deleteItems(_id) {
    request(`${baseUrl}/items/${_id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
};