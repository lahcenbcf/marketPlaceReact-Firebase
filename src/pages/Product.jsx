import { getAuth } from "firebase/auth";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Map } from "../components/map/Map";
import "./register.css";
import useCoords from "../customHooks/getCoords";
function Product() {
  const { state: prodDataToDisplay } = useLocation();
  //getCoords
  const { coords, loading } = useCoords(prodDataToDisplay.location);
  const auth = getAuth();
  return (
    <main className="container mx-auto min-h-screen p-4 mt-36 pb-80 relative">
      <div className="flex">
        <div className="holderImages hidden md:visible px-10 max-h-[60vh] overflow-x-hidden overflow-scroll w-[50%]">
          {prodDataToDisplay.imgUrls.map((image, index) => (
            <img
              src={image}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "5px",
                margin: "10px 0px",
              }}
            />
          ))}
        </div>

        {/**product details */}
        <div className="p-4 w-10/12 mx-auto md:w-[50%]">
          <h1 className="text-3xl text-[#0d0510] font-semibold">
            {prodDataToDisplay.name}
          </h1>
          <h4 className="text-sm text-slate-500 my-3">
            {prodDataToDisplay.location}
          </h4>
          {prodDataToDisplay.offer && (
            <>
              <p className="stat-title text-lg font-bold text-[#5dacbd]">
                {prodDataToDisplay.discountedPrice} DZ
              </p>
              <p className="text-sm line-through">
                {prodDataToDisplay.primaryPrice} DZ
              </p>
              <p className="my-3 w-[80%] text-slate-500">
                Le lorem ipsum est, en imprimerie, une suite de mots sans
                signification utilisée à titre provisoire pour calibrer une mise
                en page, le texte définitif venant remplacer le faux-texte dès
                qu'il est prêt ou que la mise en page est achevée
              </p>
              {auth?.currentUser?.uid !== prodDataToDisplay.userRef && (
                <Link
                  to={`/contact/${prodDataToDisplay.userRef}?${prodDataToDisplay.name}`}
                  className="p-2 rounded-sm text-sm my-2 bg-[#ffb4ac] hover:bg-[#ff487e] text-white"
                >
                  send message
                </Link>
              )}
            </>
          )}
        </div>

        {/* MAP */}
      </div>
      <div className="w-full h-[30vh]">
        {loading ? (
          <h1>loading map ....</h1>
        ) : (
          <Map location={coords} zoomLevel={13} />
        )}
      </div>
    </main>
  );
}

export default Product;
