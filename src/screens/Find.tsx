import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../Components/Header";

import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useState } from "react";

import {api} from '../services/api'; 
import { useNavigation } from "@react-navigation/core";


export function Find() {
  const [isLoading, setIsLoading] = useState(false); 
  const [code, setCode] = useState('');

  const toast = useToast(); 
  const {navigate} = useNavigation(); 

    async function handleJoinPool(){
      try {
        setIsLoading(true);

        if(!code.trim()){
          return toast.show({
            title:'Informe o código',
            placement: 'top',
            bgColor:'red.500'
          });
        }

        await api.post('/pools/join', { code}); 
        navigate('pools'); 
        return toast.show({
          title:'Voce entrou no baloa com sucesso',
          placement: 'top',
          bgColor:'green.500'
        });


      } catch (error) {
        console.log(error);
        setIsLoading(false);

        if(error.response?.data?.message === 'Pool not found.'){
          return toast.show({
            title:'Bolao nao encontrado!',
            placement: 'top',
            bgColor:'red.500'
          });
        }

        if(error.response?.data?.message === 'You already joined this pool..'){
          return toast.show({
            title:'Voce ja está nesse bolao!',
            placement: 'top',
            bgColor:'red.500'
          });
        }

        toast.show({
          title:'Nao foi possivle encontrar o bolao',
          placement: 'top',
          bgColor:'red.500'
        });
      }
    }

    return(
        <VStack flex={1} bgColor='gray.900'>
          <Header title="Buscar por código"  showBackButton />

          <VStack mt={8} mx={5} alignItems="center">
        
            <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
            Encontre um bolão através de {'\n'}seu código único
            </Heading>

            <Input 
            mb={2}
            placeholder="Qual o código do bolão?"
            autoCapitalize="characters"
            onChangeText={setCode}
            />

            <Button
            title="BUSCAR BOLÃO"
            isLoading={isLoading}
            onPress={handleJoinPool}
            />

  
            

          </VStack>

        </VStack>
    );
}