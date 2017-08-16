import React from 'react'
import Temp from '../component/Temp'
import Tips from '../component/Tips'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tip: false
        }
        this.handleClesSelect = this.handleClesSelect.bind(this)
        this.handleFahrSelect = this.handleFahrSelect.bind(this)
    }

    handleClesSelect(value) {
        if (value < 100)
            this.setState({
                celsValue: Number(value),
                fahrValue: Number(value) + 5,
                tip: false
            })
        else
            this.setState({
                celsValue: value,
                fahrValue: value + 5,
                tip: true
            })
    }

    handleFahrSelect(value) {
        if (value < 100)
            this.setState({
                celsValue: value - 5,
                fahrValue: value,
                tip: false
            })
        else
            this.setState({
                celsValue: value - 5,
                fahrValue: value,
                tip: true
            })
    }

    render() {
        return (
            <div>
                <Temp title='摄氏度' name='cels'
                    value={this.state.celsValue} 
                    select={this.handleClesSelect}/>
                <Temp title='华氏度' name='fahr'
                    value={this.state.fahrValue} 
                    select={this.handleFahrSelect}/>
                <Tips tip={this.state.tip} />
            </div>
        )
    }
}

export default App