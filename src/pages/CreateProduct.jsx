import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";
import { addProductsbyCategory } from "../api/products";
import LoadingSpinner from "../outils/Spinner";
function CreateProduct() {
  const [isOffer, setIsOffer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    primaryPrice: 0,
    offer: false,
    likes:[],
    discountedPrice:0,
    imageUrls: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //mutete function
  const onMutate = (e) => {
    e.preventDefault();
    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrls: e.target.files,
      }));
    }

    //checkbox
    if(e.target.type==="checkbox"){
        setIsOffer(e.target.checked)
    }

    //select
    if (e.target.id === "select" && e.target.value) {
      setFormData((prevState) => ({
        ...prevState,
        category: e.target.value,
      }));
    }
    //text/boolean/nums
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  //uploadImages
  const uploadImages = (e) => {
    e.preventDefault();
    document.querySelector("#imageUrls").click();
  };

  //submitForm
  const submitForm = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error("name field is empty");
    if (!formData.primaryPrice) return toast.error("primary price field is empty");
    if(!formData.discountedPrice && isOffer) return toast.error("discounted price field is empty")
    if (!formData.location) return toast.error("adress field missed");
    if (+formData.discountedPrice > +formData.primaryPrice) {
      return toast.error("discounted price should be less than primary price");
    }
    if (formData.imageUrls.length > 6) {
      return toast.error("images must be less then 5");
    }

    setLoading(true);
    /*const formattedAdress=formatAdr(formData.location)
            console.log(formattedAdress)
            const response=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?adress=${formattedAdress}&key=${import.meta.env.VITE_API_KEY}&callback=myMap`)
            const data=await response.json()
            console.log(data)*/
    /*loader.load().then(async () => {
                const { Map } = await google.maps.importLibrary("maps");
              
                const map = new Map(document.getElementById("map"), {
                  center: { lat: -34.397, lng: 150.644 },
                  zoom: 8,
                });
        
                
              });
        }*/

    //store images in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const auth = getAuth();
        const filename = `${auth.currentUser.uid}-${image.name}`;
        const storageRef = ref(storage, "images/" + filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imgUrls = await Promise.all(
      [...formData.imageUrls].map((image) => storeImage(image))
    ).catch((error) => {
      console.log(error);
      return toast.error("images not uploaded");
    });

    //console.log(imgUrls)
    const formDataCopy = {
      ...formData,
      offer:isOffer,
      imgUrls,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.imageUrls;
    try {
      addProductsbyCategory(formDataCopy.category, formDataCopy).then(
        (path) => {
          setLoading(false);
          navigate(path, {
            state: {
              ...formDataCopy
            },
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      } else {
        navigate("/");
      }
    });
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="container mx-auto min-h-screen p-4 pb-28">
      <h1 className="font-bold p-4 text-[#0d0510] text-2xl">
        Create a Product
      </h1>
      <main className=" max-w-lg">
        <form className="w-full p-4" onSubmit={submitForm}>
          {/* name */}
          <div>
            <label className="text-md text-[#474747] font-normal block my-3">
              Name
            </label>
            <input
              type="text"
              onChange={onMutate}
              placeholder="name"
              id="name"
              minLength={1}
              maxLength={100}
              className="py-2 pl-2 w-10/12 rounded-sm bg-white"
            />
          </div>

          {/* category */}
          <div>
            <label className="text-md block text-[#474747] my-3">
              category
            </label>
            <select id="select" onChange={onMutate} className="bg-white">
              <option value="" selected>
                --Please choose an option--
              </option>
              <option value="phones">phones</option>
              <option value="laptops">laptops</option>
              <option value="airdots">airdots</option>
            </select>
          </div>
          {/* is Offer */}
          <div className="flex gap-2 items-center my-2">
                <input type="checkbox" onChange={onMutate} />
                <label>offer</label>
          </div>
          {/* price */}

          <div>
            <label className="text-[#474747] text-md block my-3">primary price</label>
            <input
              type="number"
              id="primaryPrice"
              placeholder="primary price"
              onChange={onMutate}
              className="pl-2 py-2 w-10/12 rounded-sm bg-white"
            />
          </div>

          {
            isOffer && <div>
            <label className="text-[#474747] text-md block my-3">discounted price</label>
            <input
              type="number"
              id="discountedPrice"
              checked={isOffer}
              placeholder="discounted price"
              onChange={onMutate}
              className="pl-2 py-2 w-10/12 rounded-sm bg-white"
            />
          </div>
          }

          {/* adress */}
          <div>
            <label className="text-[#474747] text-md block my-3">adress</label>
            <input
              type="text"
              id="location"
              placeholder="adress"
              onChange={onMutate}
              className="pl-2 py-2 w-10/12 rounded-sm bg-white"
            />
          </div>

          {/* images */}
          <div>
            <label className="text-[#474747] text-md block my-3">
              upload images
            </label>
            <button
              className="p-2 text-white text-xs px-1 rounded-md bg-[#117DF9] border-none"
              onClick={uploadImages}
            >
              upload images
            </button>
            <input
              type="file"
              onChange={onMutate}
              accept=".jpg,.png,.jpeg"
              id="imageUrls"
              className="hidden"
              min={2}
              max={6}
              multiple
              required
            />
          </div>

          <button type="submit" className="font-bold my-2 text-[#117DF9]">
            submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateProduct;
