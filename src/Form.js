import React, { useState } from 'react';
import firebase from "./Firestore";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-date-picker';
import "./index.css"
import Autosuggest from 'react-autosuggest';

//list of allergies
const allergies = [
    {
        allergyName: "Drug",
        frequency: 2,
    },
    {
        allergyName: "Food",
        frequency: 23,
    },
    {
        allergyName: "Insect",
        frequency: 7,
    },
    {
        allergyName: "Pollen",
        frequency: 30,
    },
    {
        allergyName: "Pet",
        frequency: 9,
    },
    {
        allergyName: "Mold",
        frequency: 2,
    },
    {
        allergyName: "Latex",
        frequency: 3,
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

    return inputLength === 0 ? [] : allergies.filter(allergy =>
        allergy.allergyName.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.allergyName;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.allergyName}
    </div>
);

class MedIdForm extends React.Component {
    constructor() {
        super();
        //this will act as the data object that we are sending to the database
        this.state = {
            fullname: "",
            gender: "",
            dob: Date.now(),
            value: "",
            allergies: []
        };
        this.addUser = this.addUser.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            allergies: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            allergies: []
        });
    };

    //rendering
    render() {
        const { fullname, gender, dob, value, allergies } = this.state;
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'What Allergies you have',
            value,
            onChange: this.onChange
        };
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
                        <Dropdown name="gender" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    </div>

                    <div className="date">
                        <SelectDate />
                    </div>

                    <div className="user-box suggestion-box">
                        <Autosuggest
                            suggestions={allergies}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />

                    </div>
                    <button className="button" type="submit">Submit</button>
                </form>

            </div>
        );
    }
} export default MedIdForm;