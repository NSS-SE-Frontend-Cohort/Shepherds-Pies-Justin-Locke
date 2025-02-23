import { useEffect, useState } from "react"
import { CreatePizzaForm } from "./CreatePizzaForm"
import { createOrder } from "../../services/orderServices"
import { getAllDeliveryDrivers } from "../../services/employeeServices"

export const EmployeeOrderForm = ({ currentUser }) => {
    const [pizzas, setPizzas] = useState([])
    const [order, setOrder] = useState({})
    const [drivers, setDrivers] = useState()

    useEffect(() => {
        createOrder().then((order) => {

        })
    } , [])

    useEffect(() => {
        getAllDeliveryDrivers().then((driverArray) => {
            setDrivers(driverArray)
        })
    }, [])


    return (
        <form>
            <fieldset>
        <label>Table Number:</label>
        <input
          type="text"
          name="tableNumber"
          value={order.tableNumber}
          disabled={order.isDelivery}
        />
      </fieldset>
      <fieldset>
        <div>
        <label>
          <input
            type="checkbox"
            name="isDelivery"
            checked={order.isDelivery}
            onChange={(event) => {
                const orderCopy = { ...order }
                orderCopy.isDelivery = event.target.checked
                setOrder(orderCopy)
            }}
          />
          Delivery Order
        </label>
      {order.isDelivery ? (
        <select>
            <option>Delivery Driver</option>
            {drivers.map((driver) => {
                return (
                    <option
                    value={driver.id}>{driver.fullName}</option>
                )
            })}
        </select>
      ) : ""}
      </div>
      <button className="btn-info">
        Start Order
      </button>
      </fieldset>
            <h2>New Order</h2>

            <button className="btn-primary">Add Pizza</button>
        <CreatePizzaForm />

        <button className="btn-warning">Delete  Order</button>
        </form>
    )
}