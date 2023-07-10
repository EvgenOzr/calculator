import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calc from './components/Calc/Calc';

// let word = "Revol"
// for(let i = word.length; i >= 0; i--){
// 	console.log(word[i])
// }
ReactDOM.render(<React.StrictMode>
					{<Calc/>}
 				</React.StrictMode>,document.getElementById('root')
);

