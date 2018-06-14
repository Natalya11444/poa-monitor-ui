import React from "react";

function BlockElement(props) {
    return (
        <div>
            <div>number: {props.block.number}</div>
            <div>hash: {props.block.hash}</div>
            <div>parentHash: {props.block.parentHash}</div>
            <div>gasUsed: {props.block.gasUsed}</div>
            <div>gasLimit: {props.block.gasLimit}</div>
            <div>timestamp: {props.block.timestamp}</div>
            <div>Validator: {props.block.miner}</div>
            <br/>
        </div>
    );
}

export default BlockElement;