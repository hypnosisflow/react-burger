import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../services/actions/menu";
import { REMOVE_DETAILS } from '../../services/actions/ingredient'

function App() {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ingredient);
  const { item } = useSelector((state) => state.ingredient);
  const { menu } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        {menu && (
        <main className={styles.main}>
          <BurgerIngredients data={menu} />
          <BurgerConstructor />
        </main>
         )} 
        {modalOpen && item && (
          <Modal closeModal={() => dispatch({ type: REMOVE_DETAILS })}>
            <IngredientsDetails item={item.item} />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}
export default App;
