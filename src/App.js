import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {Route,HashRouter   , Switch, Link} from 'react-router-dom'




//  HashRouter
import Home from './Pages/Home'
import BuyLDF from './Pages/BuyLDF'
import Tokenomic from './Pages/Tokenomic'
import Tutorial from './Pages/Tutorial'
import ContactUs from './Pages/ContactUs'
import Wallet from './Pages/Wallet'
import Development from './Pages/Development'


// React-countdown
import Countdown from 'react-countdown'
import Footer from './component/Footer'


// for const learnDeFi = new web3.eth.Contract()
import LearnDeFi from './abi/LearnDeFi.json'
import LDFToken from './abi/LDFToken.json'

function App() {

  useEffect(()=> {
    if (!connected)
    {
      loadWeb3(); 
      loadBlockchainData();
    }

    else
    {
        loadBlockchainData();

      
    }
   
    
})

let [connected, setConnect] = useState(false);
let [connectState,setConnectStatus] = useState("Connect Wallet");
let [account,setAccount] = useState("");
let [EthBalance,setEthBalance] = useState("");



// Contract 

// LDFToken
const [ldfTokens,setldfTokens] = useState();
let [deployedldf,setdeployedldf] = useState(false)
let [ldfBalances,setldfBalances] = useState();
let [ldfAddress,setldfAddress] = useState();
let [remainingLDFs,setremainingLDFs] = useState();


// LearnDeFi
const [learnDeFis,setlearnDeFis] = useState();
let [deployedLearnDeFi,setdeployedLearnDeFi] = useState(false)
let [learnDeFiAddress,setlearnDeFiAddress] = useState();

// balances
let [gotRemainingBalances,setgotRemainingBalances] = useState(false)

// ldf balances
let [balanceOfStakes,setbalanceOfStakes] = useState();


// withdrawl function
let [withdrawlEthFunction,setwithdrawlEthFunction] = useState();
let [demicals,setdemicals] = useState(1000000000000000000);
let [withdrawlLDFamount,setwithdrawlLDFamount] = useState(10);
let [withdrawlETHamount,setwithdrawlETHamount] = useState(0.01);

let [LDFReleaseTimes,setLDFReleaseTimes] = useState(0);


const loadWeb3 = async ()=> {


    
  if (window.ethereum) {
    window.web3js = new Web3(window.ethereum)
    await window.ethereum.enable()
    setConnect(connected = true);
    setConnectStatus(connectState = "Connected")

   
  }
    
    else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    setConnect(connected = true);
    setConnectStatus(connectState = "Connected")
    
    
    
    
    
    }
    else {
    window.alert("Connect your wallet")
    setConnectStatus(connectState = "Connect Wallet")
   

    }

    


    
    
 }


 let loadBlockchainData = async() => {
   
  const web3 = window.web3js;

  const accounts = await web3.eth.getAccounts()
  setAccount(account = accounts[0])

  const networkID = await web3.eth.net.getId()

  web3.eth.getBalance(account).then(function(balance) {
   setEthBalance(web3.utils.fromWei(balance,'ether'))
   })



     // Load LearnDeFi
     const learnDeFiData = LearnDeFi.networks[networkID]

     if (learnDeFiData)
     {
       if (! deployedLearnDeFi)
       {
         const learnDeFi =  new web3.eth.Contract(LearnDeFi.abi,learnDeFiData.address)
         await setlearnDeFis(learnDeFi)

          let LearnDeFiAddress = learnDeFi._address
          await setlearnDeFiAddress(LearnDeFiAddress)

          let balanceOfStake = web3.utils.fromWei(await learnDeFi.methods.stakeOf(account).call(),'ether')
          await setbalanceOfStakes(balanceOfStake)

          let LDFreleaseTime = await learnDeFi.methods.releaseTime(account).call()
          console.log("release Time" , LDFreleaseTime)
         
          setLDFReleaseTimes(new Intl.DateTimeFormat('en-US').format(LDFreleaseTime ))
         
        

         //  Withdrawl ETH function
         //  let withdrawlETH = await learnDeFi.methods.withDrawlETH()
         //   setwithdrawlEthFunction(withdrawlETH);
  
            
          console.log("LearnDeFi: ") ;
          console.log(learnDeFiAddress)
         console.log(
           // "Learn DeFi Contract: " 
          learnDeFis)
          await setdeployedLearnDeFi(true)
          

          
       }
     }

     // Load LearnDeFi


   // Load LDFToken
   const ldfTokenData = LDFToken.networks[networkID]

   if (ldfTokenData)
   {
     if (! deployedldf)
     {
       const ldfToken =   new web3.eth.Contract(LDFToken.abi,ldfTokenData.address)
        setldfTokens(ldfToken)

        // *** await is a must for methods,otherwise it would fetch the data when it is not fully initizlize,which makes it undefined
      let ldfBalance = web3.utils.fromWei(await ldfToken.methods.balanceOf(account).call(),'ether')
     
      let LDFaddress = await ldfToken._address;
      await setldfAddress(LDFaddress)
      

  

      console.log("LDFToken: ") ;
      console.log(LDFaddress)
      
      console.log(
       //  "LDFToken Contract: " 
         ldfTokens)
         await setdeployedldf(true)
        
        
         await setldfBalances(ldfBalance)
         
     }
   }


   // Load LDFToken


   // Load RemainingLDFBalnce in contract


   if (!gotRemainingBalances)
   {
     setTimeout(loadRemainingLDF,0)
     setgotRemainingBalances(true);
   }


}




const sendETH = async()=> {
  const web3 = window.web3js;
 //  console.log(learnDeFiAddress)
  web3.eth.sendTransaction(
    {
      from: account,
      to: learnDeFis._address,
     //  send 0.01 eth now avoid test in mainnet
      value: 0.01 * demicals,

    }
    ,function (err,transactionHash)

    {
      if (err)
      {
        console.log(err);
      }
      else {
        console.log(transactionHash + " sent ")
       //  Can execute a function after send success , execute transfer LDF function 

      }
    }


  )
}


//  Developer function,use at your own risk ! 



const withdrawlLDF = async()=> {

 const web3 = window.web3js;
 learnDeFis.methods.withDrawlLDF((withdrawlLDFamount*demicals).toString()).send({from: account});
 console.log("Withdrawl " + withdrawlLDFamount + " LDF")

}




const withdrawlETH = async()=> {

 const web3 = window.web3js;
 learnDeFis.methods.withDrawlETH((withdrawlETHamount* demicals).toString()).send({from:account})
 console.log("Withdrawl ETH")
 console.log("Withdrawl " + withdrawlETHamount + " ETH")

}

const approve= async()=> {
const web3= window.web3js;
ldfTokens.methods.approve(learnDeFiAddress,(1* demicals).toString()).send({
  from: account
})
}



 // CheckBalanceOf
 const checkBalanceOf = async()=> {
   const web3 = window.web3js;
   learnDeFis.methods.checkBalanceOf(0.01)
 }

 // CheckAllowance
 const checkAllowance = async()=> {
   const web3 = window.web3js;
   learnDeFis.methods.checkAllowance((0.01* demicals).toString()).call({
     from: account
   })
 }


const addStake = async()=> {
 const web3 = window.webjs;
 learnDeFis.methods.addStaker(account,(0.01* demicals).toString()).send(
   {
     from: account
   },
   function(err,transactionHash)
   {
     if (err)
     {
       console.log(err);
     }
     else {
       console.log(transactionHash + "sent")
     }
   }
 )
 console.log('add stake')
}



const removeStake = async()=> {
 const web3 = window.web3js;
 learnDeFis.methods.removeStaker(account,(0.01 * demicals).toString()).send(
 {
   from: account
 }
 )
}




const balanceOfStaker = async()=> {
 const web3 = window.webjs;
 learnDeFis.
 methods.stakeOf(account).send({
   from: account
 },
 function(err,transactionHash)
 {
   if (err)
   {
     console.log(err);
   }

   else {
     console.log(transactionHash + "sent")

   }
 })
}





//  Developer function,use at your own risk ! 






const loadRemainingLDF = async() => {
 console.log("HERE")
 

 const web3 =  window.web3js;
 const networkID =  web3.eth.net.getId()
 const ldfTokenData =  LDFToken.networks[networkID]
 let remainingBalance;
if (ldfTokens)
 {
   setTimeout(remainingBalance = await ldfTokens.methods.balanceOf(learnDeFiAddress).call(),5000)
   await setremainingLDFs(web3.utils.fromWei(remainingBalance),'ether')
   await setgotRemainingBalances(true);
   console.log('finished')
  
 }
 
 
  
  
}











  return (
    <div className="App">
    {ldfAddress}
     
    </div>
  );
}

export default App;
