import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewDone extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }
   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-cue");
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- Comment above Card --> */}
            <h4 className="text-center lead text-muted my-2">Out of cards</h4>

            {/* <!-- buttons --> */}
            {this.props.queue.index > 0 && (
               <button
                  className="btn btn-link"
                  id="back-to-answer"
                  onClick={() => {
                     this.goToPrevCard();
                  }}
               >
                  Previous card
               </button>
            )}
            <button
               className="btn btn-outline-primary float-right"
               onClick={() => {
                  this.getMoreCards();
               }}
            >
               Get more cards
            </button>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewDone);
