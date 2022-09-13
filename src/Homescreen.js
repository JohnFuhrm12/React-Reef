import './App.css';
import {useState, useEffect} from 'react';


import cart from './static/cart.png';
import search from './static/search.png';
import test from './static/test.gif';
import testvid from './static/testvid.mp4';

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
            <div className='videoBox'>
                <h1 className='videoText'>The Best Supply of</h1>
                <h1 className='videoText2'>Saltwater Fish and Corals</h1>
                <video className='homeVideo' src={testvid} muted autoPlay loop/>
            </div>
            <div className='waveSVG'>
                <svg viewBox="0 0 1760 354" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="#FFF" d="M0 197l630.655 24.092L1760 197v157H0z"></path>
                        <path d="M1191.615 87.812c190.832-25.255 368.188 23.803 477.487 36.17 24.946 2.822 55.995 7.316 90.895 10.103v.017c4.84-1.979 9.633-3.96 14.38-5.944C1593.155 230.054 1368.362 281 1100 281c-190.5 0-354.924-25.637-493.27-76.912l.013-.01c9.234.18 18.392.269 27.46.269 223.163 0 366.58-91.28 557.412-116.535zM1760 0l-.004 112.118L1759.997 0h.003z" fill="#8DD0E8"></path>
                        <path d="M.6 14.912c-.18 3.225-.38 5.128-.6 5.71 133.736 129.727 411.04 183.725 634.203 183.725 223.163 0 366.58-91.28 557.412-116.535 190.832-25.255 368.188 23.803 477.487 36.17 24.946 2.822 55.995 7.316 90.895 10.103v.017l.002-.004v103.39c-231.61 1.606-436.036-69.567-596.226-52.576C989.35 203.412 524 322.905 343.583 335.009 224.51 342.998 111.07 298.455 3.266 201.381L0 198.423-.001 14.917zM1760 0l-.004 112.258L1759.997 0h.003z" fill="#092849"></path>
                    </g>
                </svg>
            </div>
        </div>
        </>
    )
}

export default Homescreen;