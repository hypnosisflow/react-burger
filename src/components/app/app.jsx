import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../services/actions/fetch";

function App() {
  const [modalState, setModalState] = React.useState({ open: false });
  const {modalOpen} = useSelector(state => state.ingredient)
  const { item } = useSelector(state => state.ingredient)

  const handleOpenModal = (props) => setModalState({ props, open: true });
  const handleCloseModal = () => setModalState({ open: false });

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* {menu.data && ( */}
      <main className={styles.main}>
        <BurgerIngredients openModal={handleOpenModal} />
        <BurgerConstructor openModal={handleOpenModal} />
      </main>
      {/* )} */}
      {modalOpen && item &&  (
        <Modal closeModal={handleCloseModal}> 
          <IngredientsDetails item={item.item} />
          {/* {modalState.props.name === "ingredient" ? (
            <IngredientsDetails item={modalState.props.item} />
          ) : (
            <OrderDetails />
          )} */}
        </Modal>
      )}
    </div>
  );
}
export default App;
