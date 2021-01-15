import React from "react";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icon/save.svg";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import memoryCards from "../../mock-data/memory-cards";

const memoryCard = memoryCards[1];

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         CreateImageryText: "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.CreateImageryText.length > MAX_CARD_CHARS ||
         this.state.CreateImageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setCreateImageryText(e) {
      this.setState({ CreateImageryText: e.target.value });
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- Comment above card --> */}
            <h3 className="text-center lead text-muted my-2">
               Add memorable imagery
            </h3>

            {/* <!-- Card --> */}
            <div className="card">
               <div className="card-body bg-primary lead">
                  <textarea
                     rows="6"
                     id="imagery-input"
                     autoFocus={true}
                     defaultValue={this.state.CreateImageryText}
                     onChange={(e) => this.setCreateImageryText(e)}
                  ></textarea>
               </div>
            </div>

            <div className="card">
               <div className="card-body bg-secondary lead">
                  <textarea
                     rows="6"
                     id="bottom-edit-input"
                     autoFocus
                     defaultValue={memoryCard.imagery}
                     onChange={(e) => this.setCreateImageryText(e)}
                  ></textarea>
               </div>
            </div>

            {/* <!-- Word count --> */}
            <p
               className="float-right mt-2 mb-5 text-muted"
               id="imagery-characters"
            >
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.CreateImageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.CreateImageryText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>

            {/* <!-- buttons --> */}
            <Link
               to="/create-answer"
               className="btn btn-link"
               id="back-to-answer"
            >
               Back to answer
            </Link>

            <Link
               to="/create-answer"
               className={classnames(
                  "btn btn-primary btn-lg ml-4 float-right",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
               id="save-card"
            >
               <img
                  src={saveIcon}
                  width="20px"
                  alt=""
                  style={{ marginBottom: "3px", marginRight: "4px" }}
               />
               Save
            </Link>
         </AppTemplate>
      );
   }
}
