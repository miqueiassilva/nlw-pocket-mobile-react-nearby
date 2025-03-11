import { Button } from "@/components/buton";
import { s } from "@/components/buton/styles";
import { Loagind } from "@/components/loading";
import { Coupon } from "@/components/market/coupom";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { api } from "@/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";


type DataProps = PropsDetails & {
    cover: string
}

export default function Market(){
    const [data, setData]  = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [coupon, setCoupon] = useState<string | null>()
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
    const [couponIsFetching, setCouponIsfetchig] = useState(false)

    const [_,requestPermission] = useCameraPermissions()
    const params = useLocalSearchParams<{id: string}>()
    
    const qrLock = useRef(false)
    console.log(params.id)

    async function featchMarket(){
        try{
            const { data } = await api.get(`/markets/${params.id}`)
            setData(data)
            setIsLoading(false)
        } catch (error){
            console.log(error)
            Alert.alert("Error","Não foi possivel carregar os dados", [
                {text: "OK", onPress: ()=> router.back()}
            ])
        }
    }
     
    async function handleOpenCamera(){
        try{
            const {granted} = await requestPermission()

            if(!granted){
                return Alert.alert("Camera", "Voce precisa habilitar o uso da camera")
            }
            
            qrLock.current = false
            setIsVisibleCameraModal(true)
        }catch(error){
            console.log(error)
            Alert.alert("Camera", "Não foi possivel utilizar a camera")
        }
    }

    async function getCoupon(id: string){
        try{
            setCouponIsfetchig(true)
            
            const {data} = await api.patch(`/coupons/${id}`)
            
            Alert.alert("Coupom", data.coupon)
            setCoupon(data.coupon)
        }catch(error){
            console.log(error)
            Alert.alert("Error", "Não foi possivel utilizar o cupom")
        } finally {
            setCouponIsfetchig(false)
        }
    }


    function handleUseCoupon(id: string){
        setIsVisibleCameraModal(false)

        Alert.alert(
            "Cupom",
            "Não é possivel reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
            [
                {style:"cancel", text: "Não"},
                {text:"Sim", onPress: ()=> getCoupon(id)}

            ]

        )
    }

    useEffect(()=>{
        featchMarket()
    },[params.id, coupon])

    if(isLoading){
        return <Loagind></Loagind>
    }

    if(!data){
        return <Redirect href="/home"></Redirect>
    }


    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal}></StatusBar>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover}></Cover>
                <Details data={data}></Details>
                {coupon && <Coupon code={coupon}></Coupon>}
            </ScrollView>

            <View style={{padding: 32}}>
                <Button onPress={()=>handleOpenCamera()}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex:1}} visible={isVisibleCameraModal}>
                <CameraView 
                    style={{flex:1}}
                    facing="back"
                    onBarcodeScanned={({data})=> {
                        if(data && !qrLock.current){
                            qrLock.current = true
                            setTimeout(()=>handleUseCoupon(data),500)
                        }
                        }}></CameraView>
                
                <View style={{position: "absolute", bottom: 32, left: 32, right: 32}}>
                    <Button 
                        onPress={()=>setIsVisibleCameraModal(false)}
                        isLoading={couponIsFetching}
                    >
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}