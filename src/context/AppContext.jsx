import { createContext, useState } from "react";

export const AppContext=createContext()
export const AppProvider=({children})=>{
    const [likedProducts,setLikedProducts]=useState([])
    const [somethingChange,setSomethingChange]=useState(false)
    return <AppContext.Provider value={{
        likedProducts,
        setLikedProducts,
        somethingChange,
        setSomethingChange
    }}>
        {children}
    </AppContext.Provider>
}
