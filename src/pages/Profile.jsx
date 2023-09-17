import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiShoppingTag } from "react-icons/ci";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaInbox } from "react-icons/fa";
import useAuthStatus from "../components/customHooks/useAuthStatus";
import { fetchUserProducts } from "../api/profile";
import ProductItem from "../components/productItem/ProductItem";
import LoadingSpinner from "../outils/Spinner";

function Profile() {
  const [isChange, setIsChange] = useState(false);
  const { currentUser, signOut } = getAuth();
  const { isLogged } = useAuthStatus();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  /*const [userInfoData,setUserInfoData]=useState({
    name:auth?.currentUser?.displayName ||"",
    email:auth?.currentUser?.email ||""
  })
*/
  //prefer using useRef for performance issue
  const nameRef = useRef();
  /*const changeUserInfo=(e)=>{
    setUserInfoData({
      ...userInfoData,
      [e.target.id]:e.target.value
    })
  }*/
  //const {email,name}=userInfoData
  const navigate = useNavigate();
  const ChangeInfo = async () => {
    if (!nameRef.current.value) return toast.error("check your inputs");
    if (currentUser.displayName != nameRef.current.value) {
      //update the username
      try {
        await updateProfile(currentUser, {
          displayName: nameRef.current.value,
        });
        //update in firestore
        const userRef = doc(db, "users", currentUser);
        await updateDoc(userRef, {
          username: nameRef.current.value,
        });
        toast.success("username is updated succesufuly");
      } catch (error) {
        toast.error("username can not be updated");
      }
    }

    nameRef.current.value = "";
  };
  const getClicked=(e)=>{
    e.preventDefault()
    document.getElementById("userPhoto").click()
  }
  const uploadPhotoUrl=async(e)=>{
    if(!e.target.files){
      return toast.error("upload photo")
    }
    try {
      await updateProfile(currentUser,{
        photoURL:e.target.files[0]
      })
      toast.success("uploaded")
    } catch (error) {
      console.log("error")
    }
    

  }
  const logoutUser = () => {
    signOut(auth).then(() => navigate("/"));
  };
  useEffect(() => {
    fetchUserProducts(currentUser).then((data) => {
      data.forEach((d) => setListings((prev) => [...prev, ...d]));
      setLoading(false);
    });
  }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="container min-h-screen mx-auto p-4 pt-0 pb-28">
      {/* profile header */}
      <div className=" h-32 bg-[#117DF9] p-6 rounded-t-lg flex justify-between">
        <h1 className=" text-white text-xl">My Profile</h1>
        <button className="p-2 rounded-md bg-white h-fit" onClick={logoutUser}>logout</button>
        {/*
          {isLogged && <button className='p-2 text-xs rounded-sm bg-[#DEE4ED]' onClick={logoutUser}>logout</button>} 
          */}
      </div>
      {/* profile body */}
      <main className="max-w-lg w-full bg-white rounded-lg -translate-y-11 mx-auto p-4 shadow-lg">
        {/**avatar with btn upload photo */}

        <div className="flex justify-between items-center">
          <img
            width={100}
            height={100}
            src={
              auth.currentUser?.photoURL
                ? auth.currentUser?.photoURL
                : "https://cdn-icons-png.flaticon.com/128/4128/4128176.png"
            }
            className="rounded-full"
          />
          <input type="file" id="userPhoto" className="hidden" onChange={uploadPhotoUrl} accept='.jpg,.png,.jpeg' required />
          <button className="bg-[#F0EFFA] rounded-lg p-1 font-medium px-2" onClick={getClicked}>
            upload photo
          </button>
        </div>

        {/* personal details */}

        <div className="p-4 my-5 rounded-lg border border-[#9197B3]">
          <form className="w-full">
            <div className="w-full my-4">
              <h3 className="text-[#9197B3] text-sm font-semibold">
                Your Email
              </h3>
              <p className="font-semibold text-[#0d0510]">
                {currentUser.email}
              </p>
            </div>

            <div className="w-full my-4">
              <h3 className="text-[#9197B3] text-sm font-semibold">
                Your Username
              </h3>
              <div className="flex items-center justify-between">
                {isChange ? (
                  <input
                    placeholder="enter your new username"
                    type="text"
                    className="h-full w-10/12 outline-none border p-2 border-dotted"
                    ref={nameRef}
                  />
                ) : (
                  <p className="font-semibold text-[#0d0510]">
                    {currentUser.displayName}
                  </p>
                )}
                {/*edit btn */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    isChange && ChangeInfo();
                    setIsChange(!isChange);
                  }}
                  className="bg-[#9197B3] text-xs text-white px-2 py-1 rounded-md"
                >
                  {isChange ? "done" : "edit"}
                </button>
              </div>
            </div>

            {
              currentUser?.phoneNumber && 
              <div className="w-full my-4">
              <h3 className="text-[#9197B3] text-sm font-semibold">
                Your phoneNumber
              </h3>
              <p className="font-semibold text-[#0d0510]">
                {currentUser.phoneNumber}
              </p>
            </div>
            }
          </form>
        </div>
        <Link
          to="/createProduct"
          className="bg-[#117DF9] p-2 flex items-center justify-center gap-2 rounded-md text-white w-full"
        >
          create new Product
        </Link>
      </main>

      {/* user products */}

      {listings.length ? (
        <div className="w-full">
          <p className="text-[#117DF9] font-semibold">Your Products</p>
          {listings.map((listing, idx) => (
            <ProductItem
              key={idx}
              index={idx}
              product={listing}
              isDelete={true}
              setListings={setListings}
            />
          ))}
        </div>
      ) : (
        <h1 className="my-3">no items for now</h1>
      )}
    </div>
  );
}

export default Profile;
