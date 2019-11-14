import React from "react";

class Guests extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isGoing: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        if (name == "isGoing"){
            this.setState(
                {
                    [name]: value
                }
            );
        }
        else if (name == "guestsNumber"){
            this.props.onGuestsChange(value);
        }
    }

    render(){

        const guestsNumber = this.props.guestsNumber;

        return(
            <form>
                <label>
                    Пойду:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Количество гостей:
                    <input
                        name="guestsNumber"
                        type="number"
                        value={guestsNumber}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}

export default Guests;