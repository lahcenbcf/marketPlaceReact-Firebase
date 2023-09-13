import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Offers from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import ForgotPass from './pages/ForgotPass'
import Navbar from './components/Navbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import CategoryPage from './pages/CategoryPage'
import Affaires from './pages/Affaires'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'
import Contact from './pages/Contact'
import EditProduct from './pages/EditProduct'
import Inbox from './pages/Inbox'
import { useEffect, useState } from 'react'
function App() {
  const [navIsActive,setNavIsActive]=useState(false)
  useEffect(()=>{
    const auth=getAuth()
    onAuthStateChanged(auth,user=>{
        if(user) setNavIsActive(true)
    })
  },[])
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Offers />} />
        <Route path='/offers' element={<Affaires />} />
        {/* use PrivateRoute */}
        <Route path='/myProfile' element={<PrivateRoute />}>
          <Route path='/myProfile' element={<Profile />} />
        </Route>
        <Route path='/createProduct' element={<CreateProduct />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<Register />} />
        <Route path='/forgotPass' element={<ForgotPass />} />
        <Route path='/categorie/:categoryName' element={<CategoryPage />} />
        <Route path='/categorie/:categoryName/:productId' element={<Product />} /> 
        <Route path='/contact/:userRef' element={<Contact />} />
        <Route path='/editProduct' element={<EditProduct />} />
        <Route path='/myInbox' element={<Inbox />} />
        <Route path='*' element={<h1>page not found</h1>} /> 
        
        </Routes>
      {
        navIsActive &&  <Navbar />
      }
       
    </Router>
      {/* our navbar */}
      <ToastContainer />
    </>
  )
}

export default App
