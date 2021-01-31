import React from "react";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icon/save.svg";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class CreateImagery extends React.Component {
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

   async updateCreatableCard() {
      if (!this.checkHasInvalidCharCount()) {
         console.log("updating creatable card");
         const {
            id,
            answer,
            userId,
            createdAt,
            nextAttemptAt,
            lastAttemptAt,
            totalSuccessfulAttempts,
            level,
         } = this.props.creatableCard;
         await this.props.dispatch({
            type: actions.UPDATE_CREATABLE_CARD,
            payload: {
               // the card itself
               id,
               answer,
               imagery: this.state.CreateImageryText,
               userId,
               createdAt,
               nextAttemptAt,
               lastAttemptAt,
               totalSuccessfulAttempts,
               level,
            },
         });
         // save to the database (make an API call)
         axios
            .post("/api/v1/memory-cards", this.props.creatableCard)
            .then(() => {
               console.log("Memory Card created");
               // TODO: Display success overlay
               // Clear creatableCard from redux
               this.props.dispatch({
                  type: actions.UPDATE_CREATABLE_CARD,
                  payload: {},
               });
               // Route to "/create-answer"
               this.props.history.push("/create-answer");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide after 5 seconds
            });
      }
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
                  {this.props.creatableCard.answer}
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

            <button
               className={classnames(
                  "btn btn-primary btn-lg ml-4 float-right",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
               onClick={() => {
                  this.updateCreatableCard();
               }}
            >
               <img
                  src={saveIcon}
                  width="20px"
                  alt=""
                  style={{ marginBottom: "3px", marginRight: "4px" }}
               />
               Save
            </button>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return { creatableCard: state.creatableCard };
}

export default connect(mapStateToProps)(CreateImagery);
