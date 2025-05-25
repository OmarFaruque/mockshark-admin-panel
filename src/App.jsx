import { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Preloader from "./components/Preloader";
// import HeroSection from "./pages/HeroSection";
// import Service from "./pages/Service";
// import Blog from "./pages/Blog";
// import Location from "./pages/Location";
// import Publication from "./pages/Publication";
// import Online from "./pages/Online";
// import Faq from "./pages/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavHeader from "./components/NavHeader";
import Sidebar from "./components/Sidebar";
import Auth from "./libs/auth";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Module = lazy(() => import("./pages/Module"));
const Role = lazy(() => import("./pages/Role"));
const User = lazy(() => import("./pages/User"));
const Category = lazy(() => import("./pages/Category"));
const Campaign = lazy(() => import("./pages/Campaign"));
const Product = lazy(() => import("./pages/Product"));
const Supplier = lazy(() => import("./pages/Supplier"));
const MonthlyPayment = lazy(() => import("./pages/MonthlyPayment"));
const Order = lazy(() => import("./pages/Order"));
const Banner = lazy(() => import("./pages/Banner"));
const Brand = lazy(() => import("./pages/Brand"));
const Subcategory = lazy(() => import("./pages/Subcategory"));
const Subsubcategory = lazy(() => import("./pages/Subsubcategory"));
const Coupon = lazy(() => import("./pages/Coupon"));
const Preorder = lazy(() => import("./pages/Preorder"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Contact = lazy(() => import("./pages/Contact"));
const Attribute = lazy(() => import("./pages/Attribute"));
const ProductImage = lazy(() => import("./pages/ProductImage"));

// const Gallery = lazy(() => import("./pages/Gallery"));
// const Profile = lazy(() => import("./pages/Profile"));
// const Inbox = lazy(() => import("./pages/Inbox"));
// const Review = lazy(() => import("./pages/Review"));
// const Order = lazy(() => import("./pages/Order"));
// const Reservation = lazy(() => import("./pages/Reservation"));

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ToastContainer />

      <div id="main-wrapper">
        {pathname !== "/" && (
          <>
            <NavHeader />

            <Header />
            <Sidebar />
          </>
        )}

        <Suspense fallback={<Preloader />}>
          <Switch>
            <>
              <Route exact path="/dashboard" component={Auth(Dashboard)} />
              <Route exact path="/modules" component={Auth(Module)} />
              <Route exact path="/roles" component={Auth(Role)} />
              <Route exact path="/users" component={Auth(User)} />
              <Route exact path="/categories" component={Auth(Category)} />
              <Route exact path="/campaigns" component={Auth(Campaign)} />
              <Route exact path="/products" component={Auth(Product)} />
              <Route exact path="/suppliers" component={Auth(Supplier)} />
              <Route
                exact
                path="/monthly-payments"
                component={Auth(MonthlyPayment)}
              />
              <Route exact path="/orders" component={Auth(Order)} />
              <Route exact path="/banners" component={Auth(Banner)} />
              <Route exact path="/brands" component={Auth(Brand)} />
              <Route
                exact
                path="/subcategories"
                component={Auth(Subcategory)}
              />
              <Route
                exact
                path="/subsubcategories"
                component={Auth(Subsubcategory)}
              />
              <Route exact path="/coupons" component={Auth(Coupon)} />
              <Route exact path="/preorders" component={Auth(Preorder)} />
              <Route exact path="/newsletters" component={Auth(Newsletter)} />
              <Route exact path="/messages" component={Auth(Contact)} />
              <Route exact path="/attributes/:id" component={Auth(Attribute)} />
              <Route
                exact
                path="/products/images/:id"
                component={Auth(ProductImage)}
              />

              {/* <Route exact path="/gallery" component={Auth(Gallery)} />
              <Route exact path="/hero-section" component={Auth(HeroSection)} />
              <Route exact path="/service" component={Auth(Service)} />
              <Route exact path="/about" component={Auth(Profile)} />
              <Route exact path="/inbox" component={Auth(Inbox)} />
              <Route exact path="/review" component={Auth(Review)} />
              <Route exact path="/order" component={Auth(Order)} />
              <Route exact path="/reservation" component={Auth(Reservation)} />
              <Route exact path="/blogs" component={Auth(Blog)} />
              <Route exact path="/locations" component={Auth(Location)} />
              <Route exact path="/publications" component={Auth(Publication)} />
              <Route exact path="/order-online" component={Auth(Online)} />
              <Route exact path="/faq" component={Auth(Faq)} /> */}

              <Route exact path="/" component={LoginPage} />
            </>
          </Switch>
        </Suspense>
        {pathname !== "/" && (
          <>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
