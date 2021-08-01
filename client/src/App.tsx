import React from "react"
import { BrowserRouter as Router, Route, RouteProps, Redirect, Switch } from 'react-router-dom';
import {
  ChakraProvider,
  Heading,
  theme,
} from "@chakra-ui/react"

import Home from "./components/Home";
import Login from "./components/Login";
import AuthProvider, { useAuthContext } from "./components/AuthProvider";
import Header from "./components/Header";

const ProtectedRoute = (props: RouteProps<string>) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Redirect to='/login' />
  }

  return (
    <>
      {props.children}
    </>
  );
}

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <Route path='/login/oauth/callback'>
              <Login isCallback />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <ProtectedRoute exact path='/'>
              <Home />
            </ProtectedRoute>
            <Route path='*'>
              <Heading>Page not found...</Heading>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}
