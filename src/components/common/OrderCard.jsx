const OrderCard = ({ order }) => {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg my-3 shadow">
        <p className="dark:text-white">
          <strong>Order ID:</strong> {order._id}
        </p>
        <p className="dark:text-white">
          <strong>Total Amount:</strong> ₹{order.totalAmount}
        </p>
        <p className="dark:text-white">
          <strong>Payment:</strong> {order.paymentStatus}
        </p>
        <p className="dark:text-white">
          <strong>Products:</strong> {order.products.map((p) => p.name).join(", ")}
        </p>
        <p className="dark:text-white">
          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
    );
  };
  
  export default OrderCard;
  