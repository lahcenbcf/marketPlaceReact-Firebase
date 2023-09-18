import {categories} from '../outils/categories'
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    
    startAfter,
    doc,
    collectionGroup,
    addDoc,deleteDoc
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
    console.log(collectionName,productId)
    try {
        await deleteDoc(doc(db,collectionName,productId))
    } catch (error) {
        console.log(error)
    }
    
    
 }