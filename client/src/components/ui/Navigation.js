import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
   const url = window.location.pathname;
   const tabActiveOnCreate = (url) => {
      if (
         url.indexOf("create-answer") > 0 ||
         url.indexOf("create-imagery") > 0
      ) {
         return "tab-active";
      } else return "";
   };
   const tabActiveOnReview = (url) => {
      if (
         url.indexOf("review-answer") > 0 ||
         url.indexOf("review-cue") > 0 ||
         url.indexOf("review-done") > 0
      ) {
         return "tab-active";
      } else return "";
   };
   const tabActiveOnAllCards = (url) => {
      if (url.indexOf("all-cards") > 0 || url.indexOf("all-cards-edit") > 0) {
         return "tab-active";
      } else return "";
   };
   return (
      <div
         className="btn-group d-flex mt-1"
         role="navigation"
         aria-label="navigation"
      >
         <Link
            to="/create-answer"
            className={`btn btn-secondary ${tabActiveOnCreate(url)}`}
         >
            Create new
         </Link>
         <Link
            to="/review-cue"
            className={`btn btn-secondary tab-separator ${tabActiveOnReview(
               url
            )}`}
         >
            Review
         </Link>
         <Link
            to="all-cards"
            className={`btn btn-secondary tab-separator ${tabActiveOnAllCards(
               url
            )}`}
         >
            All cards
         </Link>
      </div>
   );
}
