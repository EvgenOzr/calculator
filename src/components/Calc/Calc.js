import React, {Component} from 'react';
import '../../css/Calc.min.css';


export default class Calc extends Component{

    state = {
        calculator: '0',
        symbols: ['←','C','√','+', 7, 8, 9,'/', 4, 5, 6,'*', 1, 2, 3,'-',0,'.','=']
    }

    watchInput = () => {
        document.addEventListener('keydown', (event) => {
            if(+event.key < 10){
                this.calulate(event.key);
            }else if(event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' || event.key == '=' || event.key == '.'){
                this.calulate(event.key);
            }else if(event.key == 'Enter'){
                this.calulate('=');
            }else if(event.key == 'Delete'){
                this.calulate('C');
            }
        });
    }

    componentDidMount(){
        this.watchInput();
    }

    calulate = (e) => {
        let newValue;
        let oldValue = this.state.calculator;
        let oldSlice = oldValue.slice(oldValue.length - 1);
        (typeof(e) == 'object') ? newValue = e.target.innerText : newValue = e;
        if (newValue == '←'){
            (oldValue.length > 1) ? newValue = oldValue.slice(0, oldValue.length - 1) : newValue = '0';
        }else if(newValue == 'C'){
            newValue = '0';
        }else if((newValue == '+') || (newValue == '-') || (newValue == '*') || (newValue == '/')){
            if(oldSlice != '+' && oldSlice != '-' && oldSlice != '/' && oldSlice != '*' && oldSlice != '.'){
                newValue = oldValue + newValue;//e.target.innerText;
            }else{
                newValue = oldValue.slice(0 ,oldValue.length - 1) + newValue;//e.target.innerText;
            }
        }else if(newValue == '.'){
            if((oldSlice == '+') || (oldSlice == '-') || (oldSlice == '*') || (oldSlice == '/')){
                newValue = oldValue + '0' + newValue;//e.target.innerText;
            }else if(oldSlice == '.'){
                newValue = oldValue;
            }else{
                for(let i = oldValue.length - 1; i >= 0; i--){
                    if(+oldValue[i] < 10){
                        if(i != 0){
                            continue;
                        }else{
                            newValue = oldValue + newValue;//e.target.innerText
                        }
                    }else{
                        if(oldValue[i] == '.'){
                            newValue = oldValue;
                            break;
                        }else{
                            newValue = oldValue + newValue;//e.target.innerText;
                            break;
                        }
                    }
                }
            }
        }else if((+newValue < 10) && (oldValue != '0')) {
            newValue = oldValue + newValue;//e.target.innerText;
        }else if(newValue == "=" || newValue == "√"){
            let result;
            (newValue == "=") ? result = eval(oldValue) : result = Math.sqrt(oldValue);
            if (String(result).length > 10) result = result.toFixed(5);
            newValue = String(result);
            if(newValue.indexOf('.') != -1){
                while(newValue[newValue.length - 1] == '0'){
                    newValue = newValue.slice(0, newValue.length - 1);
                }
            }
        }
        this.setState({calculator: newValue});
    }

    checkInput = (e) => {
        console.log(e.target.value)
    }

    createButtons = () => {
        let buttons = [];
        let i = 0;
        const {symbols} = this.state;
        symbols.forEach((symbol) => {
            buttons.push(
                <button
                    key = {i}
                    className = "number_btn"
                    onClick = {this.calulate}
                >{symbol}</button>
            )
            i++;
        })
        return buttons;
    }

    render(){
        const buttons = this.createButtons();
        let {calculator} = this.state;
        return(
            <>
                <h1 className="calc_title">Calculator</h1>
                <div className="calc">
                    <div className = "calc_field">{calculator}</div>
                    <div className='number'>
                        {buttons}
                    </div>
                </div>
            </>
        )
    }

}

