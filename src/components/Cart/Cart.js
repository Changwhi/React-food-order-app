import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/Cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmtting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };


    const cartitems = <ul className={classes['cart-items']}>{
        cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
                price={item.price} />)}</ul>;

    const checkoutHandler = () => {
        setIsCheckout(true);
    };

    const modalButtons = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
        </div>
    );

    const onUpdate = async (data) => {
        setIsSubmtting(true)
        const response = await fetch("https://react-food-ordering-ff3f4-default-rtdb.firebaseio.com/", {
            method: "post",
            body: JSON.stringify({
                user: data,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmtting(false)
        setIsSent(true)
        cartCtx.clearItem()
    }

    const defaultModal = <React.Fragment>
        {cartitems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onUpdate={onUpdate} onCancel={props.onClose} />}
        {!isCheckout && modalButtons}
    </React.Fragment>

    const submittingModal = <p> Submitting.. </p>

    const sentModal = <p> Complete </p>

    return (
        <Modal onClose={props.onClose}>
        {!isSubmitting && !isSent && defaultModal}
        {isSubmitting && submittingModal}
        {!isSubmitting && isSent && sentModal}
        </Modal>
    );
};

export default Cart;
