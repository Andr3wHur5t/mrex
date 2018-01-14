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
    this.state = {
      showContractIsCreating: false,
      showWaitingForReceipt: false,
      showAddingValueToContract: false,
    }
    this.postJob = this.postJob.bind(this);
    this.jobState = this.jobState.bind(this);
    this.displayCreating = this.displayCreating.bind(this);
    this.displayWaiting = this.displayWaiting.bind(this);
    this.displayAddingValue = this.displayAddingValue.bind(this);
    this.shouldDisplayPostJob = this.shouldDisplayPostJob.bind(this);

    this.jobPayout = 0;
  }

  componentDidMount() {
  }

  jobState(state) {
    if (state.msg === "Created Contract") {
      console.log("created contract");
      this.setState({showContractIsCreating : false});
      this.setState({showWaitingForReceipt : true});
    } else if (state.msg === "Created Receipt") {
      console.log("created receipt");
      this.setState({showAddingValueToContract : true});
      this.setState({showWaitingForReceipt : false});
    } else {
      console.log("added value");
      this.setState({showAddingValueToContract : false});
    }
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
    if (!this.state.showAddingValueToContract &&
      !this.state.showContractIsCreating &&
      !this.state.showWaitingForReceipt
    ) {
      return "visible";
    }
    return "none";
  }

  displayCreating() {
    if (this.state.showContractIsCreating) {
      return "visible";
    }
    return "none";
  }

  displayWaiting() {
    if (this.state.showWaitingForReceipt) {
      return "visible";
    }
    return "none";
  }

  displayAddingValue() {
    if (this.state.showAddingValueToContract) {
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
              onChange={(e) => { this.jobDescription = e.target.value; }}
            />
          </div>
          <div className="job-payout">
            <TextField
              type="text"
              name="amount-text-field"
              placeholder="Job Payout (in ETH)"
              onChange={(e) => { this.jobPayout = e.target.value; }}
            />
          </div>
          <div className="job-duration">
            <TextField
              type="text"
              name="amount-text-field"
              placeholder="Job Duration (minutes)"
              onChange={(e) => { this.jobMinute = e.target.value; }}
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