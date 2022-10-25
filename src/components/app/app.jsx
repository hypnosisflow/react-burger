import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
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
import { REMOVE_DETAILS } from "../../services/actions/ingredient";

import {
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  MainPage,
  Page404,
} from "../../pages/index";
import { checkUserAuth } from "../../services/actions/login";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const background = location.state && location.state.background;

  const handleModalClose = () => history.goBack();

  const { modalOpen } = useSelector((state) => state.ingredient);
  const { item } = useSelector((state) => state.ingredient);
  const { menu } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      {menu && (
        <div className={styles.app}>
          <main className={styles.main}>
            {/* <Router> */}
            <AppHeader />
            <Switch location={background || location}>
              <Route path="/" exact={true}>
                <MainPage />
              </Route>
              <ProtectedRoute auth={true} path="/login" exact={true}>
                <LoginPage />
              </ProtectedRoute>
              <ProtectedRoute auth={true} path="/register" exact={true}>
                <RegisterPage />
              </ProtectedRoute>
              <ProtectedRoute auth={true} path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
              <ProtectedRoute auth={true} path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" exact={true}>
                <ProfilePage />
              </ProtectedRoute>
              <Route path="/ingredients/:id" >
                <IngredientsDetails item={item.item} />
              </Route>
              <Route>
                <Page404 />
              </Route>
            </Switch>
            {/* </Router> */}
          </main>
        </div>
      )}
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={handleModalClose}>
            <IngredientsDetails item={item.item} />
          </Modal>
        </Route>
      )}
    </DndProvider>
  );
}
export default App;
