const baseUrl = "http://localhost:3001";

// Add item
export function addItems(item) {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item),
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

// Get item
export function getItems() {
    return fetch(`${baseUrl}/items`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

// Delete item
export function deleteItems(_id) {
    return fetch(`${baseUrl}/items/${_id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};