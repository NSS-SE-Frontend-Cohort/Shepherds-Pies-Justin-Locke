export const OrderFilterBar = ({ setFilterMode }) => {
    return (
        <div className="filter-bar">
            <button
                className="filter-btn btn-primary"
                onClick={() => {
                    setFilterMode("delivery")
                }}>
                    Deliveries
            </button>
            <button
                className="filter-btn btn-primary"
                onClick={() => {
                    setFilterMode("dine-in")
                }}>
                    Dine In
            </button>
            
            <button
                className="filter-btn btn-info"
                onClick={() => {
                    setFilterMode("")
                }}>
                    All Orders
            </button>
        </div>
    )
}