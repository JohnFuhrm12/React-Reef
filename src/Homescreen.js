import './App.css';
import {useState, useEffect} from 'react';


import cart from './static/cart.png';
import search from './static/search.png';

function Homescreen( {...props} ) {

    const [searchKey, setSearchKey] = useState('');

    function refresh() {
        window.location.reload(false);
      };

    function searchFunc(e) {
        if(e.key === 'Enter') {
            props.setSearchQuery(searchKey);
            props.setSearchScreen(true);
            props.setHome(false);
        };
    };

    return (
        <>
        <div className='page'>
            <div className='titleBar'>
                <h1 className='titleName' onClick={refresh} >JF Aquatics</h1>
                <h1 className='catName'>Corals</h1>
                <h1 className='catName'>Supplies</h1>
                <h1 className='catName'>Fish</h1>
                <h1 className='catName'>Inverts</h1>
                <div className='searchCart'>
                    <img src={search} className="search" alt="Search"/>
                    <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
                    <img src={cart} className="cart" alt="Carrito"/>
                    <p className='cartQuantity'>{props.cartAmount}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Homescreen;