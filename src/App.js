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



const Completionist = () => <span>You are good to go!</span>;


function App() {


 
// Run when initialize
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
  


  // const provider = await web3modal.connect();

  // const web3 = new Web3(provider);


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
  let [withdrawlETHamount,setwithdrawlETHamount] = useState(1);

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


  //  



   const sendETH = async()=> {
     const web3 = window.web3js;
    //  console.log(learnDeFiAddress)
     web3.eth.sendTransaction(
       {
         from: account,
         to: learnDeFis._address,
        //  send 1 eth now avoid test in mainnet
         value: 1 * demicals,

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
      learnDeFis.methods.checkBalanceOf(1)
    }

    // CheckAllowance
    const checkAllowance = async()=> {
      const web3 = window.web3js;
      learnDeFis.methods.checkAllowance((1* demicals).toString()).call({
        from: account
      })
    }


  const addStake = async()=> {
    const web3 = window.webjs;
    learnDeFis.methods.addStaker(account,(1* demicals).toString()).send(
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
    learnDeFis.methods.removeStaker(account,(1 * demicals).toString()).send(
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



 

  






    // Withdrawl ETH function



 
  


  return (

    

    <HashRouter basename="/">


    <div className="App">


      <div>
    
      <nav class="navbar">
        <ul class="navbar-nav">

          {/* Logo */}
          <li class="logo">
        <Link to="/" class="nav-link">
          <span class="link-text logo-text"><Link to="/">Learn DeFi  </Link></span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 8.00,256.00
                C 8.00,392.97 119.03,504.00 256.00,504.00
                  392.97,504.00 504.00,392.97 504.00,256.00
                  504.00,119.03 392.97,8.00 256.00,8.00
                  119.03,8.00 8.00,119.03 8.00,256.00 Z
                M 256.00,440.00
                C 256.00,440.00 256.00,72.00 256.00,72.00
                  357.70,72.00 440.00,154.31 440.00,256.00
                  440.00,357.70 357.69,440.00 256.00,440.00 Z"
                class="fa-secondary"
              ></path>
              
            </g>
          </svg>
        </Link>
      </li>
        
          {/* Logo */}



                 {/* Connect  Wallet */}
                 {/* Show account address, eth and LDF balances */}

       <li class="nav-item">
            <Link to="/Wallet" class= 
            {
              (connected? 'nav-link':'nav-link')
           }
           
             >
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="cat"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-cat fa-w-16 fa-9x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 461.20,128.00
                C 461.20,128.00 80.00,128.00 80.00,128.00
                  71.16,128.00 64.00,120.84 64.00,112.00
                  64.00,103.16 71.16,96.00 80.00,96.00
                  80.00,96.00 464.00,96.00 464.00,96.00
                  472.84,96.00 480.00,88.84 480.00,80.00
                  480.00,53.49 458.51,32.00 432.00,32.00
                  432.00,32.00 64.00,32.00 64.00,32.00
                  28.65,32.00 0.00,60.65 0.00,96.00
                  0.00,96.00 0.00,416.00 0.00,416.00
                  0.00,451.35 28.65,480.00 64.00,480.00
                  64.00,480.00 461.20,480.00 461.20,480.00
                  489.22,480.00 512.00,458.47 512.00,432.00
                  512.00,432.00 512.00,176.00 512.00,176.00
                  512.00,149.53 489.22,128.00 461.20,128.00 Z
                M 416.00,336.00
                C 398.33,336.00 384.00,321.67 384.00,304.00
                  384.00,286.33 398.33,272.00 416.00,272.00
                  433.67,272.00 448.00,286.33 448.00,304.00
                  448.00,321.67 433.67,336.00 416.00,336.00 Z"
                class=
                {
                 (connected? 'connectedWallet':'fa-secondary')
              }
              ></path>
             
            </g>
          </svg>
             
                <span class="link-text" onClick={loadWeb3}>{connectState}</span>
             
            </Link>
          </li>
          {/* Connect Wallet */}




        
       {/* Buy LDF */}
       
       <li class="nav-item">
            <Link to="/BuyLDF" class="nav-link">
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="cat"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-cat fa-w-16 fa-9x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 0.00,405.30
           C 0.00,405.30 0.00,448.00 0.00,448.00
             0.00,483.30 86.00,512.00 192.00,512.00
             298.00,512.00 384.00,483.30 384.00,448.00
             384.00,448.00 384.00,405.30 384.00,405.30
             342.70,434.40 267.20,448.00 192.00,448.00
             116.80,448.00 41.30,434.40 0.00,405.30 Z
           M 320.00,128.00
           C 426.00,128.00 512.00,99.30 512.00,64.00
             512.00,28.70 426.00,0.00 320.00,0.00
             214.00,0.00 128.00,28.70 128.00,64.00
             128.00,99.30 214.00,128.00 320.00,128.00 Z
           M 0.00,300.40
           C 0.00,300.40 0.00,352.00 0.00,352.00
             0.00,387.30 86.00,416.00 192.00,416.00
             298.00,416.00 384.00,387.30 384.00,352.00
             384.00,352.00 384.00,300.40 384.00,300.40
             342.70,334.40 267.10,352.00 192.00,352.00
             116.90,352.00 41.30,334.40 0.00,300.40 Z
           M 416.00,311.40
           C 473.30,300.30 512.00,279.70 512.00,256.00
             512.00,256.00 512.00,213.30 512.00,213.30
             488.80,229.70 454.70,240.90 416.00,247.80
             416.00,247.80 416.00,311.40 416.00,311.40 Z
           M 192.00,160.00
           C 86.00,160.00 0.00,195.80 0.00,240.00
             0.00,284.20 86.00,320.00 192.00,320.00
             298.00,320.00 384.00,284.20 384.00,240.00
             384.00,195.80 298.00,160.00 192.00,160.00 Z
           M 411.30,216.30
           C 471.30,205.50 512.00,184.30 512.00,160.00
             512.00,160.00 512.00,117.30 512.00,117.30
             476.50,142.40 415.50,155.90 351.30,159.10
             380.80,173.40 402.50,192.60 411.30,216.30 Z"
                class="fa-secondary"
              ></path>
             
            </g>
          </svg>
          <Link to="/BuyLDF">
              <span class="link-text"> Buy LDF </span>
              </Link>
            </Link>
          </li>
        
          {/* Buy LDF */}


          {/* Tokenomic */}
          <li class="nav-item">
            <Link to="/Tokenomic" class="nav-link">
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="cat"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-cat fa-w-16 fa-9x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 19.00,272.47
           C 19.00,272.47 59.63,290.53 59.63,290.53
             63.74,290.90 68.00,291.08 72.31,291.08
             152.84,291.08 218.12,225.80 218.12,145.26
             218.12,69.04 159.63,6.47 85.08,-0.00
             85.08,-0.00 97.76,-5.12 97.76,-5.12
             106.74,-8.70 113.71,-16.25 116.52,-25.59
             116.52,-25.59 125.74,-56.27 125.74,-56.27
             127.44,-63.13 132.10,-68.82 138.28,-71.92
             138.28,-71.92 159.94,208.00 159.94,208.00
             159.94,208.00 159.94,258.33 159.94,258.33
             159.94,258.33 159.94,258.34 159.94,258.34
             159.94,277.12 149.15,293.39 133.43,301.27
             133.43,301.27 76.19,329.92 76.19,329.92
             49.99,343.04 32.00,370.15 32.00,401.46
             32.00,401.47 32.00,401.47 32.00,401.48
             32.00,401.48 32.00,416.00 32.00,416.00
             32.00,416.00 351.86,416.00 351.86,416.00
             351.86,416.00 351.86,224.00 351.86,224.00
             351.86,118.00 265.94,32.00 159.94,32.00
             159.94,32.00 12.00,32.00 12.00,32.00
             5.37,32.00 0.00,37.37 0.00,44.00
             -0.00,44.00 -0.00,44.01 -0.00,44.01
             -0.00,46.73 0.64,49.30 1.79,51.58
             1.79,51.58 16.00,80.00 16.00,80.00
             16.00,80.00 7.00,89.00 7.00,89.00
             2.67,93.34 -0.00,99.33 -0.00,105.94
             -0.00,105.96 -0.00,105.98 -0.00,106.00
             -0.00,106.00 0.00,243.21 0.00,243.21
             -0.00,243.22 -0.00,243.22 -0.00,243.23
             -0.00,256.27 7.80,267.48 18.98,272.47
             18.98,272.47 19.00,272.47 19.00,272.47 Z
           M 52.00,128.00
           C 63.05,128.00 72.00,136.95 72.00,148.00
             72.00,159.05 63.05,168.00 52.00,168.00
             40.95,168.00 32.00,159.05 32.00,148.00
             32.00,136.95 40.95,128.00 52.00,128.00
             52.00,128.00 52.00,128.00 52.00,128.00 Z
           M 368.00,448.00
           C 368.00,448.00 16.00,448.00 16.00,448.00
             7.16,448.00 0.00,455.16 0.00,464.00
             0.00,464.00 0.00,496.00 0.00,496.00
             0.00,504.84 7.16,512.00 16.00,512.00
             16.00,512.00 368.00,512.00 368.00,512.00
             376.84,512.00 384.00,504.84 384.00,496.00
             384.00,496.00 384.00,464.00 384.00,464.00
             384.00,455.16 376.84,448.00 368.00,448.00
             368.00,448.00 368.00,448.00 368.00,448.00 Z"
                class="fa-secondary"
              ></path>
             
            </g>
          </svg>
              <span class="link-text"> Tokenomic </span>
            </Link>
          </li>
          {/* Tokenpmic */}



          {/* Tutorial */}
          <li class="nav-item">
            <Link to="/Tutorial" class="nav-link">
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="cat"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-cat fa-w-16 fa-9x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 0.00,224.00
                C 0.00,224.00 0.00,496.00 0.00,496.00
                  0.00,504.84 7.16,512.00 16.00,512.00
                  16.00,512.00 96.00,512.00 96.00,512.00
                  96.00,512.00 96.00,192.00 96.00,192.00
                  96.00,192.00 32.00,192.00 32.00,192.00
                  14.33,192.00 0.00,206.33 0.00,224.00 Z
                M 360.00,176.00
                C 360.00,176.00 336.00,176.00 336.00,176.00
                  336.00,176.00 336.00,136.00 336.00,136.00
                  336.00,131.58 332.42,128.00 328.00,128.00
                  328.00,128.00 312.00,128.00 312.00,128.00
                  307.58,128.00 304.00,131.58 304.00,136.00
                  304.00,136.00 304.00,200.00 304.00,200.00
                  304.00,204.42 307.58,208.00 312.00,208.00
                  312.00,208.00 360.00,208.00 360.00,208.00
                  364.42,208.00 368.00,204.42 368.00,200.00
                  368.00,200.00 368.00,184.00 368.00,184.00
                  368.00,179.58 364.42,176.00 360.00,176.00 Z
                M 497.75,112.04
                C 497.75,112.04 337.75,5.37 337.75,5.37
                  332.67,1.98 326.57,-0.00 320.00,-0.00
                  313.43,-0.00 307.33,1.98 302.25,5.37
                  302.25,5.37 142.25,112.04 142.25,112.04
                  133.66,117.77 128.00,127.56 128.00,138.66
                  128.00,138.66 128.00,512.00 128.00,512.00
                  128.00,512.00 256.00,512.00 256.00,512.00
                  256.00,512.00 256.00,368.00 256.00,368.00
                  256.00,359.16 263.16,352.00 272.00,352.00
                  272.00,352.00 368.00,352.00 368.00,352.00
                  376.84,352.00 384.00,359.16 384.00,368.00
                  384.00,368.00 384.00,512.00 384.00,512.00
                  384.00,512.00 512.00,512.00 512.00,512.00
                  512.00,512.00 512.00,138.67 512.00,138.67
                  512.00,127.97 506.65,117.97 497.75,112.04 Z
                M 320.00,256.00
                C 275.82,256.00 240.00,220.18 240.00,176.00
                  240.00,131.82 275.82,96.00 320.00,96.00
                  364.18,96.00 400.00,131.82 400.00,176.00
                  400.00,220.18 364.18,256.00 320.00,256.00 Z
                M 608.00,192.00
                C 608.00,192.00 544.00,192.00 544.00,192.00
                  544.00,192.00 544.00,512.00 544.00,512.00
                  544.00,512.00 624.00,512.00 624.00,512.00
                  632.84,512.00 640.00,504.84 640.00,496.00
                  640.00,496.00 640.00,224.00 640.00,224.00
                  640.00,206.33 625.67,192.00 608.00,192.00 Z"
                class="fa-secondary"
              ></path>
             
            </g>
          </svg>
              <span class="link-text"> Tutorial</span>
            </Link>
          </li>
          {/* Tutorial */}


          {/* Contact Us */}
          <li class="nav-item">
            <Link to="/ContactUs" class="nav-link">
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="cat"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-cat fa-w-16 fa-9x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M 64.00,224.00
           C 64.00,224.00 77.50,224.00 77.50,224.00
             102.20,280.50 158.40,320.00 224.00,320.00
             289.60,320.00 345.80,280.50 370.50,224.00
             370.50,224.00 384.00,224.00 384.00,224.00
             392.80,224.00 400.00,216.80 400.00,208.00
             400.00,208.00 400.00,112.00 400.00,112.00
             400.00,103.20 392.80,96.00 384.00,96.00
             384.00,96.00 370.50,96.00 370.50,96.00
             345.80,39.50 289.60,0.00 224.00,0.00
             158.40,0.00 102.20,39.50 77.50,96.00
             77.50,96.00 64.00,96.00 64.00,96.00
             55.20,96.00 48.00,103.20 48.00,112.00
             48.00,112.00 48.00,208.00 48.00,208.00
             48.00,216.80 55.20,224.00 64.00,224.00 Z
           M 104.00,136.00
           C 104.00,113.90 125.50,96.00 152.00,96.00
             152.00,96.00 296.00,96.00 296.00,96.00
             322.50,96.00 344.00,113.90 344.00,136.00
             344.00,136.00 344.00,160.00 344.00,160.00
             344.00,213.00 301.00,256.00 248.00,256.00
             248.00,256.00 200.00,256.00 200.00,256.00
             147.00,256.00 104.00,213.00 104.00,160.00
             104.00,160.00 104.00,136.00 104.00,136.00 Z
           M 176.00,208.00
           C 176.00,208.00 188.00,172.00 188.00,172.00
             188.00,172.00 224.00,160.00 224.00,160.00
             224.00,160.00 188.00,148.00 188.00,148.00
             188.00,148.00 176.00,112.00 176.00,112.00
             176.00,112.00 164.00,148.00 164.00,148.00
             164.00,148.00 128.00,160.00 128.00,160.00
             128.00,160.00 164.00,172.00 164.00,172.00
             164.00,172.00 176.00,208.00 176.00,208.00 Z
           M 327.60,321.40
           C 297.70,340.70 262.20,352.00 224.00,352.00
             185.80,352.00 150.30,340.70 120.40,321.40
             52.90,328.50 0.00,385.00 0.00,454.40
             0.00,454.40 0.00,464.00 0.00,464.00
             0.00,490.50 21.50,512.00 48.00,512.00
             48.00,512.00 128.00,512.00 128.00,512.00
             128.00,512.00 128.00,448.00 128.00,448.00
             128.00,430.30 142.30,416.00 160.00,416.00
             160.00,416.00 288.00,416.00 288.00,416.00
             305.70,416.00 320.00,430.30 320.00,448.00
             320.00,448.00 320.00,512.00 320.00,512.00
             320.00,512.00 400.00,512.00 400.00,512.00
             426.50,512.00 448.00,490.50 448.00,464.00
             448.00,464.00 448.00,454.40 448.00,454.40
             448.00,385.00 395.10,328.50 327.60,321.40 Z
           M 272.00,448.00
           C 263.20,448.00 256.00,455.20 256.00,464.00
             256.00,472.80 263.20,480.00 272.00,480.00
             280.80,480.00 288.00,472.80 288.00,464.00
             288.00,455.20 280.80,448.00 272.00,448.00 Z
           M 176.00,448.00
           C 167.20,448.00 160.00,455.20 160.00,464.00
             160.00,464.00 160.00,512.00 160.00,512.00
             160.00,512.00 192.00,512.00 192.00,512.00
             192.00,512.00 192.00,464.00 192.00,464.00
             192.00,455.20 184.80,448.00 176.00,448.00 Z"
                class="fa-secondary"
              ></path>
             
            </g>
          </svg>
              <span class="link-text"> Contact us</span>
            </Link>
          </li>
          {/* Contact us */}





          



      {/* Theme button */}
      <li class="nav-item" id="themeButton">
        <Link to="#" class="nav-link">
          <svg
            class="theme-icon"
            id="lightIcon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="moon-stars"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-moon-stars fa-w-16 fa-7x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"
                class="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"
                class="fa-primary"
              ></path>
            </g>
          </svg>
          <svg
            class="theme-icon"
            id="solarIcon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="sun"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-sun fa-w-16 fa-7x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M502.42 240.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.41-94.8a17.31 17.31 0 0 0-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4a17.31 17.31 0 0 0 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.41-33.5 47.3 94.7a17.31 17.31 0 0 0 31 0l47.31-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3a17.33 17.33 0 0 0 .2-31.1zm-155.9 106c-49.91 49.9-131.11 49.9-181 0a128.13 128.13 0 0 1 0-181c49.9-49.9 131.1-49.9 181 0a128.13 128.13 0 0 1 0 181z"
                class="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d="M352 256a96 96 0 1 1-96-96 96.15 96.15 0 0 1 96 96z"
                class="fa-primary"
              ></path>
            </g>
          </svg>
         
          <span class="link-text">Theme</span>
        </Link>
      </li>

      {/* Theme button */}


        </ul>
      </nav>
     
      <main>

       <Link to ="/" class="homeTitle"> <h1> Learn DeFi </h1> </Link>

        

{/* Get LDF Button */}
        <div class="buttons">
  <div class="container">
      <Link to="#" class="btn effect04" data-sm-link-text={Math.round(remainingLDFs) + " / 500" + " ♨︎ Send 1 ETH"} target="_current" onClick={sendETH}><span>Get LDF</span></Link>
  </div>
</div>


{/* Get LDF Button */}









{/* React countdown , increase day after 1610 */}

{/* 
<h3 class="presale-text">Presale ends in :</h3>
 ▼
<div class="countdown">

  
  &nbsp;


  <span class="countdown-text">




<Countdown date={1608580230000 + 1000000000 } >
 
      <Completionist />
    </Countdown>
    </span>
    </div> */}


{/* React countdown , increase day after 1610 */}

   
        

{/* Send Props to here */}
<Switch>

    <Route path= "/"  exact component= {Home}></Route>
    <Route path="/Wallet" component={Wallet } ><Wallet 
    account= {account} 
    eth = {EthBalance}  
    ldfToken = {ldfBalances} 
    balanceOfStaker = {balanceOfStakes}
    ldfReleaseTime = {LDFReleaseTimes}
    // balanceOfStakers={balanceOfStakes}
   
    
    // getETHnow={getETHfromContract} 
   
    /></Route>
    <Route path="/BuyLDF" component={BuyLDF}></Route>
    <Route path="/Tokenomic" component={Tokenomic}></Route>
    <Route path="/Tutorial" component={Tutorial}></Route>
    <Route path="/ContactUs" component={ContactUs}></Route>
    <Route path="/Development" component={Development}>
     <Development
     withdrawlETHs = {withdrawlETH}
     withdrawlLDFs = {withdrawlLDF}
     addStakes = {addStake}
     removeStakes = {removeStake}
     approves= {approve}
      account={account}
      checkAllowances= {checkAllowance}
     
     />
    </Route>

   

    </Switch>

    <div>
      <Footer></Footer>
  
</div>

   

      </main>
     
      </div>
    </div>
    </HashRouter>


  );
}

export default App;
