import { ActivityIndicator} from "react-native"

import {s} from "./styles"
import { colors } from "@/styles/colors"

export function Loagind(){
    return <ActivityIndicator color={colors.green.base} style={s.container}></ActivityIndicator>
}