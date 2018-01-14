import React, { Component } from 'react';
import Web3 from 'web3';
// import Request from '../request';
import RaisedButton from 'material-ui/RaisedButton';
import contractBin from "../solidity/__eth_src_job_sol_Job.bin"
import contractABI from "../solidity/__eth_src_job_sol_Job.abi"

function getWeb3() {
  console.log("get web 3")
  if (typeof(web3) !== 'undefined') {
    return new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    return new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
  }
}

class Cell extends Component {

  constructor(props) {
    super(props);
  }

  createContract() {
    // const contract = getWeb3().eth.contract(contractABI, contractBin)
    // const data = contract._encode_constructor_data(1, 2, "abc123");
    const params = {
      from: "0xFea4661d76a9E559260cbf8c067E1F27B3e7d141",
      value: 10,
      gas: 21000,
      data: contractBin,
    }

    getWeb3().eth.sendTransaction(params, function(err, transactionHash) {
      console.log("got transactionHash ", transactionHash);
      if (!err) {
        getWeb3().eth.getTransactionReceipt(transactionHash, function(err, receipt) {
          console.log("Got receipt", receipt);
        })
      }
    })
  }

  getContract(abi) {
    getWeb3().eth.Contract(abi).then(function(contract) {
      console.log("got contract", contract)
    }).catch(function(err) {
      console.log("caught err", err)
    })
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

