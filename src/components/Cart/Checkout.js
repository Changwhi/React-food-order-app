import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 6;

const Checkout = (props) => {
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });


    const confirmHandler = (event) => {
        event.preventDefault();

        const userName = nameRef.current.value;
        const street = streetRef.current.value;
        const postalCode = postalCodeRef.current.value;
        const city = cityRef.current.value;

        const userNameValid = !isEmpty(userName);
        const streetValid = !isEmpty(street);
        const postalcodeValid = isFiveChars(postalCode);
        const cityValid = !isEmpty(city);

        setFormValidity({
            name: userNameValid,
            street: streetValid,
            postalCode: postalcodeValid,
            city: cityValid,
        })
        const isValid = userNameValid && streetValid && postalcodeValid && cityValid

        if (!isValid) {
            return
        }

        props.onUpdate({
            name: userName,
            street: street,
            postalCode: postalCode,
            city: city,
        })

    };



    const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formValidity.city ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formValidity.name && <p>Invalid input!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formValidity.street && <p>Invalid input!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeRef} />
                {!formValidity.postalCode && <p>Invalid input!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formValidity.city && <p>Invalid input!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
