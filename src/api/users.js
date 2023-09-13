import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

export const getUser=async(userId)=>{
const docUserRef=doc(db,'users',userId)
const docSnap=await getDoc(docUserRef)

if(docSnap.exists()){
    return docSnap.data()
}else{
    toast.error("error !")
    return null
}
}