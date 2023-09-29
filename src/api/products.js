import {categories} from '../outils/categories'
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    
    startAfter,
    doc,
    addDoc,deleteDoc, updateDoc, getDoc
}from 'firebase/firestore'
import {toast} from 'react-toastify'
import { db } from '../firebase.config'
export const fetchProductsbyCategory=async(categoryName,setLastFetchedListing)=>{
       
    try{
        //get refercence
        const collectionName=collection(db,categoryName)
        const q= setLastFetchedListing ? query(collectionName,orderBy('timestamp','desc'),limit(1))  : query(collectionName,orderBy('timestamp','desc'))
        const querySnap=await getDocs(q)
        setLastFetchedListing && setLastFetchedListing(querySnap.docs[querySnap.docs.length - 1])
        let prods=[]

        querySnap.forEach(d=>prods.push({
            id:d.id,
            data:d.data()
        }))
        //
        return prods
    } catch (error) {
        toast.error("something went wrong")
    }
}


//fetch more products 
export const fetchMoreProducts=async(categoryName,lastFetchedProduct,setLastFetchedListing,setProds)=>{
       
    try{
        //get refercence
        const collectionName=collection(db,categoryName)
        const q= query(collectionName,orderBy('timestamp','desc'),limit(1),startAfter(lastFetchedProduct)) 
        const querySnap=await getDocs(q)
        let prods=[]
        querySnap.forEach(d=>prods.push({
            id:d.id,
            data:d.data()
        }))
        //update prods adding
        setProds(prev=>[...prev,...prods])
        //update listings
        setLastFetchedListing(querySnap.docs[querySnap.docs.length-1])
        return prods
    } catch (error) {
        toast.error("something went wrong")
    }
}


export const addProductsbyCategory=(categoryName,data)=>{
     return new Promise(async(resolve,reject)=>{
        try{
            //get refercence
            const collectionName=collection(db,categoryName) 
            const docRef=await addDoc(collectionName,data)
            toast.success("data saved")
            //
            resolve(`/categorie/${categoryName}/${docRef.id}`)
        } catch (error) {
            toast.error("something went wrong")
            reject(error)
        }
     })  
    
}

 export const getProductsToExplore=()=>{
    return Promise.all(
        [...categories.map(cat=>fetchProductsbyCategory(cat.title))]
    )
 }

 export const DeleteProduct=async(productId,collectionName)=>{
    try {
        await deleteDoc(doc(db,collectionName,productId))
    } catch (error) {
        console.log(error)
    }
    
    
 }

 export const likeProductAction=async(id,collectionName,userId,status)=>{
        try {
            const docRef=doc(db,collectionName,id)
            const docData=await getDoc(docRef)
            await updateDoc(docRef,{
                ...docData.data(),
                likes:  status ? docData.data().likes.filter(l=>l!=userId) :  [...docData.data().likes,userId]
            })
            return true
        } catch (error) {
            console.log(error)
            return error
        }
 }

 export const fetchLikedProducts=()=>{
    try {
        return Promise.all(
            [...categories.map(cat=>fetchProductsbyCategory(cat.title))]
        )
    } catch (error) {
        toast.error("something went wrong")
    }
 }