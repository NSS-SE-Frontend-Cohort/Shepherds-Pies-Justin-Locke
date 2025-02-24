export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders?_embed=pizzas`).then(res => res.json())
}

export const createOrder = (order) => {
    return fetch(`http://localhost:8088/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    }).then(res => res.json())
}

export const deleteOrder = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas&_embed=pizzaAddOns`, {
        method: "DELETE"
    }).then (res => res.json())
}

export const getOrderById = (orderId) => {
    return fetch (`http://localhost:8088/orders/${orderId}`).then(res => res.json())
}

export const finalizeOrder = (order) => {
    return fetch(`http://localhost:8088/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    }).then(res => res.json())
}