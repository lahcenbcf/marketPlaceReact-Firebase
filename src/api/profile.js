import {doc,getDocs,collection,query,where,orderBy,deleteDoc}
 from 'firebase/firestore'
import { db } from '../firebase.config'
import {categories} from '../outils/categories'

const helperFunc=async(collectionName,currentUser)=>{
    try {
        var prods=[]
        const collectionRef=collection(db,collectionName)
        const q=query(collectionRef,orderBy("timestamp","desc"))
        const querySnap=await getDocs(q);
        querySnap.docs.length && querySnap.forEach(doc=>{
            prods.push({
                data:doc.data(),
                id:doc.id
            })
        })
        console.log(prods)
        if(prods.length) return  prods.filter(p=>p.data.userRef === currentUser?.uid)
        return []
    } catch (error) {
        console.log(error)
    }
    
}

export const fetchUserProducts=(currentUser)=>{
      return Promise.all([
        ...categories.map(cat=>helperFunc(cat.title,currentUser))
      ])
}

