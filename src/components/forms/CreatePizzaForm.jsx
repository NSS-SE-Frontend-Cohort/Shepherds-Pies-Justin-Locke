import { useEffect, useState } from "react"
import { getAllCheeses, getAllSauces, getAllSizes, getAllToppings } from "../../services/pizzaServices"
import { ToppingForm } from "./ToppingForm"

export const CreatePizzaForm = () => {
    const [sizes, setSizes] = useState([])
    const [sauces, setSauces] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [toppings, setToppings] = useState([])
    const [pizza, setPizza] = useState({ toppings: [] })

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
                                onChange={(event) => {
                                    const pizzaCopy = { ...pizza }
                                    pizzaCopy.sizeId = event.target.value
                                    setPizza(pizzaCopy)
                                }}
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
                                        pizzaCopy.sauceId = event.target.value
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
                                    pizzaCopy.cheeseId = event.target.value
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
        </form>
    )
}