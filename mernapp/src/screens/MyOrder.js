import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './MyOrder.css'; // Import the CSS file

export default function MyOrder() {
    const [orders, setOrders] = useState([]);
    // const userEmail = "apple@gmail.com"; // Replace this with the actual user email, possibly from context or props

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://food-app-woad-iota.vercel.app/myorderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email:localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            setOrders(data.orderData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="order-container">
                {orders.length > 0 ? (
                    orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="order-item">
                            <h3>Order {orderIndex + 1}</h3>
                            <p>Order Date: {order[0].Order_date}</p>
                            <ul>
                                {order.slice(1).map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <p>Name: {item.name}</p>
                                        <p>Quantity: {item.qty}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Price: {item.price}</p>
                                        <img src={item.img} alt={item.name} style={{ width: '100px' }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
