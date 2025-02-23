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