import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import EventCardContainer from '../Card/EventCardContainer';
import React, { Component } from 'react';

class MyEvents extends React.Component {
    constructor(props){
        super(props);

        this.state={
            callOutTitle: undefined,
            callOutIsVisible: false,
            eventTileValue: undefined,
            eventDescriptionValue: undefined,
            eventLocationValue: undefined,
            eventMembersOnlyValue: false,
            cards: []
        }

        this.getAllEvents = this.getAllEvents.bind(this);
        this.showCreateEventCallout = this.showCreateEventCallout.bind(this);
        this.renderEventForm = this.renderEventForm.bind(this);
        
        this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
        this.handleEventDescriptionChange = this.handleEventDescriptionChange.bind(this);
        this.handleEventLocationChange = this.handleEventLocationChange.bind(this);
        this.handleMembersOnlyCheck = this.handleMembersOnlyCheck.bind(this);

        this.submitEvent = this.submitEvent.bind(this);
        this.closeEventDialog = this.closeEventDialog.bind(this);
    }

    componentDidMount() {
        var getAllEventsInterval = setInterval(this.getAllEvents, 1000); //Call the getAllEvents function every 1 second

        this.setState({getAllEventsInterval: getAllEventsInterval});
    }

    componentWillUnmount() {
        clearInterval(this.state.getAllEventsInterval);
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    submitEvent() {
        //This is where we need to submit the event or create a post call
        console.log(this.state.eventTitleValue + " " +
                    this.state.eventDescriptionValue + " " +
                    this.state.eventLocationValue + " " + 
                    this.state.eventMembersOnlyValue
                );
        
        fetch('/events', {
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.getCookie("access_token") },
            body: JSON.stringify(this.state)
        }).then(function (response) {
            if (response.status == 200) {
                return response.json()
            }
            else {
                return response.json().catch(err => {
                    throw new Error(response.statusText);
                }).then(json => {
                    throw new Error(json.message);
                });
            }
        }).then(function (data) {//on status == 200
            console.log(data.message);
        }).catch(function (error) {//on status != 200
            alert(error.message);
        });
        
        this.closeEventDialog();
    }

    handleEventTitleChange(event, value) {
        this.setState({eventTitleValue: value});
    }

    handleEventDescriptionChange(event, value) {
        this.setState({eventDescriptionValue: value});
    }

    handleEventLocationChange(event, value) {
        this.setState({eventLocationValue: value});
    }

    handleMembersOnlyCheck(event) {
        this.setState({eventMembersOnlyValue: !this.state.eventMembersOnlyValue});
    }

    showCreateEventCallout(title) {
        var that = this;

        return function() {
            that.setState({callOutTitle: title, callOutIsVisible: true});    
        }
    }

    getAllEvents() {
        console.log("Getting all the events for this user...");
        
        var that = this;
        //this is getting only the events for the orgs you are an admin of
        fetch('/events/admin=true', {
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json', 'Authorization' : this.getCookie("access_token")},
        }).then(function (response) {
          if (response.status == 200) {
            return response.json()
          }
          else {
            return response.json().catch(err => {
              throw new Error(response.statusText);
            }).then(json => {
              throw new Error(json.message);
            });
          }
        }).then(function (data) {//on status == 200
          console.log(data.message);
          that.setState({cards: data.message});
        }).catch(function (error) {//on status != 200
          alert(error.message);
        });
    }

    renderEventForm() {
        const cancel = <FlatButton label="Cancel" primary={true} onClick={this.closeEventDialog}/>
        const submit = <FlatButton label="Submit" primary={true} onClick={this.submitEvent}/>
        const organizationTypes = ["Academic", "Community Service", "Council", "Cultural", "Environmental", "Honor", "National Society", "Performing Arts", "Political", "Professional", "Recreational", "Religious", "Special Interest"];
        
        return (
            <Dialog title={"Create New Event for " + this.state.callOutTitle} 
                    modal={true}
                    open={this.state.callOutIsVisible}
                    autoScrollBodyContent={true}>
                    <div>
                        <div>
                            <div>Event Title</div>
                            <TextField hintText="Type event Title here" onChange={this.handleEventTitleChange}/>
                        </div>
                        <div>
                            <div>Event Description</div>
                            <TextField hintText="Type event description here" onChange={this.handleEventDescriptionChange} multiLine={true}/>
                        </div>
                        <div>
                            <div>Event Location</div>
                            <TextField hintText="Type event location here" onChange={this.handleEventLocationChange}/>
                        </div>
                        <div>
                            <Checkbox label="Members Only" checked={this.state.eventMembersOnlyValue} onCheck={this.handleMembersOnlyCheck}/>
                        </div>
                        <div>
                            <div>Tags</div>
                            <TextField disabled={true}/>
                        </div>
                        <div>
                            <div>Event Items</div>
                            <TextField disabled={true}/>
                        </div>
                        <div>
                            <div>Include Year</div>
                            <TextField disabled={true}/>
                        </div>
                        
                    </div>
                    <div>
                        {cancel}
                        {submit}
                    </div>
            </Dialog>
        );
    }

    closeEventDialog() {
        this.setState({callOutIsVisible: false});
    }

    render() {
        var cards = this.state.cards;
        var rowComponents = [];

        for (var i = 0; i < cards.length; i++) {
            rowComponents.push(
                <div key={cards[i].title}>
                  <div className="rowComponent" key={cards[i].title}>
                    <MuiThemeProvider>
                      <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>{cards[i].title}</h1>
                      {cards[i].admin && 
                       <RaisedButton label="Create Event" primary={true} style={style} onClick={this.showCreateEventCallout(cards[i].title)}/>}
                    </MuiThemeProvider>
                  </div>
                  <EventCardContainer cards={this.state.cards[i].events} canRSVP={false}/>
                </div>
            );
        }

        if (rowComponents.length == 0) {
            rowComponents.push(
                <p> You currently have no Events for your Organizations</p>                
            );
        }

        return (
            <div style={style}>
                {rowComponents}
                <MuiThemeProvider>
                     { this.renderEventForm() }
                </MuiThemeProvider>
                  {/* <div className="rowComponent">
                  <MuiThemeProvider>
                      <h1 style={{paddingTop: 20 + 'px', fontSize: 16 + 'px'}}>Organizations You Are an Admin of: </h1>
                  </MuiThemeProvider>
                  </div>
                  <EventCardContainer cards={this.state.cards}/> */}
            </div>
        );
      }
}

const style = {
    margin: 15,
};

export default MyEvents;