import React, { Component } from 'react';
import Screen from './components/screen'

import Button from './components/button'

import './CSS files/App.css'


class Hello extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: '0',
      previous: [],
      mathSign: [],
      nextIsReset: false,
    }
  }

  clearScreen = () => {
    this.setState({
      current: '0',
      previous: [],
      mathSign: [],
      nextIsReset: false,

    })
  }

  addToCurrent = (symbol) => {
    if ((this.state.current === '0' && symbol !== '.') || this.state.nextIsReset) {
      this.setState({ current: symbol, nextIsReset: false });
    }
    else {
      if (this.state.current === ".") {
        this.setState({
          current: "0." + symbol
        })
      }
      else {
        if (this.state.current.length < 12) {
          this.setState({ current: this.state.current + symbol })
        }else{
          this.redAlert()
        }
      }
    }

  }

  addSign = (symbol) => {
    let { mathSign, previous, } = this.state;

    if (this.state.current === "") {
      mathSign.push(symbol);
      this.setState({ mathSign })
    }
    else {
      if (this.state.previous.length === 0 && this.state.mathSign.length === 0) {
        mathSign.push(symbol)
        previous.push(this.state.current)
        this.setState({
          mathSign,
          previous,
          nextIsReset: true,
          current: ""

        })
      }
      else {
        this.autoCalculate();
        mathSign.push(symbol)

      }
    }

  }

  redAlert = () => {
    alert("Out of Range, not more than 12 characters");
    this.setState({
      current :"0"
    })

  }

  autoCalculate = () => {
    let { current, previous, mathSign } = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + mathSign[mathSign.length - 1] + current));
      previous.push(current);
      this.setState({ current: "", previous, mathSign, nextIsReset: true })
    }
    

  }

  calculate = (symbol) => {
    let { current, previous, mathSign } = this.state; 

    if (previous.length > 0 && current !== "") {
      current = eval(String(previous[previous.length - 1] + mathSign[mathSign.length - 1] + current));
      this.setState({ current, previous: [], mathSign: [], nextIsReset: true, signs: false })
      if(this.state.current.length > 12){
        alert("hello")
      }
    } 
    else if (previous.length > 0 && this.state.current === "") {
      this.setState({
        current: previous[previous.length - 1],
        previous: [],
        nextIsReset: true,
        mathSign: []
      })
    }

  }


  render() {
    const buttons = [
      { symbol: 'C', cols: 3, action: this.clearScreen },
      { symbol: '/', cols: 1, action: this.addSign },
      { symbol: '7', cols: 1, action: this.addToCurrent },
      { symbol: '8', cols: 1, action: this.addToCurrent },
      { symbol: '9', cols: 1, action: this.addToCurrent },
      { symbol: '*', cols: 1, action: this.addSign },
      { symbol: '4', cols: 1, action: this.addToCurrent },
      { symbol: '5', cols: 1, action: this.addToCurrent },
      { symbol: '6', cols: 1, action: this.addToCurrent },
      { symbol: '-', cols: 1, action: this.addSign },
      { symbol: '1', cols: 1, action: this.addToCurrent },
      { symbol: '2', cols: 1, action: this.addToCurrent },
      { symbol: '3', cols: 1, action: this.addToCurrent },
      { symbol: '+', cols: 1, action: this.addSign },
      { symbol: '0', cols: 2, action: this.addToCurrent },
      { symbol: '.', cols: 1, action: this.addToCurrent },
      { symbol: '=', cols: 1, action: this.calculate },


    ];
    return (
      <div className="App">


        <Screen
          symboled={this.state.mathSign}
          preValue={this.state.previous}
          display={this.state.current} />
        
        <div className='buttons'>
          {buttons.map((btn, i) => {

            return <Button key={i} symbol={btn.symbol} cols={btn.cols} actions={(symbols) => btn.action(symbols)} />
          })}

        </div>
        <p><b>Simple React Calculator</b></p>
      </div>
    )
  }

}


export default Hello;
