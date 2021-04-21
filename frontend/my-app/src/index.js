import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import SignInScreen from './App';


// ReactDOM.render(<SignInScreen subject="Clarice"/>, document.getElementById('root'));
ReactDOM.render(
    <React.StrictMode>
        <SignInScreen />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals();