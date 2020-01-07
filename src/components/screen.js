import React, { Component } from 'react';
import './component.css'


class Screen extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div className="screen">

                {this.props.preValue.length > 0? <input className="preValue" value= {this.props.preValue[this.props.preValue.length - 1]}/> 
                :
                null}

            
            
             <div className="symbol">{this.props.symboled.length > 0 ?this.props.symboled[this.props.symboled.length -1 ]
             :null
            }
             
             </div>
            
                 <input  maxLength={5} className="screenResult"  value={this.props.display}/>
            </div>


        )
    }

}

export default Screen;