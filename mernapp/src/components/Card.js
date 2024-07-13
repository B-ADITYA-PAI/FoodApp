import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let foodItem = props.foodItem;  // Ensure we're using the correct prop name
  let options = props.options || {};  // Ensure options is defined
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size] || 0); // Ensure options[size] is defined
  
    if (!foodItem || !foodItem._id) {
      console.error("foodItem or foodItem._id is undefined");
      return;
    }
  
    let food = null;
    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }
  
    console.log(food);
    console.log(new Date());
  
    if (food) {
      // Update the quantity if the item exists and the sizes match
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size });
    } else {
      // Add the new item to the cart if it doesn't exist
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img });
    }
  };
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              ₹{qty * parseInt(options[size] || 0)}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
