export const OrderFilterBar = ({ setShowDeliveryOnly }) => {
    return (
        <div className="filter-bar">
            <button
                className="filter-btn btn-primary"
                onClick={() => {
                    setShowDeliveryOnly(true)
                }}>
                    Deliveries
            </button>
            <button
                className="filter-btn btn-info"
                onClick={() => {
                    setShowDeliveryOnly(false)
                }}>
                    All Orders
            </button>
        </div>
    )
}