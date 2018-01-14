import React, { Component } from 'react';
// import Request from '../request';
import RaisedButton from 'material-ui/RaisedButton';
import {
  getDefaultAddress,
  sendTx,
  createJobContract,
  waitForRecipt,
} from '../smartContract'

class Cell extends Component {

  constructor(props) {
    super(props);
  }

  createContract() {
    let args = [8, 10, "uber public secret"]
    createJobContract({ from: getDefaultAddress(), gas: 3000000 }, args, (err, res) => {
      console.log(err, res);
      waitForRecipt(res.transactionHash, (err, recipt) => {
        console.log(err, recipt);
        sendTx({
          from: getDefaultAddress(),
          to: recipt.contractAddress,
          gas: 3000000,
          value: 40,
        }, (err, res) => {
          console.log(err, res)
        })
      })
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

