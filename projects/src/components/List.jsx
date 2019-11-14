import React from "react";

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return (
            <ul>
                {this.props.names.map((name, index) =>
                    <li key={index}>
                        {name}
                    </li>)
                }
            </ul>
        );
    }
}

export default List;