import { useEffect, useState } from "react"
import { formatToDollars } from "../../services/utilityServices"

export const ToppingForm = ({ topping, pizza, setPizza }) => {
    const [checked , setChecked] = useState(false)
    const [price, setPrice] = useState(.5)

    useEffect(() => {
        let updatedToppings = [ ...pizza.toppings ]
        if (checked) {
            updatedToppings.push({ id: topping.id, cost: price }) // Add Topping
        } else {
            updatedToppings = updatedToppings.filter(currentTopping => currentTopping.id !== topping.id) // Remove Topping
        }

        setPizza({ ...pizza, toppings: updatedToppings})
    }, [checked])

    useEffect(() => {
        let updatedToppings = pizza.toppings.map((currentTopping) => {
            if (currentTopping.id === topping.id) {
                return { ...currentTopping, cost: price}
            }
            return currentTopping
        })

        setPizza({ ...pizza, toppings: updatedToppings})
    }, [price])
    
    const handlePriceChange = (event) => {
        const newPrice = event.target.value
        setPrice(newPrice)
    }
    
    return (
        <div>

                            <label key={topping.id}>
                                <input 
                                type="checkbox"
                                name="topping"
                                value={topping.id}
                                onChange={(event) => {
                                    setChecked(event.target.checked)
                                }}
                                />
                                {topping.name}
                            </label>
                            <span>
                                {checked ? 
                            <label>
                                Price :
                                <input 
                                type="number"
                                min={0.50}
                                max={1.00}
                                step={.05}
                                defaultValue={0.50}
                                onChange={handlePriceChange}
                                />
                                
                            </label>
                            : ""}
                            </span>
                            

                            </div>
    )
}