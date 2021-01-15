import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         createAnswerText: "",
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
            <Link
               to="/create-imagery"
               className={classnames(
                  "btn btn-outline-primary btn-lg ml-4 float-right",
                  { disabled: this.checkHasInvalidCharCount() }
               )}
               id="next"
            >
               Next{" "}
            </Link>
         </AppTemplate>
      );
   }
}
