import React from "react";

function TxElement(props) {
    return (
        <div>
            <div>hash: {props.tx.hash}</div>
            <div>gasUsed: {props.tx.gasUsed}</div>
            <div>gasPrice: {props.tx.gasPrice}</div>
            <div>price: {props.tx.price}</div>
            <div>to: {props.tx.to}</div>
            <div>from: {props.tx.from}</div>
            <div>value: {props.tx.value}</div>
            <br/>
        </div>
    );
}

export default TxElement;