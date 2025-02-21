export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders?_embed=pizzas`).then(res => res.json())
}