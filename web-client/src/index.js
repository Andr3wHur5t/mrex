import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3';

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  // eslint-disable-next-line no-undef
  if (typeof web3 !== 'undefined') {
    console.log("loading web3...")
    // Use the browser's ethereum provider
    // eslint-disable-next-line no-undef
    window.web3 = new Web3(web3.currentProvider);
  } else {
    alert('No web3? You should consider trying MetaMask!');
  }
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
