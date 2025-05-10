import {createContext, useState, useContext, useEffect, useRef} from "react"

const FavouriteContext = createContext()

export const useFavouriteContext = () => useContext(FavouriteContext)

export const FavouriteProvider = ({children}) => {

    const [favourites, setFavourites] = useState([])
    const isFirstLoad = useRef(true)

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")
         
        if(storedFavs) setFavourites(JSON.parse(storedFavs)) 
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites])

    const isFavourite = (stockID) => {
        return favourites.some(stock => stock.ID === stockID)
    }

    const addToFavourites = (stock) => {
        setFavourites(prev => [...prev, stock])
    }

    const removeFromFavourites = (stockID) => {
        setFavourites(prev => prev.filter(stock => stockID !== stock.ID))
    }

    const value = {
        favourites,
        isFavourite,
        addToFavourites,
        removeFromFavourites
    }

    return <FavouriteContext.Provider value={value}>
        {children}
    </FavouriteContext.Provider>
}