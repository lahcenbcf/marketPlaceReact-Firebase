import { query,collection,where,updateDoc, getDocs,and, addDoc, doc, or, getDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {format } from 'date-fns'
export const getMessages=async(sendId,receId)=>{
    try {
        const collectionRef=collection(db,"chatRooms")
        const q=query(collectionRef,or(and(where("senduserInfo.id","==",sendId),where("receiveuserInfo.id","==",receId)),and(where("senduserInfo.id","==",receId),where("receiveuserInfo.id","==",sendId))));
        const querySnapshot=await getDocs(q)
        return querySnapshot.docs.length ? querySnapshot.docs[0].data().messages : []
    } catch (error) {
        console.log(error)
    }
    
}

export const addChatRoom=async(send,rece,message)=>{
    try {
        const chatRoomsCollection=collection(db,'chatRooms')
        const newMessage={
            message,
            name:send.name,
            email:send.email,
            userId:send.id,
            photoUrl:send.photo
            ,createdAt:format(new Date(), 'MM/dd/yyyy'),
            time:format(new Date(),"hh:mm")
        }
        await addDoc(chatRoomsCollection,{
            senduserInfo:send,
            receiveuserInfo:rece,
            firstWhoSend:send.id,
            messages:Array(1).fill(newMessage)
        })

        /*db docRef.collection("messages").add({
            text:message,
            createdAt:serverTimestamp()
        }) */

    } catch (error) {
        console.log(error)
    }
    
}

export const checkIfChatRoomExist=(send,receive)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const collectionRef=collection(db,"chatRooms")
        const q=query(collectionRef,or(and(where("senduserInfo.id","==",send.id),where("receiveuserInfo.id","==",receive.id)),and(where("senduserInfo.id","==",receive.id),where("receiveuserInfo.id","==",send.id))))
        const snapShotData=await getDocs(q)
        if(!snapShotData.docs.length){
            resolve(false)
        }else{
            resolve(snapShotData.docs[0].id)
        }
        } catch (error) {
            reject(error)
        }
    })
   
    

}

export const updateRoomChatMessages=async (send,mess,docId)=>{
    try {
        const docRef=doc(db,"chatRooms",docId);
        const data=await getDoc(docRef)
        await updateDoc(docRef,{
            ...data.data(),messages:[
                ...data.data()?.messages,
                {
                    message:mess,
                    name:send.name,
                    email:send.email,
                    userId:send.id
                    ,
                    photoUrl:send.photo
                    ,createdAt:format(new Date(), 'MM/dd/yyyy'),
            time:format(new Date(),"hh:mm")
                }
            ]
            
        })
    } catch (error) {
        console.log(error)
    }
}


export const getMychatRooms=async(userId)=>{
    try {
        const collectionRef=collection(db,"chatRooms");
        const q=query(collectionRef,or(where("receiveuserInfo.id","==",userId),where("senduserInfo.id","==",userId)));
        const querySnapshot=await getDocs(q);
        return querySnapshot.docs.length ? querySnapshot.docs : []
    } catch (error) {
        console.log(error)
    }
}