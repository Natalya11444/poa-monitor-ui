import React, {Component} from 'react';
import './App.css';
import Test from "./result/Test";
import MissingRoundList from "./result/MissingRoundList";
import MissingTxsList from "./result/MissingTxsList";
import RewardList from "./result/RewardList";
import TxsPublicRpcList from "./result/TxsPublicRpcList";
import axios from "axios";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class App extends Component {
    state = {
        network: "Sokol",
        lastSeconds: 7200,
        passed: "All",

        missingRoundsDescription: "Check if any validator nodes are missing rounds",
        missingRoundsRuns: [],

        missingTxsCheckDescription: "Check that all validator nodes are able to mine non-empty blocks",
        missingTxsRuns: [],

        rewardDescription: "Check if payout script works properly for all nodes (check mining address balance)",
        rewardRuns: [],

        txsPublicRpcDescription: "Periodically send txs via public rpc endpoint",
        txsPublicRpcRuns: []

        // todo tests all, some
    };

    handleSubmit(event) {
        console.log('handleSubmit');
        event.preventDefault();
        const data = new FormData(event.target);

        let network = data.get('network');
        let lastSeconds = data.get('lastSeconds');
        let passed = data.get("passed");
        console.log('network: ' + network + ", lastSeconds: " + lastSeconds + ", passed: " + passed);
        const newState = Object.assign({}, this.state, {
            network: network,
            lastSeconds: lastSeconds,
            passed: passed
        });
        this.setState(newState);
        let url = "http://poatest.westus.cloudapp.azure.com:3000/" + network + "/api/" + passed + "?lastseconds=" + lastSeconds;
        console.log('url: ' + url);
        this.getResults(url);
    }

    getResults(url) {
        axios
            .get(url)
            .then(response => {
                const newMissingRoundsRuns = response.data.missingRoundCheck.runs.map(r => {
                    r.key = r.id;
                    return r;
                });
                const newMissingTxsRuns = response.data.missingTxsCheck.runs.map(r => {
                    r.key = r.id;
                    return r;
                });
                const newRewardRuns = response.data.miningRewardCheck.runs.map(r => {
                    r.key = r.id;
                    return r;
                });

                const newTxsPublicRpcRuns = response.data.txsViaPublicRpcCheck.runs.map(r => {
                    r.key = r.id;
                    return r;
                });

                console.log("response.data: " + response.data);
                console.log("response.data.missingRoundCheck: " + JSON.stringify(response.data.missingRoundCheck));
                console.log("newMissingRoundsRuns: " + JSON.stringify(newMissingRoundsRuns));
                const newState = Object.assign({}, this.state, {
                    missingRoundsRuns: newMissingRoundsRuns,
                    missingTxsRuns: newMissingTxsRuns,
                    rewardRuns: newRewardRuns,
                    txsPublicRpcRuns: newTxsPublicRpcRuns
                });
                console.log("newState: " + newState);
                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    // todo order

    componentDidMount() {
        console.log('componentDidMount');
        let url = "http://poatest.westus.cloudapp.azure.com:3000/" + this.state.network + "/api/" + this.state.passed + "?lastseconds=" + this.state.lastSeconds;
        console.log('url: ' + url);
        this.getResults(url);
    }

    render() {
        console.log('In Render');
        return (<div>
                <div className="App">
                    <Form onSubmit={(e) => this.handleSubmit(e)} inline>
                        <FormGroup className="formGroup" tag="fieldset">
                            <FormGroup className="formGroup" check>
                                <Label check>
                                    <Input type="radio" name="network" value="Sokol"
                                           defaultChecked={this.state.network === "Sokol"}/>{' '}
                                    Sokol
                                </Label>
                            </FormGroup>
                            <FormGroup className="formGroup" check>
                                <Label check>
                                    <Input type="radio" name="network" value="Core"
                                           defaultChecked={this.state.network === "Core"}/>{' '}
                                    Core
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup className="formGroup">
                            <Label for="exampleText">Last seconds</Label>
                            <Input type="number" name="lastSeconds" id="exampleText"
                                   defaultValue={this.state.lastSeconds}/>
                        </FormGroup>
                        <FormGroup className="formGroup" tag="fieldset">
                            <FormGroup className="formGroup" check>
                                <Label check>
                                    <Input type="radio" name="passed" value="all"
                                           defaultChecked={this.state.passed === "All"}/>{' '}
                                    All
                                </Label>
                            </FormGroup>
                            <FormGroup className="formGroup" check>
                                <Label check>
                                    <Input type="radio" name="passed" value="failed"
                                           defaultChecked={this.state.passed === "Failed"}/>{' '}
                                    Failed
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <Button className="mb-2 mr-sm-2 mb-sm-0">Submit</Button>
                    </Form>

                    <Test description={this.state.missingRoundsDescription}/>
                    <MissingRoundList missingRoundsRuns={this.state.missingRoundsRuns}/>
                    <br/>
                    <Test description={this.state.missingTxsCheckDescription}/>
                    <MissingTxsList missingTxsRuns={this.state.missingTxsRuns}/>
                    <br/>
                    <Test description={this.state.rewardDescription}/>
                    <RewardList rewardRuns={this.state.rewardRuns}/>
                    <Test description={this.state.txsPublicRpcDescription}/>
                    <TxsPublicRpcList txsPublicRpcRuns={this.state.txsPublicRpcRuns}/>

                </div>
            </div>
        );
    }
}

export default App;
