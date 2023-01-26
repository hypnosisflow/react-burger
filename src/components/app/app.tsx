import React, { useEffect, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "../../utils/store-type";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import { ProtectedRoute } from '../protected-route'
import { fetchData } from "../../services/actions/menu";
import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  MainPage,
  Page404,
  FeedPage,
} from "../../pages/index";
import { OrderHistoryDetails } from "../order-history-details/order-history-details";
import { ProfileOrdersPage } from "../../pages/profile-orders";
import { getUser } from "../../services/actions/login";
import { getCookie } from "../../utils/utils";
import { TState } from "../../utils/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TState>();

  const background = location.state && location.state.background;
  const { menu } = useSelector((state) => state.menu);

  const handleModalClose = () => history.goBack();

  const token = localStorage.getItem("refreshToken");
  const cooka = getCookie("accessToken");
  // console.log(token)
  // console.log(cooka)

  useEffect(() => {
    dispatch(getUser());
    // dispatch(tokenRefresh())
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      {menu && (
        <div className={styles.app}>
          <main className={styles.main}>
            <AppHeader />
            <Switch location={background || location}>
              <Route path="/" exact={true}>
                <MainPage />
              </Route>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <ProtectedRoute path="/register" exact={true}>
                <RegisterPage />
              </ProtectedRoute>
              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </Route>
              <Route path="/profile" exact={true}>
                <ProfilePage />
              </Route>
              <Route path="/profile/orders" exact={true}>
                <ProfileOrdersPage />
              </Route>
              <Route path="/profile/orders/:id" exact={true}>
                <OrderHistoryDetails />
              </Route>

              <Route path="/ingredients/:id">
                <IngredientsDetails />
              </Route>
              <Route path="/feed" exact={true}>
                <FeedPage />
              </Route>
              <Route path="/feed/:id" exact={true}>
                <OrderHistoryDetails />
              </Route>
              <Route>
                <Page404 />
              </Route>
            </Switch>
          </main>
        </div>
      )}
      {background && (
        <>
          <Route path="/ingredients/:id">
            <Modal closeModal={handleModalClose}>
              <IngredientsDetails />
            </Modal>
          </Route>
          <Route exact={true} path="/feed/:id">
            <Modal closeModal={handleModalClose}>
              <OrderHistoryDetails />
            </Modal>
          </Route>
          <Route exact={true} path="/profile/orders/:id">
            <Modal closeModal={handleModalClose}>
              <OrderHistoryDetails />
            </Modal>
          </Route>
        </>
      )}
    </DndProvider>
  );
};
export default App;
