import { Steps } from "@/components/steps"
import { Welcome } from "@/components/welcome"
import { View} from "react-native"
import { router } from "expo-router"

import { Button } from "@/components/buton"

export default function Index(){
    return (
        <View style={{flex: 1, padding:40, gap: 40}}>
            <Welcome></Welcome>
            <Steps></Steps>
            <Button onPress={()=> router.navigate("/home")}>
                <Button.Title>Começar</Button.Title>       
            </Button>
        </View>
    )
}