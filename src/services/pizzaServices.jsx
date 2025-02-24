export const getAllSizes = () => {
    return fetch(`http://localhost:8088/sizes`).then(res => res.json())
}

export const getAllCheeses = () => {
    return fetch(`http://localhost:8088/cheeses`).then(res => res.json())
}

export const getAllSauces = () => {
    return fetch(`http://localhost:8088/sauces`).then(res => res.json())
}

export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then(res => res.json())
}

export const createPizza = (pizza) => {
    return fetch(`http://localhost:8088/pizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizza)
    }).then(res => res.json())
}

export const createPizzaAddOn = (pizzaAddOn) => {
    return fetch(`http://localhost:8088/pizzaAddOns`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizzaAddOn)
    }).then(res => res.json())
}

export const getPizzasByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas`).then(res => res.json())
}

export const getPizzaById = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzas/${pizzaId}?_expand=size&_expand=sauce&_expand=cheese`).then(res => res.json())
}

export const getToppingsByPizzaId = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzaAddOns?pizzaId=${pizzaId}&_expand=topping`).then(res => res.json())
}

export const deletePizzaById = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzas/${pizzaId}?_embed=pizzaAddOns`, {
        method: "DELETE"
    }).then(res => res.json())
}