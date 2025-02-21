import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { EmployeeNavBar } from "../components/nav/EmployeeNavBar"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <EmployeeNavBar />
                    <Outlet />
                </>
            }>

            <Route index element={<Welcome />} />

            </Route>
        </Routes>
    )
}