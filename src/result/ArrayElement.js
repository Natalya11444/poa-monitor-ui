import React from "react";


function MissingRoundRun(props) {

    return (
        <div>
            {props.element}<br/>
        </div>
    );


    // return ( <div>
    //         <div>id: {props.run.id}</div>
    //         <div>time: {props.run.time}</div>
    //         <div>passed: {props.run.passed}</div>
    //         <div>last block: {props.run.lastBlock}</div>
    //         <div>missed validators: {props.run.missedValidators}</div>
    //         <br/>
    //     </div>
    // );
}

//Test.propTypes = {description: PropTypes.string.isRequired};
export default MissingRoundRun;