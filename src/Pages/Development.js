import '../App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {Route, BrowserRouter as Router , Switch, Link} from 'react-router-dom'




//  Router
import Home from './Home'
import BuyLDF from './BuyLDF'
import Tokenomic from './Tokenomic'
import Tutorial from './Tutorial'
import ContactUs from './ContactUs'
import Wallet from './Wallet'



// React-countdown
import Countdown from 'react-countdown'
import Footer from '../component/Footer'


// for const learnDeFi = new web3.eth.Contract()
import LearnDeFi from '../abi/LearnDeFi.json'
import LDFToken from '../abi/LDFToken.json'

// This page is intented for development purpose,please don't access if you are now allowed to

export default function Development(props) {


    return (
        <div>
            Devs only. 

            Test Function:
            <ul class="no-dot-list ">
                <li><button class="btn effect04 devs" onClick={props.withdrawlETHs}>WithDrawl ETH</button></li>
                <li><button class="btn effect04 devs" onClick={props.withdrawlLDFs}>WithDrawl LDF</button></li>
                <li><button class="btn effect04 devs" onClick={props.approves}>Approve Stake</button></li>
                <li><button class="btn effect04 devs" onClick={props.addStakes}>Stake LDF</button></li>
                <li><button class="btn effect04 devs" onClick={props.checkAllowances}>Check Allowance</button></li>
               

                <li><button class="btn effect04 devs-testing" onClick={props.removeStakes}>Unsake LDF</button></li>
                
              
            </ul>

        </div>
    )
       
}
