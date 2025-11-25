import React from "react";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div key={item.id} className="cart-item">
      <img src={item.imagenes} alt={item.nombre} className="cart-item-img" />
      <div className="cart-item-info">
        <h3>{item.nombre}</h3>
        <p>Precio: ${item.precio}</p>
        <p>Cantidad: {item.cantidad}</p>
        <div className="cart-item-buttons">
          <button onClick={() => onIncrement(item.id)}>+</button>
          <button onClick={() => onDecrement(item.id)}>-</button>
          <button onClick={() => onRemove(item.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
