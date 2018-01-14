import React, { Component } from 'react';
import Web3 from 'web3';
// import Request from '../request';
import RaisedButton from 'material-ui/RaisedButton';

const contractTemplate = "abc";

class Cell extends Component {

  constructor(props) {
    super(props);
  }

  createContract() {
    const params = {
      from: "0xbc84f3bf7dd607a37f9e5848a6333e6c188d926c",
      value: 10, //
      gas: 21000, //
      data: contractTemplate, // the contract
    }
    var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    web3.eth.sendTransaction(params, function(err, transactionHash) {
      console.log("got transactionHash ", transactionHash);
      if (!err) {
        web3.eth.getTransactionReceipt(transactionHash, function(err, receipt) {
          console.log("Got receipt", receipt);
        })
      }
    })
  }

  getContract(abi) {
    var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    new web3.eth.Contract(abi).then(function(contract) {
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

