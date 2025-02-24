import { useEffect, useState } from "react"
import { getAllDeliveryDrivers } from "../../services/employeeServices"
import { createOrder } from "../../services/orderServices"
import { useNavigate } from "react-router-dom"
import "./Form.css"

export const StartOrderForm = ({ currentUser }) => {
    const [newOrder, setNewOrder] = useState({})
    const [drivers, setDrivers] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const newOrder = {
            employeeId: currentUser.id,
            tableNumber: "",
            isDelivery: false,
            driverId: "",
        }
        setNewOrder(newOrder)

        getAllDeliveryDrivers().then((driverArray) => {
            setDrivers(driverArray)
        })
    }, [])
    
const handleDeliveryStateChange = (event) => {
    const orderCopy = { ...newOrder }
        orderCopy.isDelivery = event.target.checked
        if (!orderCopy.isDelivery && orderCopy.driverId) {
            orderCopy.driverId = ""
        }
        if (orderCopy.isDelivery && orderCopy.tableNumber) {
            orderCopy.tableNumber = ""
        }
        setNewOrder(orderCopy)
}

const handleStartOrder = (event) => {
    event.preventDefault()

    if (newOrder.tableNumber || newOrder.driverId) {
        createOrder(newOrder).then((startedOrder) => {
            navigate(`/orders/create/${startedOrder.id}`)
        })
    }
}
    
    return (
        <form className="form-start-order">
            <fieldset className="form-group">
        <label>Table Number:</label>
        <input
          type="text"
          name="tableNumber"
          value={newOrder.tableNumber}
          onChange={(event) => {
            const orderCopy = { ...newOrder }
            orderCopy.tableNumber = parseInt(event.target.value)
            setNewOrder(orderCopy)
          }}
          disabled={newOrder.isDelivery}
          className="form-control"
        />
      </fieldset>
      <fieldset className="form-group">
        <div>
        <label>
          <input
            type="checkbox"
            name="isDelivery"
            checked={newOrder.isDelivery}
            onChange={handleDeliveryStateChange}
            className="form-control"
          />
          Delivery Order
        </label>
        </div>
            <div>
      {newOrder.isDelivery ? (
        <span>
        <select
        onChange={(event) => {
            const orderCopy = { ...newOrder }
            orderCopy.driverId = event.target.value
            setNewOrder(orderCopy)
        }}
        disabled={!newOrder.isDelivery}
        className="form-control">
            <option
            value={""}>Delivery Driver</option>
            {drivers.map((driver) => {
                return (
                    <option
                    key={driver.id}
                    value={driver.id}
                    >{driver.fullName}</option>
                )
            })}
        </select>
        </span>

      ) : ""}
      </div>
      <footer className="form-start-order-footer">
      <button 
      className="btn-info"
      onClick={handleStartOrder}>
        Start Order
      </button>
      </footer>

    </fieldset>
    </form>
    )
}