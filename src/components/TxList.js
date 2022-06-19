import React from "react";
function TxList({ txs }) {
    if (txs.length === 0) return null;
    const link = 'https://testnet.bscscan.com/tx/'
    return (
      <>
        {txs.map((item) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <label><a href={link+item.hash}>{item.hash}</a></label>
            </div>
          </div>
        ))}
      </>
    );
  }
  
  export default TxList;