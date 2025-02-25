export const getAllDeliveryDrivers = () => {
    return fetch(`http://localhost:8088/users?isStaff=true&isDriver=true`).then(res => res.json())
}

export const getEmployeeById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`).then(res => res.json())
}