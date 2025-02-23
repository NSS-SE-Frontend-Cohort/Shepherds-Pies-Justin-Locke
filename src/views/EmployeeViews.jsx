import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { EmployeeNavBar } from "../components/nav/EmployeeNavBar"
import { EmployeeOrderForm } from "../components/forms/EmployeeOrderForm"
import { OrderList } from "../components/orders/OrderList"

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
                <Route path="create" element={<EmployeeOrderForm currentUser={currentUser}/>} />
            </Route>

            </Route>
        </Routes>
    )
}