import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import coralHome from './static/coralHome.jpg';

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

// Initialize Firebase Database
firebase.initializeApp({
  apiKey: "AIzaSyB5aeD3R-qHoRlLJcNGmrpCVZEocRz90Dk",
  authDomain: "reef-store-9da21.firebaseapp.com",
  projectId: "reef-store-9da21",
  storageBucket: "reef-store-9da21.appspot.com",
  messagingSenderId: "149895470839",
  appId: "1:149895470839:web:5937a7595ca8b696f17df2"
});

// Firebase Database
const db = firebase.firestore();

function ProductSelection( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [productItems, setProductItems] = useState([]);
  const [productItems2, setProductItems2] = useState([]);
  const [productItems3, setProductItems3] = useState([]);

  const productsRef = collection(db, "products");

  const getProductItems = async () => {
    const itemsRef = query(productsRef, where('itemRow', '==', 1), where('itemCategory', '==', props.productSelectionCategory));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setProductItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(productsRef, where('itemRow', '==', 2), where('itemCategory', '==', props.productSelectionCategory));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setProductItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(productsRef, where('itemRow', '==', 3), where('itemCategory', '==', props.productSelectionCategory));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setProductItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    props.getDbmessages();
    getProductItems();
  }, []);

  // When Category State is Changed Re-Render Mapped items
  useEffect(() => {
    getProductItems();
  }, [props.productSelectionCategory]);

  function returnHome() {
    props.setProductSelectionScreen(false);
    props.setHome(true);
  };

  function goToProduct(e) {
    props.setProductSelectionScreen(false);
    props.setProductScreen(true);
    props.setCurrentSection(e.currentTarget.getAttribute("data-category"));
    props.setProductImage(e.currentTarget.title);
    props.setProductName(e.currentTarget.alt);
    props.setProductPrice(e.currentTarget.id);
    props.setProductDesc(e.currentTarget.name);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setProductSelectionScreen(false);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setProductSelectionScreen(false);
    };
  };

  const showProductSelection = async (e) => {
    props.setProductSelectionCategory(e.currentTarget.title);
  };

  return (
    <>
    <div className="page">
      <div className='titleBar'>
            <h1 className='titleName' onClick={returnHome} >JF Aquatics</h1>
            <h1 onClick={showProductSelection} title="Soft Corals" className='catName'>Corals</h1>
            <h1 onClick={showProductSelection} title="Supplies" className='catName'>Supplies</h1>
            <h1 onClick={showProductSelection} title="Saltwater Fish" className='catName'>Fish</h1>
            <h1 onClick={showProductSelection} title="Invertebrates" className='catName'>Inverts</h1>
          <div className='searchCart'>
            <img src={search} className="search" alt="Search"/>
            <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
            <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Home</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>{props.productSelectionCategory}</h2>
      </div>
      <h1 className='sectionTitle'>{props.productSelectionCategory}</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {productItems.map((productItem) => {
            return (
                    <div>
                      <img onClick={goToProduct} data-category={productItem.itemCategory} src={productItem.itemIMG} className="sectionIMG" title={productItem.itemIMG} name={productItem.itemDesc} id={productItem.itemPrice} alt={productItem.itemName}/>
                      <h1 className='itemName'>{productItem.itemName}</h1>
                      <h1 className='itemPrice'>{productItem.itemPrice}</h1>
                    </div>
            )
          })}
          </div>
          <div className='sectionImagesBottom'>
        {productItems2.map((productItem2) => {
            return (
                    <div>
                      <img onClick={goToProduct} data-category={productItem2.itemCategory} src={productItem2.itemIMG} className="sectionIMG" title={productItem2.itemIMG} name={productItem2.itemDesc} id={productItem2.itemPrice} alt={productItem2.itemName}/>
                      <h1 className='itemName'>{productItem2.itemName}</h1>
                      <h1 className='itemPrice'>{productItem2.itemPrice}</h1>
                    </div>
            )
          })}
          </div>
          <div className='sectionImagesBottom'>
        {productItems3.map((productItem3) => {
            return (
                    <div>
                      <img onClick={goToProduct} data-category={productItem3.itemCategory} src={productItem3.itemIMG} className="sectionIMG" title={productItem3.itemIMG} name={productItem3.itemDesc} id={productItem3.itemPrice} alt={productItem3.itemName}/>
                      <h1 className='itemName'>{productItem3.itemName}</h1>
                      <h1 className='itemPrice'>{productItem3.itemPrice}</h1>
                    </div>
            )
          })}
          </div>
        </div>
    </div>
    </>
  );
}

export default ProductSelection;