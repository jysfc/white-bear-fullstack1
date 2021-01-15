import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import CreateAnswer from "./components/pages/CreateAnswer";
import CreateImagery from "./components/pages/CreateImagery";
import ReviewAnswer from "./components/pages/ReviewAnswer";
import ReviewCue from "./components/pages/ReviewCue";
import ReviewDone from "./components/pages/ReviewDone";
import AllCards from "./components/pages/AllCards";
import AllCardsEdit from "./components/pages/AllCardsEdit";
import NotFound from "./components/pages/NotFound";

export default function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-answer" component={CreateAnswer} />
            <Route exact path="/create-imagery" component={CreateImagery} />
            <Route exact path="/review-answer" component={ReviewAnswer} />
            <Route exact path="/review-cue" component={ReviewCue} />
            <Route exact path="/review-done" component={ReviewDone} />
            <Route exact path="/all-cards" component={AllCards} />
            <Route exact path="/all-cards-edit" component={AllCardsEdit} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}
