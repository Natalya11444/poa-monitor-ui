import React from "react";
import MissingRoundRun from "./MissingRoundRun";
import {Table} from 'reactstrap';

function MissingRoundList(props) {
    console.log('props: ' + props);
    console.log('props j: ' + JSON.stringify(props));
    return (
        <Table bordered responsive striped>
            <thead>
            <tr>
                <th>Id</th>
                <th>Time</th>
                <th>Passed</th>
                <th>Last Block</th>
                <th>Missed validators</th>
            </tr>
            </thead>
            <tbody>
            {props.missingRoundsRuns.map(r => <MissingRoundRun run={r}/>)}
            </tbody>
        </Table>
    );
}

export default MissingRoundList;