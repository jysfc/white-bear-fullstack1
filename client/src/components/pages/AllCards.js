import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import orderBy from "lodash/orderBy";
import axios from "axios";
const userId = "16672b8b-6946-4016-b7b8-f450b911f69e";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         order: '[["createdAt"], ["desc"]]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            `api/v1/memory-cards?userId=${userId}&searchTerm=&order=%60memory_cards%60.%60created_at%60%20DESC`
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filterByInput() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      console.log(lowerCasedInput);
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];
      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         const lowerCasedImagery = memoryCard.imagery.toLowerCase();
         const lowerCasedAnswer = memoryCard.answer.toLowerCase();
         if (
            lowerCasedImagery.includes(lowerCasedInput) ||
            lowerCasedAnswer.includes(lowerCasedInput)
         ) {
            return true;
         } else return false;
      });
      this.setState({ displayedMemoryCards: filteredMemoryCards }, () => {
         this.setMemoryCards();
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder); // '[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      console.log("setting memory cards");
      const copyOfDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      const toJson = JSON.parse(this.state.order);
      console.log(...toJson);
      const orderedMemoryCards = orderBy(copyOfDisplayedMemoryCards, ...toJson);
      console.log(orderedMemoryCards);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- search input --> */}
            <div className="row my-4">
               <div className="col-8">
                  <input
                     className="form-control form-control-sm"
                     type="text"
                     placeholder="Search for a word"
                     id="search-input"
                  />
               </div>
               <div className="col-4">
                  <button
                     className="btn btn-primary btn-block btn-sm"
                     onClick={() => this.filterByInput()}
                  >
                     Search
                  </button>
               </div>
            </div>
            {/* <!-- sort cards --> */}
            <div className="row my-4 no gutters">
               <div className="col-4">
                  <p className="text-muted mt-1">Sort card by</p>
               </div>
               <div className="col-8">
                  <select
                     value={this.state.order}
                     className="form-control form-control-sm"
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value='[["createdAt"], ["desc"]]'>
                        Most recent
                     </option>
                     <option value='[["createdAt"], ["asc"]]'>Oldest</option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {/* <!-- cards --> */}
            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
