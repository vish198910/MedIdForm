import React, { useState } from 'react';
import firebase from "./Firestore";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-date-picker';
import "./index.css"
import Autosuggest from 'react-autosuggest';


const allergies = [
    {
        allergy:"Drug",
        frequency:2,
    },
    {
        allergy:"Food",
        frequency:23,
    },
    {
        allergy:"Insect",
        frequency:7,
    },
    {
        allergy:"Pollen",
        frequency:30,
    },
    {
        allergy:"Pet",
        frequency:9,
    },
    {
        allergy:"Mold",
        frequency:2,
    },
    {
        allergy:"Latex",
        frequency:3,
    },
    
]


const options = [
    'Male', 'Female', 'Other'
  ];
  const defaultOption = "Select your Gender";

  function SelectDate() {
    const [value, onChange] = useState(new Date());
   
    return (
      <div className="actual-date">
        <DatePicker
          onChange={onChange}
          value={value}
        />
      </div>
    );
 }

 // Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : allergies.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

class MedIdForm extends React.Component {
    constructor() {
        super();
        //this will act as the data object that we are sending to the database
        this.state = {
            fullname: "",
            gender:"",
            dob:Date.now(),
            allergies:[]
        };
        this.addUser = this.addUser.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }
    //updating the existing value in the database

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //adding to the database

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("allergies").add({
            fullname: this.state.fullname,
            gender: this.state.gender
        });
        this.setState({
            fullname: "",
            gender: ""
        });
    };

    //rendering
    render() {
        return (
            <div className="login-box">
            <form onSubmit={this.addUser}>
                <div className="user-box">
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.fullname}
                />
                <label>Name</label>
                </div>
                <div className="user-box">
                <label>Gender</label>
                <Dropdown name ="gender" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                </div>

                <div className="date">
                    <SelectDate />
                </div>

                <div className="user-box">
                <input
                    type="text"
                    name="allergies"
                    placeholder="Select Allergies"
                    
                
                />
                
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
            
            </div>
        );
    }
} export default MedIdForm;