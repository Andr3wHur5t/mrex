import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import contractBin from "../solidity/__eth_src_job_sol_Job.bin"
import contractABI from "../solidity/__eth_src_job_sol_Job.abi"
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import {
  getDefaultAddress,
  ConstructJob,
} from '../smartContract'

class PostJobForm extends Component {

  constructor(props) {
    super(props);
    var showContractIsCreating = false;
    var showWaitingForReceipt = false;
    var showAddingValueToContract = false;
  }

  componentDidMount() {
  }

  contractCreated() {
    this.props.showContractIsCreating = true;
  }

  waitingForReceipt() {
    this.props.showContractIsCreating = false;
    this.props.showWaitingForReceipt = true;
  }

  addingValueToContract() {
    this.props.showAddingValueToContract = true;
    this.props.showContractIsCreating = false;
    this.props.showWaitingForReceipt = false;
  }

  contractCompleted() {
    this.props.showAddingValueToContract = false;
    this.props.showContractIsCreating = false;
    this.props.showWaitingForReceipt = false;
  }

  postJob() {
    console.log("Job Posted");
    let jobArgs = {
      description: "clean floor",
      minute: 60,
      payout: 1,
    }
    let onEvent = console.log;
    ConstructJob(getDefaultAddress(), 40, jobArgs, onEvent, (err, res) => {
    });
    //TODO call the contract

  }

  shouldDisplayPostJob() {
    if (!this.props.showAddingValueToContract &&
      !this.props.showContractIsCreating &&
      !this.props.showWaitingForReceipt
    ) {
      return "visible";
    }
    return "none";
  }

  displayCreating() {
    if (this.props.showContractIsCreating) {
      return "visible";
    }
    return "none";
  }

  displayWaiting() {
    if (this.props.showWaitingForReceipt) {
      return "visible";
    }
    return "none";
  }

  displayAddingValue() {
    if (this.props.showAddingValueToContract) {
      return "visible";
    }
    return "none";
  }

  render() {
    return (
      <div style={{color: this.props.muiTheme.palette.accent1Color}} className="postNewJobForm">
        <h3 >Post A New Job</h3>
        <p style={{display: this.displayCreating()}}>Creating Contract...</p>
        <p style={{display: this.displayWaiting()}}>Waiting For Receipt...</p>
        <p style={{display: this.displayAddingValue()}}>Adding Value To Contract...</p>
        <form style={{display:this.shouldDisplayPostJob()}} action="#">
          <div className="job-description-field">
            <TextField
              type="text"
              name="job-description"
              placeholder="Job Description"
            />
          </div>
          <div className="job-payout">
            <TextField
              type="text"
              name="amount-text-field"
              placeholder="Job Payout (in ETH)"
            />
          </div>
          <div className="btn-wrapper">
            <RaisedButton
              label="Create Job"
              onClick={this.postJob}
              secondary={true}
            />
          </div>
        </form>
      </div>
    );
  }
}


export default muiThemeable()(PostJobForm);
