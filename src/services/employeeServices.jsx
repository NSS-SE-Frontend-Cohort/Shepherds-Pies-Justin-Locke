export const getAllDeliveryDrivers = () => {
    return fetch(`http://localhost:8088/users?isStaff=true&isDriver=true`).then(res => res.json())
}