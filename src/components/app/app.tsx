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
import { ProtectedRoute } from "../protected-route";
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
import { getUser, checkUserAuth } from "../../services/actions/login";
import { TState } from "../../utils/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TState>();

  const background = location.state && location.state.background;
  const { menu } = useSelector((state) => state.menu);

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(checkUserAuth());

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

              <ProtectedRoute onlyUnAuth={true} path="/login" exact={true}>
                <LoginPage />
              </ProtectedRoute>
              <ProtectedRoute onlyUnAuth={true} path="/register" exact={true}>
                <RegisterPage />
              </ProtectedRoute>
              <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
              <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </ProtectedRoute>

              <ProtectedRoute path="/profile" exact={true}>
                <ProfilePage />
              </ProtectedRoute>
              <ProtectedRoute path="/profile/orders" exact={true}>
                <ProfileOrdersPage />
              </ProtectedRoute>
              <ProtectedRoute path="/profile/orders/:id" exact={true}>
                <OrderHistoryDetails />
              </ProtectedRoute>

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
