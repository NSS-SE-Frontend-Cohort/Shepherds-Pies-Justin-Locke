import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { EmployeeNavBar } from "../components/nav/EmployeeNavBar"
import { EmployeeOrderForm } from "../components/forms/EmployeeOrderForm"
import { OrderList } from "../components/orders/OrderList"
import { StartOrderForm } from "../components/forms/StartOrderForm"
import { OrderDetails } from "../components/orders/OrderDetails"

export const EmployeeViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <EmployeeNavBar />
                    <Outlet />
                </>
            }>

            <Route index element={<Welcome />} />

            <Route path="/orders" >
                <Route index element={<OrderList currentUser={currentUser}/>} />
                <Route path=":orderId" element={<OrderDetails />} />
                <Route path="create" >
                    <Route index element={<StartOrderForm currentUser={currentUser} />} />
                    <Route path=":orderId" element={<EmployeeOrderForm currentUser={currentUser}/>} />
                </Route>
                
            </Route>

            </Route>
        </Routes>
    )
}