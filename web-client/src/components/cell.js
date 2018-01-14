import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  getDefaultAddress,
  sendTx,
  createJobContract,
  waitForRecipt,
  ConstructJob,
} from '../smartContract'

class Cell extends Component {

  constructor(props) {
    super(props);
  }

  createContract() {
    let args = [8, 10, "uber public secret"]
    let onEvent = console.log;
    ConstructJob(getDefaultAddress(), 40, args, onEvent, (err, res) => {

    })
//    return getJobBin().then((bin) => {
//      return getJobABI().then((abi) => {
//        return sendTx(          data: bin
//        })
//        .once('transactionHash', console.log)
//        .once('receipt', console.log)
//        .on('confirmation', console.log)
//      });
//    })
  }

  getContract(abi) {
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App-header">
        <h3>Add New</h3>
          <RaisedButton onClick={this.createContract} label="Create New"></RaisedButton>
      </div>
    );
  }
}



export default Cell;

