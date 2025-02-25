import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { finalizeOrder, getOrderById } from "../../services/orderServices"
import { formatToDollars } from "../../services/utilityServices"
import { getEmployeeById } from "../../services/employeeServices"
import { PizzaDetails } from "../pizza/PizzaDetails"
import "./Orders.css"

export const OrderDetails = () => {
    const [currentOrder, setCurrentOrder] = useState({pizzas: []})
    const [foundOrderTaker, setFoundOrderTaker] = useState({})
    const [foundDriver, setFoundDriver] = useState({})
    const [initialTipValue, setInitialTipValue] = useState(0)

    const { orderId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getOrderById(orderId).then((orderObj) => {
            setCurrentOrder(orderObj)
            setInitialTipValue(orderObj.tipAmount)
        })
    }, [orderId])

    useEffect(() => {
        getEmployeeById(currentOrder.employeeId).then((employeeObj) => {
            setFoundOrderTaker(employeeObj)
        })
    }, [currentOrder])

    useEffect(() => {
        if (currentOrder.driverId) {
            if (currentOrder.driverId == currentOrder.employeeId) {
                setFoundDriver(foundOrderTaker)
            } else {
                getEmployeeById(currentOrder.driverId).then((driverObj) => {
                    setFoundDriver(driverObj)
                })
            }
        }
    } , [currentOrder, foundOrderTaker])

    const handleInputChange = (event) => {
        const stateCopy = { ...currentOrder }
        stateCopy[event.target.name] = parseFloat(event.target.value)
        if (event.target.name === "tipAmount") {
            stateCopy.totalCost = stateCopy.subtotal + stateCopy.tipAmount
        }
        setCurrentOrder(stateCopy)
    }

    const handleUpdateTip = (event) => {
        event.preventDefault()

        const updatedOrder = (({pizzas, ...currentOrderObj}) => currentOrderObj)(currentOrder)
        finalizeOrder(updatedOrder).then(() => {
            navigate(`/orders`)
        })
    }
    
    return (
        <section className="order-details-container">
            

            <header>
                Order Id : {currentOrder.id}
            </header>
            <div className="form-group">
                <label className="order-info">Table Number : </label>
                {currentOrder.tableNumber ? currentOrder.tableNumber : "n/a"}
            </div>
            <div className="form-group">
                <label className="order-info">Delivery : </label>
                {currentOrder.isDelivery ? "Yes" : "No"}
            </div>
            <div className="form-group">
                <label className="order-info">Subtotal : </label>
                {formatToDollars(currentOrder.subtotal)}
            </div>
            <div className="form-group">
                <label className="order-info">Delivery Surcharge : </label>
                {currentOrder.isDelivery ? currentOrder.deliverySurcharge : "n/a"}
            </div>
            <div className="form-group">
                <label className="order-info">Tip Amount : </label>
                <input 
                type="number"
                name="tipAmount"
                value={currentOrder.tipAmount ? currentOrder.tipAmount : 0}
                onChange={handleInputChange}/>
                {initialTipValue != currentOrder.tipAmount ? (
                    <span><button 
                    className="btn-primary"
                    onClick={handleUpdateTip}>Update Tip</button></span>
                ) : ""}
                
            </div>
            <div className="form-group">
                <label className="order-info">Total : </label>
                {formatToDollars(currentOrder.totalCost)}
            </div>
            <div className="form-group">
                <label className="order-info">Order Date : </label>
                {currentOrder.orderDateTime}
            </div>
            <div className="form-group">
                <label className="order-info">Order Taken By : </label>
                {foundOrderTaker.fullName}
            </div>
            <div className="form-group">
                <label className="order-info">Driver : </label>
                {currentOrder.isDelivery ? foundDriver.fullName : "n/a"}
            </div>
            <footer>
                {currentOrder.pizzas.map((pizzaObj) => {
                    return (
                        <PizzaDetails key={pizzaObj.id} pizzaId={pizzaObj.id}/>
                    )
                })}
            </footer>

        </section>
    )
}