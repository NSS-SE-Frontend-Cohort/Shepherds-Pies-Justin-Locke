import { useEffect, useState } from "react"
import { getEmployeeUsers } from "../../services/userServices"
import { formatToDollars } from "../../services/utilityServices"
import "./Orders.css"

export const Order = ({order, currentUser }) => {
    const [allEmployees, setAllEmployees] = useState([])
    const [employeeTookOrder, setEmployeeTookOrder] = useState({})
    const [deliveryDriver, setDeliveryDriver] = useState({})

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
        if (order.deliveryDriverId) {
            const driver = allEmployees.find(employee => employee.id === order.deliveryDriverId)
            setDeliveryDriver(driver)
        }
    }, [allEmployees, order])

    return (
        <section className="order" >
            <header className="order-info">#{order.id}</header>
            <div>Item Count : {order.pizzas?.length}</div>
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

            </footer>
        </section>
    )
}