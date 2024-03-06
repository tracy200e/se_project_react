const baseUrl = "http://localhost:3001";

// Add item
const addItems = () => {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

// Get item
const getItems = () => {
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
const deleteItems = (id) => {
    return fetch(`${baseUrl}/items/:${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

const api = { addItems, getItems, deleteItems };

export default api;