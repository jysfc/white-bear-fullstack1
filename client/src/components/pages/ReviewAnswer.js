import React from "react";
import AppTemplate from "../ui/AppTemplate";
import thumbsUpIcon from "../../icon/thumbs-up.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-done");
      }
   }

   updateCardWithNeedsWork(memoryCard) {
      this.goToNextCard();
   }

   updateCardWithGotIt(memoryCard) {
      memoryCard.totalSuccessfulAttempts += 1;
      memoryCard.lastAttemptAt = Date.now();

      // update the global state
      // db PUT this card in axios req
      // TODO: on success, fire success overlay
      // TODO: on err, fire err overlay
      this.goToNextCard();
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         // on the last card
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-done");
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-cue");
      }
   }

   storeEditableCard(memoryCard) {
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
   }

   render() {
      const memoryCard = { ...this.props.queue.cards[this.props.queue.index] };
      return (
         <AppTemplate>
            <div className="mb-5"></div>
            {/* <!-- Card --> */}
            <div className="card">
               <div className="card-body bg-primary lead">
                  {memoryCard && memoryCard.imagery}
               </div>
            </div>

            <div className="card mb-5">
               <div className="card-body bg-secondary lead">
                  {memoryCard && memoryCard.answer}
               </div>
            </div>

            <Link
               to="/all-cards-edit"
               className="btn btn-link"
               onClick={() => {
                  this.storeEditableCard(memoryCard);
               }}
            >
               Edit
            </Link>
            <div className="float-right">
               <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                     this.updateCardWithNeedsWork(memoryCard);
                  }}
               >
                  Needs work
               </button>
               <button
                  className="btn btn-primary ml-4"
                  onClick={() => {
                     this.updateCardWithGotIt(memoryCard);
                  }}
               >
                  <img
                     src={thumbsUpIcon}
                     width="20px"
                     alt=""
                     style={{ marginBottom: "5px", marginRight: "8px" }}
                  />
                  Got it
               </button>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewAnswer);
