import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardTitle} from 'reactstrap';

function Test(props) {
    return <Card>
        <CardBody>
            <CardTitle> <strong>{props.description}</strong></CardTitle>
        </CardBody>
    </Card>
}

Test.propTypes = {description: PropTypes.string.isRequired};
export default Test;
