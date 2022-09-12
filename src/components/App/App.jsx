import React, { useEffect, useState} from "react";
import './App.css';
import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/burgerIngredients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import Modal from '../Modal/modal'
import IngredientsDetails from "../IngredientDetails/ingredientDetails";
import OrderDetails from "../OrderDetails/orderDetails";

const url = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

 const [modalState, setModalState] = React.useState({ open: false})
 const [productData, setProductData] = useState([]);
 const [state, setState] = useState({
  isLoading: false,
  hasError: false
 })

 useEffect(() => {
  const getProductData = async () => {
   try {
      setState({...state, isLoading: true});
      const res = await fetch(url);
      const data = await res.json();
      setProductData({...data});
      console.log('Дата загружена!')
    } catch (error) {
      setState({isLoading: false, hasError: true})
      console.log('Произошла ошибка!')
    }

  }
  getProductData();
}, [])

  const handleOpenModal = (props) => setModalState({ props, open: true });
  const handleCloseModal = () => setModalState({ open: false });

  return (
    <div className="App">
      <AppHeader/>
      {productData.data && (
           <main className="main">
           <BurgerIngredients data={productData.data} openModal={handleOpenModal} />
           <BurgerConstructor data={productData.data} openModal={handleOpenModal} />  
         </main>
      )}
      {modalState.open && (
        <Modal closeModal={handleCloseModal}>
          {modalState.props.name === 'ingredient' ? <IngredientsDetails item={modalState.props.item}/> : <OrderDetails />}
        </Modal>
      )}
    </div>
  );
}
export default App;

