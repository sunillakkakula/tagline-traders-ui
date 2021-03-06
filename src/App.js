import CategoriesSubMenu from "./components/CategoriesSubMenu";
import { Container } from "@material-ui/core";
import SubMenuHeader from "./components/SubMenuHeader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/Theme";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartLayoutScreen from "./screens/CartLayoutScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
// import SubMenuHeader from "./components/SubMenuHeader";
import DashboardScreen from "./screens/DashboardScreen";
import MuiHeader from "./components/MuiHeader";
import CategoriesSubMenuVer2 from "./components/CategoriesSubMenuVer2";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* NEED TO APPLY MARGIN  TO APP BAR REFER MUI C...
            AND COMMENT THE BELOW LIKE AFTER MAKING CHANGES  -KSP
        */}
        {/* <CategoriesSubMenu /> */}
        {/* <MuiHeader /> */}
        <MuiHeader />
        {/* <SubMenuHeader /> */}
        <CategoriesSubMenuVer2 />
        <main className="py-3">
          <Container>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartLayoutScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/home" component={HomeScreen} exact />
            <Route path="/" component={DashboardScreen} exact />
          </Container>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
