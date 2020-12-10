import React from 'react'
import getLDFButton from '../Images/getLDFButton.png';


export default function BuyLDF() {
    return (
        <div>
          

{/* Image */}
            <a href="https://dribbble.com/shots/10951504-Sleeping-Cat">
              <img src="https://cdn.dribbble.com/users/160641/screenshots/10951504/media/1915a39752d3b5efcd6d6e16b3d49e2c.gif"
            
            class='no-hover-image' alt="cat-in-snow"></img></a>

          

            <p>
           

{/* Image */}

           


            <ul class="no-dot-list">
            <div> <h2>Buy LDF</h2></div>

            <li> You can get LDF with : </li>
             
                
                <li >
                <span class="filled">⎔</span>  &nbsp; 
                 <img src= {getLDFButton} 
                 alt="buyLDFButton" 
                 width="88"></img>
                 
                 &nbsp;  (
                     {/* Pass sold LDF to this function with this.prop later */}
                     {500} Limited)  
                </li>

                <li class="unactive-li"> ↓ </li>

   
                <li class="unactive-li">
                ⎔ &nbsp; 
                 🦄    &nbsp; Listing 
                </li>
            </ul>

            </p>

            {/* Progress bar */}

            <div id="center">
  <div id="main"></div>
  <div class="row" id="r-one">
    <span class="sq" id="sq-1"></span>
    <span class="sq" id="sq-2"></span>
    <span class="sq" id="sq-3"></span>
  </div>
  <div class="row" id="r-two">
    <span class="sq" id="sq-4"></span>
    <span class="sq" id="sq-5"></span>
    <span class="sq" id="sq-6"></span>
  </div>
  <div class="row" id="r-three">
    <span class="sq" id="sq-7"></span>
    <span class="sq" id="sq-8"></span>
    <span class="sq" id="sq-9"></span>
  </div>
  <div class="row" id="r-four">
    <span class="sq" id="sq-10"></span>
    <span class="sq" id="sq-11"></span>
    <span class="sq" id="sq-12"></span>
  </div>
</div>

            {/* Progress bar */}


             

          
        </div>



    )

        

           


           
}
