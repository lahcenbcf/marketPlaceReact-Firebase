import React,{useRef,useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { doc, updateDoc,serverTimestamp } from 'firebase/firestore'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { DeleteProduct, addProductsbyCategory } from '../api/products'
import LoadingSpinner from '../outils/Spinner'
function EditProduct() {
    const [loading,setLoading]=useState(false)
    const {state:{
        data,id
    }}=useLocation()
    const navigate=useNavigate()
    const [showDiscountedPrice,setShowDiscountedPrice]=useState(data.offer)
    const [formData,setFormData]=useState({
        name:"",
        category:"",
        location:"",
       offer:true,
            latitude:0,
            longitude:0   
        ,
        primaryPrice:0,
        discountedPrice:0,
        imageUrls:null
    })
    const checkBoxRef1=useRef()
    const checkBoxRef2=useRef()
    const {name,location,category,offer,primaryPrice,discountedPrice}=formData
    const uploadImages=()=>{
        document.querySelector("#imageUrls").click()
    }
    const updateProduct=async (e)=>{
        e.preventDefault()
        if(!formData.name)return toast.error("name field is empty")
        if(!formData.primaryPrice) return toast.error("price field is empty")
        if(!formData.location) return toast.error("adress field missed")
        if(+formData.discountedPrice> +formData.primaryPrice){
            return toast.error("discounted price should be less than primary price")
        }
        if(formData.imageUrls.length>6){
            return toast.error("images must be less then 5")
        }

      
        setLoading(true)
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
        const storeImage=async(image)=>{
            return new Promise((resolve,reject)=>{
                    const storage=getStorage()
                    const auth=getAuth()
                    const filename=`${auth.currentUser.uid}-${image.name}`


                    const storageRef=ref(storage,'images/'+filename)
                    const uploadTask=uploadBytesResumable(storageRef,image)

                    // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                            }
                    }, 
                    (error) => {
                          reject(error)
                                    }, 
                                            () => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    resolve(downloadURL);
  });
}
);
            }) 

    
        }
    const imgUrls=await Promise.all(
        [...formData.imageUrls].map(image=>storeImage(image))
    
        ).catch((error)=>{
            console.log(error)
            return toast.error("images not uploaded")
        })

        //console.log(imgUrls)
        const formDataCopy={
            ...formData,
            imgUrls,
            timestamp:serverTimestamp()
        }

        delete formDataCopy.imageUrls
        delete formDataCopy.location
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        
        try {
            const docRef=doc(db,data.category,id)
            
            await updateDoc(docRef,formDataCopy)
            if(formData.offer != data.offer){
                //check if we add or remove
                if(formData.offer){
                    //add
                    addProductsbyCategory("affaires",formDataCopy).then((path)=>{
                        navigate(path)
                    })
                }else{
                    //remove 
                    DeleteProduct(id,"affaires").then(()=>toast.success("your product is deleted")).catch(()=>toast.error('error'))
                }
            }
            setLoading(false)
            toast.success("document updated !")
            navigate(`/categorie/${data.category}/${docRef.id}`)

            
        } catch (error) {
           console.log(error) 
        }
        
        
    }
    const onMutate=(e)=>{
        e.preventDefault()
        //files
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                imageUrls:e.target.files
            }))
        }

        //select
        if(e.target.id==="select" && e.target.value!=""){
            setFormData(prevState=>({
                ...prevState,
                category:e.target.value
            }))
        }
        //text/boolean/nums
        if(!e.target.files){
            setFormData(prevState=>({
                ...prevState,
                [e.target.id]:e.target.value
            }))
        }
        //checkbox
        if(e.target.type==="checkbox"){
            if(checkBoxRef1.current.id===e.target.id){
                if(e.target.checked){
                    //the second checkbox must be disbaled
                    checkBoxRef2.current.checked=false
                }
            }else{
                if(e.target.checked){
                    //the second checkbox must be disbaled
                    checkBoxRef1.current.checked=false
                } 
            }
            if(!e.target.value){
                setShowDiscountedPrice(false)
            }
            setFormData(prevState=>({
                ...prevState,offer:e.target.value
            }))
        }
        
    }
    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setFormData({...formData,userRef:user.uid})
            }else{
                navigate("/")
            }
        })
       
    },[])
    if(loading) return <LoadingSpinner />
    return ( 
        <div className='container mx-auto min-h-screen p-4'>
            <h1 className='font-bold p-4 text-[#0d0510] text-2xl'>Edit a Product</h1>
            <main className=' max-w-lg'>
              <form className='w-full p-4' onSubmit={updateProduct}>
              {/* name */}
                <div>
                    <label className='text-md text-[#474747] block my-3'>Name</label>
                    <input type='text' onChange={onMutate} placeholder='name' id='name' minLength={1} maxLength={100} className='py-2 pl-2 w-10/12 rounded-sm' value={name} />
                </div>
    
                {/* category */}
                <div>
                <label className='text-md text-[#474747] block my-3'>category</label>
                <select defaultValue={category} id='select' onChange={onMutate}>
                    <option value="">--Please choose an option--</option>
                    <option value="phones">phones</option>
                    <option value="laptops" >laptops</option>
                    <option value="airdots">airdots</option>
                </select>
            </div>  
    
            {/* price */}
    
            <div>
            <label className='text-md text-[#474747] block my-3'>price</label>
            <input type='number' id='primaryPrice' placeholder='price' onChange={onMutate} className='pl-2 py-2 w-10/12 rounded-sm' value={primaryPrice} />
        </div>  
    
        {/* offer */}
    
        <div>
        <label className='text-md text-[#474747] block my-3'>offer</label>
        <div className='flex items-center gap-2'>
        <input type='checkbox' id='yes' onChange={onMutate} value={true} ref={checkBoxRef1} /><h2>yes</h2>
        </div>
        <div className='flex items-center gap-2'>
        <input  type='checkbox' id='no' onChange={onMutate} value={false} ref={checkBoxRef2} /><h2>no</h2>
        </div>
    </div>  
    {/* adress */}
        <div>
        <label className='text-md text-[#474747] block my-3'>adress</label>
            <input type='text' id="location" placeholder='adress' onChange={onMutate} className='pl-2 py-2 w-10/12 rounded-sm' value={location} />
        </div>
        
    
        
        
        
        {/* images */}
        <div>
            <label className='text-md text-[#474747] block my-3'>upload images</label>
            <button className='p-2 text-white text-xs px-1 rounded-md bg-[#117DF9] border-none' onClick={uploadImages}>upload images</button>
            <input type='file' onChange={onMutate} accept='.jpg,.png,.jpeg'  id="imageUrls" className="hidden" min={2} max={6} multiple required />
        </div>
        {/* discounted price */}
        {
            showDiscountedPrice && <div>
            <label className='text-md text-[#474747] block my-3'>discounted price</label>
            <input type='number' className='pl-2 py-2 rounded-sm w-10/12' placeholder='discountedPrice' id='discountedPrice' onChange={onMutate} value={discountedPrice}  />
            </div>
        }
        
        <button type='submit' className='font-bold my-2 text-[#117DF9]'>edit product</button>
        </form>
            </main>
    
        </div>
      )
}

export default EditProduct