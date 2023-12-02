import { useState } from "react";
import "./Main.css";

function SendEther({ web3, account }) {
  const [reciept, setReciept] = useState({});
  const [toggle, setToggle] = useState(false);

  function sendEther(event) {
    event.preventDefault();
    const _to = document.querySelector("#to").value;
    const _amt = document.querySelector("#value").value;
    const weiValue = web3.utils.toWei(_amt, "ether"); //convert the above ether value to wei
    web3.eth
      .sendTransaction({
        from: account,
        to: _to,
        value: weiValue,
      })
      .then(function (reciept) {
        setReciept(reciept);
        setToggle(true);
        // console.log(reciept);
      });
  }
  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
          <code>
            {toggle &&
              JSON.stringify(
                reciept,
                ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
                2
              )}
          </code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
