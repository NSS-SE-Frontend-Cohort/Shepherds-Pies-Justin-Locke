import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrderById } from "../../services/orderServices"
import { formatToDollars } from "../../services/utilityServices"
import { getEmployeeById } from "../../services/employeeServices"
import { PizzaDetails } from "../pizza/PizzaDetails"

export const OrderDetails = () => {
    const [currentOrder, setCurrentOrder] = useState({pizzas: []})
    const [foundOrderTaker, setFoundOrderTaker] = useState({})
    const [foundDriver, setFoundDriver] = useState({})

    const { orderId } = useParams()

    useEffect(() => {
        getOrderById(orderId).then((orderObj) => {
            setCurrentOrder(orderObj)
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
    
    return (
        <section className="order">
            <header>
                Order Id : {currentOrder.id}
            </header>
            <div>
                <span className="order-info">Table Number : </span>
                {currentOrder.tableNumber}
            </div>
            <div>
                <span className="order-info">Delivery : </span>
                {currentOrder.isDelivery ? "Yes" : "No"}
            </div>
            <div>
                <span className="order-info">Subtotal : </span>
                {formatToDollars(currentOrder.subTotal)}
            </div>
            <div>
                <span className="order-info">Delivery Surcharge : </span>
                {currentOrder.isDelivery ? currentOrder.deliverySurcharge : "n/a"}
            </div>
            <div>
                <span className="order-info">Tip Amount : </span>
                {formatToDollars(currentOrder.tipAmount)}
            </div>
            <div>
                <span className="order-info">Total : </span>
                {formatToDollars(currentOrder.totalCost)}
            </div>
            <div>
                <span className="order-info">Order Date : </span>
                {currentOrder.orderDateTime}
            </div>
            <div>
                <span className="order-info">Order Taken By : </span>
                {foundOrderTaker.fullName}
            </div>
            <div>
                <span className="order-info">Driver : </span>
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