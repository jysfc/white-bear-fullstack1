import React from "react";
import AppTemplate from "../ui/AppTemplate";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS, defaultLevel } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";
import getNextAttemptAt from "../../utils/getNextAttemptAt";

class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         createAnswerText: this.props.creatableCard.answer || "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.createAnswerText.length > MAX_CARD_CHARS ||
         this.state.createAnswerText.length === 0
      ) {
         return true;
      } else return false;
   }

   setCreateAnswerText(e) {
      this.setState({ createAnswerText: e.target.value });
   }

   setCreatableCard() {
      if (!this.checkHasInvalidCharCount()) {
         console.log("UPDATE_CREATABLE_CARD");
         const currentTime = Date.now();
         this.props.dispatch({
            type: actions.UPDATE_CREATABLE_CARD,
            payload: {
               // the card itself
               id: getUuid(),
               answer: this.state.createAnswerText,
               imagery: "",
               userId: this.props.currentUser.id,
               createdAt: currentTime,
               nextAttemptAt: getNextAttemptAt(defaultLevel, currentTime),
               lastAttemptAt: currentTime,
               totalSuccessfulAttempts: 0,
               level: 1,
            },
         });
         this.props.history.push("/create-imagery");
      }
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- Comment above Card --> */}
            <h3 className="text-center lead text-muted my-2">Add an answer</h3>

            {/* <!-- Card --> */}
            <div className="card">
               <div className="card-body bg-secondary lead">
                  <textarea
                     rows="6"
                     id="create-answer-input"
                     autoFocus={true}
                     defaultValue={this.state.createAnswerText}
                     onChange={(e) => this.setCreateAnswerText(e)}
                  ></textarea>
               </div>
            </div>

            {/* <!-- Word count --> */}
            <p
               className="float-right mt-2 mb-5 text-muted"
               id="answer-characters"
            >
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.createAnswerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.createAnswerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>

            {/* <!-- buttons --> */}
            <button
               className={classnames(
                  "btn btn-outline-primary btn-lg ml-4 float-right",
                  { disabled: this.checkHasInvalidCharCount() }
               )}
               onClick={() => {
                  this.setCreatableCard();
               }}
            >
               Next{" "}
            </button>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      currentUser: state.currentUser,
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateAnswer);
