import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderServices"
import { Order } from "./Order"
import { OrderFilterBar } from "./OrderFilterBar"

export const OrderList = ({ currentUser }) => {
    const [allOrders, setAllOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [filterMode, setFilterMode] = useState("")

    const getAndSetOrders = () => {
        getAllOrders().then((orders) => {
            setAllOrders(orders)
        })
    }
    
    useEffect(() => {
        getAndSetOrders()
    }, [currentUser])
    

    useEffect(() => {
        if (filterMode === "delivery") {
            const deliveryOrders = allOrders.filter(
                (order) => order.isDelivery == true
            )
            setFilteredOrders(deliveryOrders)
        } else if (filterMode === "dine-in") {
            const dineInOrders = allOrders.filter(
                (order) => order.isDelivery == false
            )
            setFilteredOrders(dineInOrders)
        } else {
            setFilteredOrders(allOrders)
        }
    }, [filterMode, allOrders])

    
    return (
        <div className="orders-container">
            <h2>Orders</h2>
            <OrderFilterBar 
            setFilterMode={setFilterMode}
            />

            <article className="orders">
                {filteredOrders.map((orderObj) => {
                    return (
                        <Order 
                        order={orderObj}
                        currentUser={currentUser}
                        getAndSetOrders={getAndSetOrders}
                        key={orderObj.id}/>
                    )
                })}
            </article>

        </div>
    )
}