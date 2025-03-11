import { ImageBackground, View } from "react-native"
import { s } from "./styles"
import { router } from "expo-router"
import { Button } from "@/components/buton"
import { IconArrowLeft } from "@tabler/icons-react-native"

type Props = {
    uri: string
}

export function Cover({uri}: Props){
    return (
        <ImageBackground source={{uri}} style={s.container}>
            <View style={s.header}>
                <Button style={{width:40, height:40}} onPress={()=>router.back()}>
                    <Button.Icon icon={IconArrowLeft}></Button.Icon>
                </Button>
            </View>
        </ImageBackground>
    )
}