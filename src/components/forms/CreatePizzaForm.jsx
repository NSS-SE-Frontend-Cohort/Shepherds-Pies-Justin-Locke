import { useEffect, useState } from "react"
import { createPizza, createPizzaAddOn, getAllCheeses, getAllSauces, getAllSizes, getAllToppings } from "../../services/pizzaServices"
import { ToppingForm } from "./ToppingForm"
import { useNavigate } from "react-router-dom"

export const CreatePizzaForm = ({ order }) => {
    const [sizes, setSizes] = useState([])
    const [sauces, setSauces] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [toppings, setToppings] = useState([])
    const [baseCost, setBaseCost] = useState(0)
    const [pizza, setPizza] = useState({toppings: []})

    const navigate = useNavigate()

    useEffect(() => {
        getAllSizes().then((sizesArray) => {
            setSizes(sizesArray)
        })

    },  [])

    useEffect(() => {
        getAllSauces().then((sauceArray) => {
            setSauces(sauceArray)
        })
    }, [])

    useEffect(() => {
        getAllCheeses().then((cheeseArray) => {
            setCheeses(cheeseArray)
        })
    }, [])

    useEffect(() => {
        getAllToppings().then((toppingsArray) => {
            setToppings(toppingsArray)
        })
    }, [])

    useEffect(() => {
        const newPizza = {
            orderId: order.id,
            toppings: []
        }
    }, [order])

    const handleAddPizza = () => {

        const addedToppings = pizza.toppings
        
        let currentToppingCost = 0;
        for (const topping of addedToppings) {
            currentToppingCost += topping.cost
        }

        
        const pizzaToMake = {
            orderId: order.id,
            sizeId: pizza.sizeId,
            sauceId: pizza.sauceId,
            cheeseId: pizza.cheeseId,
            pizzaCost: currentToppingCost + baseCost
        }
        

        createPizza(pizzaToMake).then((madePizza) => {
            for (const topping of addedToppings) {
                topping.pizzaId = madePizza.id
                topping.orderId = order.id
                createPizzaAddOn(topping)
            }
            
        }).then(() => {
            navigate(`/orders/create/${order.id}`)
        })

    }

    const handleSizeChange = ( event, size ) => {
        const pizzaCopy = { ...pizza }
            pizzaCopy.sizeId = parseInt(event.target.value)
            setPizza(pizzaCopy)

            // Update total cost based on selected size
            setBaseCost(parseFloat(size.baseCost))
    }


    return (
        <form>
            <h2>New Pizza</h2>
            <fieldset>
                <div className="form-group">
                    <h3>Pizza size</h3>
                        {sizes.map((size) => {
                            return (
                            <label key={size.id}>
                                <input 
                                type="radio"
                                name="size"
                                value={size.id}
                                onChange={(event) => handleSizeChange( event, size)}
                                required
                                    />
                                    {size.name} - (+${size.baseCost.toFixed(2)})
                                    </label>
                            )
                        })}
                </div>
                
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <h3>Pizza sauce</h3>
                        {sauces.map((sauce) => {
                            return (
                                <label key={sauce.id}>
                                    <input
                                    type="radio"
                                    name="sauce"
                                    value={sauce.id}
                                    onChange={(event) => {
                                        const pizzaCopy = { ...pizza }
                                        pizzaCopy.sauceId = parseInt(event.target.value)
                                        setPizza(pizzaCopy)
                                    }}
                                    required
                                    />
                                    {sauce.name}
                                </label>
                            )
                        })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <h3>Cheese</h3>
                    {cheeses.map((cheese) => {
                        return (
                            <label key={cheese.id}>
                                <input
                                type="radio"
                                name="cheese"
                                value={cheese.id}
                                onChange={(event) => {
                                    const pizzaCopy = { ...pizza }
                                    pizzaCopy.cheeseId = parseInt(event.target.value)
                                    setPizza(pizzaCopy)
                                }}
                                required
                                />
                                {cheese.name}
                            </label>
                        )
                    })}

                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <h3>Toppings</h3>
                    {toppings.map((topping) => {
                        return (
                            <ToppingForm
                            topping={topping}
                            pizza={pizza}
                            setPizza={setPizza}
                            key={topping.id}
                            />
                        )
                    })}
                    
                </div>
            </fieldset>
            <footer>
                <button 
                className="btn-info"
                onClick={handleAddPizza}>Add Pizza</button>
            </footer>
        </form>
    )
}