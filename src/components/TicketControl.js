import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import ErrorQ1 from './ErrorQ1';
import ErrorQ2 from './ErrorQ2';
import ErrorQ3 from './ErrorQ3';

let counter = 0;

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      question1VisibleOnPage: false,
      question2VisibleOnPage: false,
      question3VisibleOnPage: false,
      yesButtonVisibleOnPage: false
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      yesButtonVisibleOnPage: !prevState.yesButtonVisibleOnPage
    }));
  }

  questionClick = () => {
    counter++;
    if (counter === 0) {
      this.setState(state => ({
        question1VisibleOnPage: !state.question1VisibleOnPage
      }));
    } else if (counter === 1) {
      this.setState(state => ({
        question1VisibleOnPage: !state.question1VisibleOnPage,
        question2VisibleOnPage: !state.question2VisibleOnPage
      }));
    } else if (counter === 2) {
      this.setState(state => ({
        question2VisibleOnPage: !state.question2VisibleOnPage,
        question3VisibleOnPage: !state.question3VisibleOnPage
      }));
    } else if (counter === 3) {
      this.setState(state => ({
        question3VisibleOnPage: !state.question3VisibleOnPage
      }));
    } else {
      counter = 0;
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let questionText = "Yes";
    let questionButton = <button style="display: none" onClick={this.questionClick}>{questionText}</button>;
    if (this.state.formVisibleOnPage) {
      buttonText = "Return to Ticket List";
      if (counter === 0) {
        currentlyVisibleState = <ErrorQ1 />
        questionButton = <button onClick={this.questionClick}>{questionText}</button>;
      } else if (counter === 1) {
        currentlyVisibleState = <ErrorQ2 />
        questionButton = <button onClick={this.questionClick}>{questionText}</button>;
      } else if (counter === 2) {
        currentlyVisibleState = <ErrorQ3 />
        questionButton = <button onClick={this.questionClick}>{questionText}</button>;
      } else {
        currentlyVisibleState = <NewTicketForm />
      }
    } else {
      currentlyVisibleState = <TicketList />
      buttonText = "Add Ticket";
    }
    return(
      <>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
        {questionButton}
      </>
    );
  }

}

export default TicketControl;