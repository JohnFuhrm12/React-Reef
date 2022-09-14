import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import ProductSelection from './ProductSelection';
import Admin from './Admin';

import useLocalStorage from "./useLocalStorage";

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

function App() {
  const [home, setHome] = useState(true);

  const [searchScreen, setSearchScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [productSelectionCategory, setProductSelectionCategory] = useState('');
  const [productSelectionScreen, setProductSelectionScreen] = useState('');

  const [adminScreen, setAdminScreen] = useState(false);
  const [admin, setAdmin] = useState(false);

  // Remember user for cart
  var id = "id" + Math.random().toString(16).slice(2);
  const [currentUser, setCurrentUser] = useLocalStorage();

  // Cart items from DB
  const [cartItems, setCartItems] = useState([]);
  const cartAmount = cartItems.length;
  const cartRef = collection(db, "cart");

  const getDbmessages = async () => {
    const itemsRef = query(cartRef, where('user', '==', currentUser));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

  useEffect(() => {   
    getDbmessages();
    
    if (currentUser === undefined) {
      setCurrentUser(id);
    };
  }, []);

  const props = { 
    home,
    cartAmount,
    setHome,
    getDbmessages,
    searchScreen,
    setSearchScreen,
    searchQuery,
    setSearchQuery,
    productSelectionCategory,
    setProductSelectionCategory,
    productSelectionScreen,
    setProductSelectionScreen,
    adminScreen,
    setAdminScreen,
    admin,
    setAdmin,
 };

  return (
    <>
    {home ? <Homescreen {...props}/> : <></>}
    {productSelectionScreen ? <ProductSelection {...props}/> : <></>}
    {adminScreen ? <Admin {...props}/> : <></>}
    </>
  );
}

export default App;
