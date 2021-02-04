import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../icon/edit.svg";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard(memoryCard) {
      console.log("STORING EDITABLE CARD", memoryCard);
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/all-cards",
         },
      });
   }

   render() {
      const memoryCard = this.props.card;
      console.log("Memory card from render: ", memoryCard);
      return (
         // <!-- Card -->
         <div className="d-flex align-items-start">
            <div className="app-card flex-fill">
               <div className="card">
                  <div className="card-body bg-primary">
                     {this.props.card.imagery}
                  </div>
               </div>

               <div className="card">
                  <div className="card-body bg-secondary mb-5">
                     {this.props.card.answer}
                  </div>
               </div>
            </div>
            {/* <!-- side edit buttons --> */}
            <Link
               to="/all-cards-edit"
               className="btn btn-link ml-4 d-flex mt-n2"
               onClick={() => {
                  this.storeEditableCard(memoryCard);
               }}
            >
               <img
                  src={EditIcon}
                  width="20px"
                  className="d-inline"
                  style={{ marginTop: "2px", marginRight: "8px" }}
                  alt=""
               />
               Edit
            </Link>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(MemoryCard);
