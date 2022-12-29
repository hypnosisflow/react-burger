import React, { useEffect, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "../../utils/hooks";
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
} from "../../pages/index";
import { TState } from "../../utils/types";
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS } from "../../models/wsActionTypes";
import { wsConnectionClose, wsConnectionStart } from "../../services/actions/wsActions";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TState>();

  const background = location.state && location.state.background;
  const handleModalClose = () => history.goBack();
  // @ts-ignore
  const { menu } = useSelector((state) => state.menu)<any>;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(wsConnectionStart())

  // }, [dispatch]);

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
              <Route path="/ingredients/:id">
                <IngredientsDetails />
              </Route>
              <Route>
                <Page404 />
              </Route>
            </Switch>
          </main>
        </div>
      )}
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={handleModalClose}>
            <IngredientsDetails />
          </Modal>
        </Route>
      )}
    </DndProvider>
  );
};
export default App;
