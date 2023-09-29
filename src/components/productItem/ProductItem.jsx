import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteProduct, likeProductAction } from "../../api/products";
import { AiOutlineDelete, AiOutlineHeart,AiOutlineEdit , AiFillHeart } from "react-icons/ai";
import { AppContext } from "../../context/AppContext";
import { BsEye} from "react-icons/bs";
import Rate from "./Rate";
import "./productItem.css";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
function ProductItem({ product: { id, data }, isDelete, setListings }) {
  const navigate = useNavigate();
  const {setLikedProducts,setSomethingChange,likedProducts}=useContext(AppContext)
  const auth=getAuth()
  const [like,setLike]=useState(data.likes.includes(auth.currentUser.uid))
  const onDeleteProduct = (collectionName) => {
    if (window.confirm("are you sure you want to delete your product ?")) {
      DeleteProduct(id, collectionName).then(() => {
        setListings((prev) => prev.filter((p) => p.id != id));
      });
    }
  };
  const likeProduct=()=>{
      likeProductAction(id,data.category,auth.currentUser?.uid,like).then(result => {
        if(!like) {
          setLikedProducts(prev=>[{data,id},...prev])
          setSomethingChange(true)
         } else setLikedProducts(likedProducts.filter(p=>p.data.userRef!=auth.currentUser.uid))
        setLike(!like)
      }).catch(e=>toast.error("something went wrong"))
  }
  return (
    <div className="w-[260px] rounded-lg border-4 border-[#bbe9db] relative mx-auto">
      <div className="imageWrapper bg-[#ececec] w-full grid place-items-center rounded-lg relative mb-36">
        <img
          src={data.imgUrls[0]}
          height={100}
          className="absolute top-0 h-32 object-cover hover:h-40  transition-h duration-75 w-full brightness-75"
        />
      </div>
      {/* product content */}
      <div className="p-4 relative">
        <h2 className="text-md lg:text-xl text-slate-600 font-semibold">
          {data.name}
        </h2>
        <p className="text-sm text-slate-400">{data.category}</p>
        
        <div className="flex justify-between my-4">
        {
          data.offer ?  <div>
          <p className="text-[#40a798] font-semibold text-lg">
            {data.discountedPrice}DZ
          </p>
          <p className="text-slate-400 text-xs line-through">
            {data.primaryPrice}DZ
          </p>
        </div> :  <p className="text-slate-400 text-xs line-through">
        {data.primaryPrice}DZ
      </p>
        }
          
          <p
            className={`${
              data.status ? "text-[#40a798]" : "text-red-400"
            } font-semibold`}
          >
            {data.status ? "In stock" : "wait"}
          </p>
        </div>
        {/* rate componenet */}
        <Rate />

        <div className="my-3 flex items-center gap-4">
          <Link to={`/contact/${data.userRef}`}>
          {
              auth.currentUser?.uid  !== data.userRef && <button className="p-2 rounded-sm text-sm my-2 bg-[#ffb4ac] hover:bg-[#ff487e] text-white">
              message
            </button> 
          }
            
          </Link>
          <Link
            to={`/categorie/${data.category}/${id}`}
            state={data}
            className="p-4 rounded-sm border-2 grid place-content-center h-8 w-8 bg-[#e3e3e3]"
          >
            {<BsEye />}
          </Link>
          <div className="p-4 rounded-sm border-2 grid place-content-center h-8 w-8 bg-[#e3e3e3]" onClick={likeProduct}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
        </div>
      </div>

      {/* delete icon */}
      {isDelete && (
        
        <div>
        <div className="absolute bottom-8 right-2 p-4 rounded-sm border-2 grid place-content-center h-8 w-8 bg-[#e3e3e3]">
        <AiOutlineDelete
        onClick={() => onDeleteProduct(data.category)}
      />
          </div>
          <div className="absolute bottom-8 right-14 p-4 rounded-sm border-2 grid place-content-center h-8 w-8 bg-[#e3e3e3]">
          <AiOutlineEdit
          
          onClick={() =>
            navigate("/editProduct", {
              state: {
                data,
                id,
              },
            })
          }
        />
          </div>
         
        </div>
      )}
    </div>
  );
}

export default ProductItem;
