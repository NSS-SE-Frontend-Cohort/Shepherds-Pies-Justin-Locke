import { useEffect, useState } from "react"
import { deletePizzaById, getPizzaById, getToppingsByPizzaId } from "../../services/pizzaServices"
import "./Pizza.css"
import { formatToDollars } from "../../services/utilityServices"

export const PizzaDetails = ({ pizzaId, getAndSetPizzas }) => {
    const [pizza, setPizza] = useState({})
    const [toppings, setToppings] = useState([])

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaObj) => {
            setPizza(pizzaObj)
        })
    }, [pizzaId])

    useEffect(() => {
        getToppingsByPizzaId(pizzaId).then((toppingsArray) => {
            setToppings(toppingsArray)
        })
    }, [pizza])

    const handleDeletePizza = () => {
        deletePizzaById(pizza.id).then(() => {
            getAndSetPizzas()
        })
    }

    // Disable the button if the URL matches `/orders/{orderId}`
    console.log("Location Path Name: ", location.pathname)
    console.log("Written Location Path: ", `/orders/${pizza.orderId}`)
    const isOrderDetailsPage = location.pathname === `/orders/${pizza.orderId}`
    
    return (
        <section className="pizza">
            <header className="pizza-info">
                <div>Pizza # {pizzaId}</div>
                <div>Cost : {formatToDollars(pizza.pizzaCost)}</div>
            </header>
                    <div>
                        <span className="pizza-info">Size : </span>
                        <span>{pizza.size?.name}</span>
                    </div>
                    <div>
                        <span className="pizza-info">Sauce : </span>
                        <span>{pizza.sauce?.name}</span>
                    </div>

                    <div>
                        <span className="pizza-info">Cheese : </span>
                        <span>{pizza.cheese?.name}</span>

                    </div>
                    <div>
                    <div className="pizza-info"> Toppings : </div>
                    <div className="toppings-container">
                    {toppings.map((toppingObj) => {
                    return (
                        <span key={toppingObj.id}>
                            <div>{toppingObj.topping?.name} </div></span>
                    )
                })}                    </div>

                    </div>
                    
                
            <footer className="pizza-button">
                    <button 
                    className="btn-warning"
                    onClick={handleDeletePizza}
                    disabled={isOrderDetailsPage}
                    hidden={isOrderDetailsPage}
                    >Delete Pizza</button>
            </footer>
        </section>
    )
}