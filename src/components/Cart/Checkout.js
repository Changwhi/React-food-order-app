import React from "react"
import classes from "./Checkout.module.css"

const Checkout = (props) => {
    return <React.Fragment>
    <form>
        <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type='text' id='name' />
        </div>
        <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input type="text" id='address' />
        </div>
        <div className={classes.control}>
            <label htmlFor="street"> Street </label>
            <input type="text" id='street' />
        </div>

        <button type="button" onClick={props.onClose}> Cancel </button>
        <button>Confirm</button>
    </form>
        </React.Fragment>

}

export default Checkout
