import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteProduct } from "../../api/products";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
function ProductItem({ product: { id, data }, isDelete, setListings, index }) {
  const navigate = useNavigate();
  const onDeleteProduct = (collectionName) => {
    if (window.confirm("are you sure you want to delete your product ?")) {
      DeleteProduct(id, collectionName).then(() => {
        setListings((prev) => prev.filter((p) => p.id != id));
      });
    }
  };

  return (
    <div className="bg-white w-full flex items-center gap-4 p-4 mt-5 relative">
      <div className="absolute top-0 left-6 bg-[#117DF9] h-9 w-6 rounded-2xl rounded-t-none grid place-items-center font-bold text-white">
        {index + 1}
      </div> 
      {/* product content */}
      <div className="w-[70%] mt-6">
        <p className="text-xs px-2">{data.category}</p>
        <p className="text-slate-500 font-semibold text-sm px-2">{data.location}</p>
        <h2 className="text-md lg:text-xl text-[#0d0510] font-bold px-2">
          {data.name}
        </h2>

        <p className="font-bold text-[#57ba36] mt-1 px-2">
          {data.primaryPrice} DZ
        </p>
        <Link to={`/categorie/${data.category}/${id}`} state={data}>
        <button className="p-2 rounded-lg text-sm my-2 bg-[#57ba36] text-white">view product</button>
        </Link>
        
      </div>
      {/* image background */}
      <div className="h-24 w-28 rounded-lg shadow-md hover:brightness-50 z-0">
        <img src={data.imgUrls[0]} className="w-full h-full" />
      </div>

      {/* delete icon */}
      {isDelete && (
        <>
          <AiFillDelete color="red"
            className="absolute top-2 right-2 box-content p-2 bg-[#CCCCCC] rounded-md"
            onClick={() => onDeleteProduct(data.category)}
          />
          <BiEdit
            color="green"
            className="absolute top-12 right-2 lg:top-2 lg:right-8 box-content p-2 bg-[#CCCCCC] rounded-md"
            onClick={() =>
              navigate("/editProduct", {
                state: {
                  data,
                  id,
                },
              })
            }
          />
        </>
      )}
    </div>
  );
}

export default ProductItem;
