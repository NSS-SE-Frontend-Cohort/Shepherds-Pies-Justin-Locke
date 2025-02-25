import { useEffect, useState } from "react"
import { getEmployeeUsers } from "../../services/userServices"
import { formatToDollars } from "../../services/utilityServices"
import "./Orders.css"
import { deleteOrder } from "../../services/orderServices"
import { useNavigate } from "react-router-dom"

export const Order = ({order, getAndSetOrders }) => {
    const [allEmployees, setAllEmployees] = useState([])
    const [employeeTookOrder, setEmployeeTookOrder] = useState({})
    const [deliveryDriver, setDeliveryDriver] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getEmployeeUsers().then((employeesArray) => {
            setAllEmployees(employeesArray)
        })
    }, [])

    useEffect(() => {
        const orderTaker = allEmployees.find(employee => employee.id === order.employeeId)
        setEmployeeTookOrder(orderTaker)
    }, [allEmployees, order])

    useEffect(() => {
        if (order.driverId) {
            const driver = allEmployees.find(employee => employee.id === order.driverId)
            setDeliveryDriver(driver)
        }
    }, [allEmployees, order])

    const handleDeleteOrder = () => {
        deleteOrder(order.id).then(() => {
            getAndSetOrders()
            navigate(`/orders`)
        })
    }

    return (
        <section className="order" >
            <header className="order-info">#{order.id}</header>
            <div>Item Count : {order.pizzas?.length}</div>
            <div>Tip : {formatToDollars(order.tipAmount)}</div>
            <div>Total Cost : {formatToDollars(order.totalCost)} </div>
            <footer>
                <div>
                    <div className="order-info">order taken by</div>
                    <div>{employeeTookOrder ? employeeTookOrder.fullName : ""}</div>
                </div>
                <div>
                    <div className="order-info">delivery driver</div>
                    <div>{deliveryDriver ? deliveryDriver.fullName : ""}</div>
                </div>
                <button 
                className="btn-warning"
                onClick={handleDeleteOrder}>
                    Delete Order
                </button>
            </footer>
        </section>
    )
}