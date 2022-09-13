import React, { useEffect, useState } from "react";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../Modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import OrderDetails from "../order-details/order-details";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [modalState, setModalState] = React.useState({ open: false });
  const [productData, setProductData] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка! ${res.status}.`);
        }
      })
      .then((data) => setProductData({ ...data, isError: false }))
      .catch((error) => {
        setState({ hasError: true });
        console.error(error);
      });
  }, []);

  const handleOpenModal = (props) => setModalState({ props, open: true });
  const handleCloseModal = () => setModalState({ open: false });

  return (
    <div className={styles.app}>
      <AppHeader />
      {productData.data && (
        <main className={styles.main}>
          <BurgerIngredients
            data={productData.data}
            openModal={handleOpenModal}
          />
          <BurgerConstructor
            data={productData.data}
            openModal={handleOpenModal}
          />
        </main>
      )}
      {modalState.open && (
        <Modal closeModal={handleCloseModal}>
          {modalState.props.name === "ingredient" ? (
            <IngredientsDetails item={modalState.props.item} />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  );
}
export default App;
