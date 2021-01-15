import React from "react";
import LogoLanding from "../../img/logo-landing.png";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      //<!-- Background -->
      <div className="background-image">
         <div className="container">
            <div className="row mb-8">
               {/* <!-- Heading --> */}
               <div className="col-5 col-sm-4 col-xl-2 mt-6 branding-margin float-right">
                  <img src={LogoLanding} alt="White Bear Logo" />
               </div>
               <div className="col-7 col-sm-8 col-xl-10 mt-6">
                  <h1 className="d-inline text-brand text-white">White Bear</h1>
               </div>
            </div>

            <div className="row justify-content-center">
               {/* <!-- new member card --> */}
               <SignUp />

               {/* <!-- return card --> */}
               <LogIn />
            </div>
         </div>
      </div>
   );
}
