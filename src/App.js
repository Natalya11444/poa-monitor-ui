import React, {Component} from 'react';
import './App.css';
import Test from "./result/Test";
import MissingRoundList from "./result/run-list"
import axios from "axios";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class App extends Component {
    state = {
        missingRoundsDescription: "Check if any validator nodes are missing rounds",
        missingRoundsRuns: [],
        network: "Core",
        lastSeconds: 5600,
        passed: "Failed"
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
        axios
            .get(url)
            .then(response => {
                const newMissingRoundsRuns = response.data.missingRoundCheck.runs.map(c => {
                    c.key = c.id;
                    return c;
                });
                console.log("response.data: " + response.data);
                console.log("response.data.missingRoundCheck: " + JSON.stringify(response.data.missingRoundCheck));
                console.log("newMissingRoundsRuns: " + JSON.stringify(newMissingRoundsRuns));
                const newState = Object.assign({}, this.state, {
                    missingRoundsRuns: newMissingRoundsRuns
                });
                console.log("newState: " + newState);
                // store the new state object in the component's state
                this.setState(newState);
                console.log("set state: ");
            })
            .catch(error => console.log(error));
    }

    // todo order

    componentDidMount() {
        console.log('componentDidMount');
        axios
            .get("http://poatest.westus.cloudapp.azure.com:3000/sokol/api/all?lastseconds=72000")
            .then(response => {

                const newMissingRoundsRuns = response.data.missingRoundCheck.runs.map(c => {
                    c.key = c.id;
                    return c;
                });
                const newState = Object.assign({}, this.state, {
                    missingRoundsRuns: newMissingRoundsRuns
                });
                this.setState(newState);
            })
            .catch(error => console.log(error));
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
                </div>
            </div>
        );
    }
}

export default App;
