import React from "react";
import MissingRoundRun from "./missing-round-run";
import { Table } from 'reactstrap';

//"id": 229,
//     "time": "2018-06-13T05:50:05.940Z",
//     "passed": 0,
//     "lastBlock": "2960979",
//     "missedValidators":

function MissingRoundList(props) {
    console.log('props: ' + props);
    console.log('props j: ' + JSON.stringify(props));
    return (
        <Table bordered responsive >
            <thead>
            <tr>
                <th>Id</th>
                <th>Time</th>
                <th>Passed</th>
                <th>Last Block</th>
                <th>Missed validators</th>
            </tr>
            </thead>
            <tbody >
            {props.missingRoundsRuns.map(c => <MissingRoundRun run={c}/>)}
            </tbody>
        </Table>
    );

}

export default MissingRoundList;