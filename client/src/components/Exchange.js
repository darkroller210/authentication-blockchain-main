import React, { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import Select from 'react-select'
import '../bootstrap/Format.css';

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Exchange() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const options = [
    { value: 'bnb', label: 'BNB'},
    { value: 'ether', label: 'ETH' },
    { value: 'usdt', label: 'USDT' }
  ]
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("bnb"),
      addr: data.get("addr")
    });
  };



  return (
    <form className="Form-payment" onSubmit={handleSubmit}>
      <div className="format-box-payment">
        <main className="main-format">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input-payment"
                placeholder="Recipient Address"
              />
            </div>
            <Select
                options={options}
            />
            <div className="my-3">
              <input
                name="bnb"
                type="text"
                className="input-payment"
                placeholder="Amount in BNB"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
