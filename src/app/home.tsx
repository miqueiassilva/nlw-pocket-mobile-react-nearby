import { Alert, FlatList, View } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categorias, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketsProps = PlaceProps

export default function Home(){
    
    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try{
            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possivel carregar as categorias")
        }
    }
    
    async function fetchMarkets(){
        try{
            if(!category){
                return
            }

            const {data} = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch(error){
            console.log(error)
            Alert.alert("Locais", "Não foi possivel carregar os locais")
        }

    }
    
    useEffect(() => {
        fetchCategories()
    }, [])
 
    useEffect(() => {
        fetchMarkets()
    },[category])

    return (
        <View style={{flex: 1, backgroundColor:"#CECECE"}}>
            <Categorias data={categories} onSelect={setCategory} selected={category}></Categorias>
            <Places data={markets}></Places>
        </View>
    )

    
}