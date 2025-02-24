import { useEffect, useRef, useState } from "react"
import { CreatePizzaForm } from "./CreatePizzaForm"
import { deleteOrder, finalizeOrder, getOrderById } from "../../services/orderServices"
import { useNavigate, useParams } from "react-router-dom"
import { PizzaDetails } from "../pizza/PizzaDetails"
import { getPizzasByOrderId } from "../../services/pizzaServices"
import "./Form.css"
import { formatToDollars } from "../../services/utilityServices"

export const EmployeeOrderForm = ({ currentUser }) => {
    const [pizzas, setPizzas] = useState([])
    const [order, setOrder] = useState({})
    const [subtotal, setSubtotal] = useState(0)
    const [buildingPizza, setBuildingPizza] = useState(false)

    const navigate = useNavigate()

    const { orderId } = useParams()

    const pizzaFormRef = useRef(null)

    useEffect(() => {
        getOrderById(orderId).then((orderObj) => {
            setOrder(orderObj)
        })
    } , [orderId])

    useEffect(() => {
        const cleanUrl = `/orders/create/${orderId}`
        if (window.location.pathname + window.location.search !== cleanUrl) {
            navigate(cleanUrl, { replace: true })
        }
    }, [orderId, navigate])
    
    useEffect(() => {
        getAndSetPizzas()
    }, [order])

    useEffect(() => {
        if (buildingPizza && pizzaFormRef) {
            pizzaFormRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [buildingPizza])

    useEffect(() => {
        let currentSubtotal = 0
        for (const pizza of pizzas) {
            currentSubtotal += pizza.pizzaCost
        }
        if (order.isDelivery) {
            currentSubtotal += 5
        }

        setSubtotal(currentSubtotal)
    }, [pizzas])

    const handleDeleteOrder = (event) => {
        event.preventDefault()

        deleteOrder(orderId).then(() => {
            navigate('/orders')
        })
    }

    const getAndSetPizzas = () => {
        getPizzasByOrderId(order.id).then((pizzaArray) => {
            setPizzas(pizzaArray?.pizzas || [])
        })
    }

    const handleSubmitOrder = (event) => {
        event.preventDefault()

       const tipInput = window.prompt("Would you like to add a tip? Enter the amount:" , "0")

       const tipAmount = parseFloat(tipInput)
       if (isNaN(tipAmount) || tipAmount < 0) {
        alert("Invalid tip amount. Please enter a valid number.")
        return
       }
       
        const finishedOrder = {
            id: order.id,
            tableNumber: order.tableNumber,
            isDelivery: order.isDelivery,
            subtotal: subtotal,
            deliverySurcharge: order.isDelivery ? 5 : "",
            tipAmount: tipAmount,
            totalCost: tipAmount + subtotal,
            orderDateTime: new Date(),
            employeeId: order.employeeId,
            driverId: parseInt(order.driverId)
        }

        finalizeOrder(finishedOrder).then(() => {
            navigate(`/orders`)
        })

    }

    return (
        <>
        <form>
            <div className="order-container">
            <h2>New Order</h2>
            <header>
            <span>Order # : {order.id}</span>
            <span> Subtotal : {formatToDollars(subtotal)}</span>
            
            </header>
            <div className="btn-container">
            {!buildingPizza ? 
            <button 
            className="btn-primary"
            onClick={() => setBuildingPizza(true)}>Add Pizza</button>
            : "" }
            <button 
            className="btn-warning"
            onClick={handleDeleteOrder}>Delete  Order</button>
            <button className="btn-info"
            onClick={handleSubmitOrder}>
                Submit Order
            </button>
            </div>
            </div>
            
            
            <div className="pizzas-container">
                {pizzas.map((pizzaObj) => {
                    return (
                        <div key={pizzaObj.id}>
                        <div> Pizza # {pizzaObj.id}
                            <PizzaDetails pizzaId={pizzaObj.id}/>
                        </div>
                        </div>
                    )
                })}
            </div>
            
            </form>
            {buildingPizza ? (
                <div ref={pizzaFormRef}>
                <CreatePizzaForm 
                order={order}
                getAndSetPizzas={getAndSetPizzas}
                />
                                </div>
            ) : ""}
            
        </>
       )}