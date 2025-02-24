import { useEffect, useState } from "react"
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
  
    useEffect(() => {
      const localUser = localStorage.getItem("shepherd_pie_user")
      const userObject = JSON.parse(localUser)
  
      setCurrentUser(userObject)
    }, [])
    
    return currentUser.isStaff 
    ? 
    <EmployeeViews currentUser={currentUser} /> 
    : 
    <CustomerViews currentUser={currentUser}/>
  }