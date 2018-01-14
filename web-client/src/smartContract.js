import contractBin from "./solidity/__eth_src_job_sol_Job.bin"
import contractABI from "./solidity/__eth_src_job_sol_Job.abi"
import async from 'async'

export const getWeb3 = () => window.web3;

export const getDefaultAddress = () => getWeb3().eth.defaultAccount

export const getJobBin = () => fetch(contractBin).then((res) => res.text())
export const getJobABI = () => fetch(contractABI).then((res) => res.json())

var gloablJobData;
export const getJobContract = (done) => {
  if (gloablJobData) return done(null, gloablJobData);
  getJobBin().then((bin) => {
    getJobABI().then((abi) => {
      let contract = getWeb3().eth.contract(abi);
      gloablJobData = {
        contract: contract,
        abi: abi,
        bin: bin,
      };
      done(null, gloablJobData);
    })
  }).catch(done);
}

export const createJobContract = (params, done) => {
  getJobContract((err, contractData) => {
    if (err) return done(err)
    params.data = contractData.bin;
    try { contractData.contract.new(params, done); }
    catch (e) { done(e); }
  });
}

export const getJob = (contractAddr, done) => {
  getJobContract((err, contractData) => {
    if (err) return done(err);
    contractData.contract.at(contractAddr, done);
  });
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

  createJobContract({ from: addr, gas: GAS }, (err, res) => {
    if (err) return done(err);
    eventNotify("Created Contract", res);
    waitForRecipt(res.transactionHash, (err, recipt) => {
      if (err) return done(err);
      eventNotify("Created Recipt", recipt);

      async.parallel([
        (next) => {
          setJobArgs(recipt.contractAddress, args, (err) => {
            if (err) return next(err);
            eventNotify("Configured contract.");
            next()
          });

        },
        (next) => {
          sendTx({ from: addr, to: recipt.contractAddress, gas: GAS, value: value },
            (err, tx) => {
            if (err) return next(err);
            eventNotify("Added value to contract", tx);
            next(null, {tx, recipt, contract: res});
          })
        }
      ], done)
    });
  });
}


export const setJobArgs = (jobAddr, args, done) => {
  getJob(jobAddr, (err, contract) => {
    contract.configureJob(args.minute, args.payout, args.description);
    done();
  })
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

