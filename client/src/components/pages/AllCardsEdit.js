import React from "react";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icon/save.svg";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";
import axios from "axios";

class AllCardsEdit extends React.Component {
   constructor(props) {
      super(props);
      console.log("In the Edit Component");
      this.state = {
         answerText: this.props.editableCard.card.answer,
         imageryText: this.props.editableCard.card.imagery,
         isDeleteChecked: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0 ||
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }

   toggleDeleteButton() {
      this.setState({ isDeleteChecked: !this.state.isDeleteChecked });
   }

   saveCard() {
      if (!this.checkHasInvalidCharCount()) {
         const memoryCard = { ...this.props.editableCard.card };
         memoryCard.answer = this.state.answerText;
         memoryCard.imagery = this.state.imageryText;
         // db PUT this card in axios req
         axios
            .put(`/api/v1/memory-cards/${memoryCard.id}`, memoryCard)
            .then(() => {
               console.log("Memory Card updated");
               // TODO: on success, fire success overlay
               this.props.history.push(this.props.editableCard.prevRoute);
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide after 5 seconds
            });
      }
   }

   deleteCard() {
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.UPDATE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-done");
      } else {
         this.props.history.push("/review-cue");
      }
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- Comment above Card --> */}
            <p className="text-center lead text-muted my-2">Edit card</p>

            {isEmpty(this.props.editableCard) === false && (
               <>
                  {/*<!-- Card -->*/}
                  <div className="card">
                     <div className="card-body bg-primary lead">
                        <textarea
                           rows="6"
                           id="top-edit-input"
                           defaultValue={this.props.editableCard.card.imagery}
                           onChange={(e) => this.setImageryText(e)}
                        ></textarea>
                     </div>
                  </div>

                  <div className="card">
                     <div className="card-body bg-secondary lead">
                        <textarea
                           rows="6"
                           id="bottom-edit-input"
                           defaultValue={this.props.editableCard.card.answer}
                           onChange={(e) => this.setAnswerText(e)}
                        ></textarea>
                     </div>
                  </div>

                  {/* <!-- Word count --> */}
                  <p
                     className="float-right mt-2 mb-5 text-muted d-flex ml-4"
                     id="bottom-edit-characters"
                  >
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.answerText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Bottom: {this.state.answerText.length}/{MAX_CARD_CHARS}
                     </span>
                  </p>

                  <p
                     className="float-right mt-2 mb-5 text-muted"
                     id="top-edit-characters"
                  >
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.imageryText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Top: {this.state.imageryText.length}/{MAX_CARD_CHARS}
                     </span>
                  </p>
                  <div className="clearfix"></div>

                  {/* <!-- buttons --> */}
                  <Link
                     to={this.props.editableCard.prevRoute}
                     className="btn btn-link"
                     id="back-to-all-cards"
                  >
                     Discard changes
                  </Link>
                  <button
                     className={classnames(
                        "btn btn-primary btn-lg ml-4 float-right",
                        { disabled: this.checkHasInvalidCharCount() }
                     )}
                     id="edit-save"
                     onClick={() => {
                        this.saveCard();
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

                  {/* <!-- card properties --> */}
                  <p className="text-center lead text-muted mt-6 mb-4">
                     Card properties
                  </p>
                  <div className="row mb-5">
                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Created on:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>

                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Last attempt:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>

                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Next attempt:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>

                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Consecutive:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </p>
                     </div>

                     {/* <!-- Delete checkbox --> */}
                     <div className="col-12 mt-3">
                        <div className="custom-control custom-checkbox">
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              id="show-delete"
                              checked={this.state.isDeleteChecked}
                              onChange={() => {
                                 this.toggleDeleteButton();
                              }}
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="show-delete"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                  </div>
                  {/* <!-- Delete button --> */}
                  <div className="mt-4">
                     {this.state.isDeleteChecked && (
                        <button
                           className="btn btn-outline-danger"
                           onClick={() => {
                              this.deleteCard();
                           }}
                        >
                           Delete this card
                        </button>
                     )}
                  </div>
               </>
            )}
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(AllCardsEdit);
