import React, { lazy, Suspense, useEffect } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./Redux/app/hooks";
import {
  auth,
  convertCollection,
  createUserProfileDocument,
  firestore,
} from "./Components/Firebase/firebase";
import { signInUser } from "./Redux/features/User/UserSlice";
import Spinner from "./Components/Spinner/Spinner";
import { setCollection } from "./Redux/features/Shop/ShopSlice";

const CollectionOverView = lazy(
  () => import("./Components/CollectionOverView/CollectionOverView")
);
const CheckOut = lazy(() => import("./Pages/CheckOut/CheckOut"));
const Payment = lazy(() => import("./Pages/Payment/Payment"));
const SignIn = lazy(() => import("./Pages/SignIn/SignIn"));
const Registration = lazy(() => import("./Pages/Registration/Registration"));
const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (UserAuth) => {
      if (UserAuth) {
        const userRef = await createUserProfileDocument(UserAuth);
        userRef?.onSnapshot((snapshot: any) => {
          if (snapshot.data() === undefined) {
            return;
          } else {
            dispatch(
              signInUser({
                id: snapshot.id,
                displayName: snapshot.data().displayName,
                email: snapshot.data().email,
                address: snapshot.data().address,
              })
            );
          }
        });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    collectionRef.get().then((snapshot) => {
      const Collection = convertCollection(snapshot);
      dispatch(setCollection(Collection));
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="component">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<Spinner />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/registration"
            element={
              <Suspense fallback={<Spinner />}>
                <Registration />
              </Suspense>
            }
          />
          <Route
            path="/shop"
            element={
              <Suspense fallback={<Spinner />}>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/shop/:collectionId"
            element={
              <Suspense fallback={<Spinner />}>
                <CollectionOverView />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Spinner />}>
                <CheckOut />
              </Suspense>
            }
          />
          <Route
            path="/payment"
            element={
              <Suspense fallback={<Spinner />}>
                <Payment />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
