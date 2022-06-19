import React, { useState } from 'react';
import useWeb3 from './hooks/useWeb3';
import './Balance.css';

function Balance() {
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState('');
  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage);
  return (
    <div className="Balance">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!provider ? (
        <button className="button-connect" onClick={connect}>Connect to MetaMask</button>
      ) : (
        <>
          <p style={{color:'#FFFFFF'}}>{activeAccount}</p>
          <button className="button-connect" onClick={disconnect}>Disconnect</button>
        </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Balance;