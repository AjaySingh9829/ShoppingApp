import React, { Fragment, useContext, useState } from "react";
import styles from "./style.module.css";
import Close from "../../icons/closeIcon";
import Button from "../button";
import CartItem from "./cartItem";
import { CartContext } from "../../cartcontext";
import CartButton from "../cartButton";

const SideCartBar = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    handleOpenCartBar,
    handleCloseCartBar,
    openCartBar,
  } = useContext(CartContext);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Fragment>
      <CartButton onClick={handleOpenCartBar} />

      {openCartBar && (
        <>
          <div
            className={`${styles.sidebar} ${openCartBar ? styles.open : ""}`}
          >
            <div className={styles.sb_head}>
              <div className={styles.sbh_inner}>
                <div className={styles.sbh_title}>
                  Shopping Cart ({cart.length})
                </div>
                <button onClick={handleCloseCartBar} className={styles.sbh_cls}>
                  <Close />
                </button>
              </div>
            </div>
            <div className={styles.sb_body}>
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  id={item.id}
                  quantity={item.quantity}
                  imgUrl={item.image}
                  name={item.title}
                  color={item.color}
                  price={item.price}
                  count={item.count}
                  removeFromCart={removeFromCart}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <div className={styles.sb_foot}>
              <div className={styles.sbf_inner}>
                <div className={styles.sbfi_pc}>
                  <span>{cart.length} Product(s)</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <div className={styles.sbfi_btns}>
                  <Button
                    to={"/checkout"}
                    size="large"
                    type="fillround"
                    text="Checkout"
                    customCss={styles.sidecartbtn}
                    onClick={handleCloseCartBar}
                  />
                  <Button
                    to={"/cart"}
                    size="small"
                    type="outlineround"
                    text="View Cart"
                    onClick={handleCloseCartBar}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.cb_overlay} ${openCartBar ? styles.open : ""}`}
            onClick={handleCloseCartBar}
          ></div>
        </>
      )}
    </Fragment>
  );
};

export default SideCartBar;
