import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Countdown from 'react-countdown'


// const Completion = () => <span>You can unstake LDF now.</span>;

export default function Wallet(props) {
 


    
    return (
        <div>

<a href="https://dribbble.com/shots/7244696-simple-Animation">
              <img src="https://cdn.dribbble.com/users/3418642/screenshots/7244696/media/60b0ca0f4b39d9358d9b75ab603eb68a.gif"
            
            class='no-hover-image' alt="two-men-in-banana"></img></a>
            
            <ul class="no-dot-list padding-bottom">
                <h2> Wallet</h2>
                <li>Address:  {props.account}</li>
                <li>ETH : {props.eth} </li>
                <li>LDF : {props.ldfToken}</li>
                <li>Staked LDF: {props.balanceOfStaker} </li>







                {/* <li>Staked LDf Release Time: {props.ldfReleaseTime} 
<Countdown date={props.ldfReleaseTime * 10}>
 <Completion />
</Countdown>
</li>
                */}


               
            </ul>
            

            {/* <button onClick={props.getETHnow} class="btn effect04">Claim ETH</button> */}
           

           </div>
    )
}
