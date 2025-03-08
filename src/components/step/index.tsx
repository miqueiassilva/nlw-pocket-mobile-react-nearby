import { Text, View } from "react-native";
import { IconProps } from "@tabler/icons-react-native";

import { colors } from "@/styles/theme";
import { s } from "./style";

type Prop = {
    title: string,
    description: string,
    icon: React.ComponentType<IconProps>
}

export function Step(prop:Prop){
    const Icon = prop.icon;

    return (
        <View style={s.container}>
            {Icon && <Icon size={32} color={colors.red.base}></Icon>}
            <View style={s.details}>
                <Text style={s.title}>{prop.title}</Text>
                <Text style={s.description}>{prop.description}</Text>
            </View>
        </View>
    )
}
