import './App.css';
import {useState, useEffect} from 'react';

function Homescreen( {...props} ) {

return (
    <>
    <h1>Home</h1>
    <h1>Test: {props.cartAmount}</h1>
    </>
)
}

export default Homescreen;