import contractBin from "./solidity/__eth_src_job_sol_Job.bin"
import contractABI from "./solidity/__eth_src_job_sol_Job.abi"

export const getWeb3 = () => window.web3;

export const getDefaultAddress = () => getWeb3().eth.defaultAccount

export const getJobBin = () => fetch(contractBin).then((res) => res.text())
export const getJobABI = () => fetch(contractABI).then((res) => res.json())

// TODO: Clean
export const createJobContract = (params, args, done) => {
  getJobBin().then((bin) => {
    getJobABI().then((abi) => {
      params.data = bin;
//      let contract = new getWeb3().eth.contract(abi, params);
//      window.contract
      let contract = getWeb3().eth.contract(abi);
      try {
        contract.new(params, done)
      } catch (e) {
        done(e);
      }
    });
  }).catch((e) => done(e));
}

export const waitForRecipt = (txHash, done) => {
  let doNext = () => {
   setTimeout(() => {
    waitForRecipt(txHash, done)
   }, 20);
  }

  try {
    getWeb3().eth.getTransactionReceipt(txHash, (err, receipt) => {
      if (receipt && receipt.contractAddress) return done(null, receipt)
      doNext();
    });
  } catch (e) {
    doNext()
  }
}

export const sendTx = (params, done) => {
  try {
    getWeb3().eth.sendTransaction(params, done);
  } catch (e) {
    done(e);
  }
}

export const ConstructJob = (addr, value, args, eventNotify, done) => {
  const GAS = 3000000;

  createJobContract({ from: addr, gas: GAS }, [args.description, args.minute, args.payout], (err, res) => {
    if (err) return done(err);
    eventNotify({msg: "Created Contract", data:res});
    waitForRecipt(res.transactionHash, (err, recipt) => {
      if (err) return done(err);
      eventNotify({msg: "Created Receipt", data: recipt});
      sendTx({
          from: addr,
          to: recipt.contractAddress,
          gas: GAS,
          value: value,
        }, (err, tx) => {
          if (err) return done(err);
          eventNotify({msg:"Added value to contract", data:tx});
          done(null, {tx, recipt, contract: res});
        })
      })
  });
}

//    const params = {
//      from: getWeb3().eth.defaultAccount,
//      value: 10,
//      gas: 21000,
//      data: contractBin,
//    }
//
//    window.web3.eth.sendTransaction(params, function(err, transactionHash) {
//      console.log("got transactionHash ", transactionHash);
//      if (!err) {
//        window.web3.eth.getTransactionReceipt(transactionHash, function(err, receipt) {
//          console.log("Got receipt", receipt);
//        })
//      }
//    })
//}

//getContract(abi) {
  //window.web3.eth.Contract(abi).then(function(contract) {
    //console.log("got contract", contract)
  //}).catch(function(err) {
    //console.log("caught err", err)
  //})
//}

