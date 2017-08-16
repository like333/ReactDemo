import React from 'react'

class Temp extends React.Component {
constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
}

handleChange(e){
    this.props.select(e.target.value)
}

render(){
    return (
        <div>
            <div>{this.props.title}</div>
            <input name={this.props.name} value={this.props.value}
                onChange={this.handleChange} />
        </div>
    )
}
    
}

Temp.propTypes = {
    value: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    select: React.PropTypes.func.isRequired
}

export default Temp