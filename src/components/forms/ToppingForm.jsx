import { useEffect, useState } from "react"
import "./Form.css"

export const ToppingForm = ({ topping, pizza, setPizza }) => {
    const [checked , setChecked] = useState(false)
    const [price, setPrice] = useState(parseFloat(.5))

    useEffect(() => {
        let updatedToppings = [ ...pizza.toppings ]
        if (checked) {
            updatedToppings.push({ toppingId: topping.id, cost: parseFloat(price) }) // Add Topping
        } else {
            updatedToppings = updatedToppings.filter(currentTopping => currentTopping.toppingId !== topping.id) // Remove Topping
        }

        setPizza({ ...pizza, toppings: updatedToppings})
    }, [checked])

    useEffect(() => {
        let updatedToppings = pizza.toppings.map((currentTopping) => {
            if (currentTopping.toppingId === topping.id) {
                return { ...currentTopping, cost: parseFloat(price)} // Update price of current selected topping
            }
            return currentTopping
        })

        setPizza({ ...pizza, toppings: updatedToppings}) // Update topping 
    }, [price])
    
    const handlePriceChange = (event) => {
        const newPrice = event.target.value
        setPrice(parseFloat(newPrice))
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
                            <label className="form-toppings-price">
                                Price :
                                <input 
                                type="number"
                                min={0.50}
                                max={1.00}
                                step={.01}
                                defaultValue={parseFloat(.50)}
                                onChange={handlePriceChange}
                                />
                                
                            </label>
                            : ""}
                            </span>
                            

                            </div>
    )
}