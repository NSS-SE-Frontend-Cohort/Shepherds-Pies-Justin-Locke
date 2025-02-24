import { useEffect, useState } from "react"
import { deletePizzaById, getPizzaById, getToppingsByPizzaId } from "../../services/pizzaServices"
import "./Pizza.css"

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

    
    return (
        <section className="pizza">
            <header>
                    <div>Size : {pizza.size?.name}</div>
                    <div>Sauce : {pizza.sauce?.name}</div>
                    <div>Cheese : {pizza.cheese?.name}</div>
                <div className="pizza-footer"> Toppings : 
                    {toppings.map((toppingObj) => {
                    return (
                        <div key={toppingObj.id}>{toppingObj.topping?.name} </div>
                    )
                })}</div>
            </header>
            <footer>
                <div>
                    <button 
                    className="btn-warning"
                    onClick={handleDeletePizza}
                    >Delete Pizza</button>
                </div>

            </footer>
        </section>
    )
}