import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3' style={{ color: '#000' }}>
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://food-app-woad-iota.vercel.app/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ color: '#000', backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '20px' }}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover' style={{ color: '#000' }}>
          <thead className='text-primary fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn p-0'>
                    <Delete onClick={() => { dispatch({ type: 'REMOVE', index: index }); }} style={{ color: '#dc3545' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center'>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div className='text-center'>
          <button className='btn bg-primary text-white mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
