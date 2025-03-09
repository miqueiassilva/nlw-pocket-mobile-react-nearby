import { FlatList, View } from "react-native";
import { Category } from "../category";
import { s } from "./style";

export type CategoriesProps = {
    id: string,
    name: string
}[]

type Props = {
    data : CategoriesProps
    selected : string
    onSelect: (id:string) => void
}

export function Categorias({data, selected, onSelect}: Props){
    return (
        <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={
                ({item}) => 
                    <Category 
                        name={item.name} 
                        iconId={item.id}
                        onPress={ () => onSelect(item.id)}
                        isSelected={item.id === selected}
                        ></Category>}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.content}
            style={s.container}
        ></FlatList>
    )
}