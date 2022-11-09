import { useToast, FlatList} from 'native-base';
import { useState, useEffect } from 'react';

import { api} from '../services/api'; 

import {Game, GameProps} from '../Components/Game'
import { EmptyMyPoolList} from '../Components/EmptyMyPoolList'
import { Loading } from './Loading';
interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true); 
  const [games, setGames] = useState<GameProps[]>([]); 
  const [firtTeamPoints, setFirtTeamPoints] = useState(''); 
  const [secondTeamPoints, setSecondTeamPoints] = useState(''); 

  const toast = useToast(); 

  async function fetchGames(){
    try {
      setIsLoading(true); 

      const response = await api.get(`pools/${poolId}/games`); 
      setGames(response.data.games); 
      console.log(response.data)
      
    } catch (error) {
      console.log(error);

      toast.show({
        title:'Nao foi possivel carregar os detalhes do bolao',
        placement: 'top',
        bgColor:'red.500'
      });
      
    }finally {
      setIsLoading(false); 
    }
  }

  async function handleGuessConfirm(gameId: string){
    try {
      if(!firtTeamPoints.trim() || !secondTeamPoints.trim()){
        return toast.show({
          title:'Informe o placar do palpite',
          placement: 'top',
          bgColor:'red.500'
        });
      }

      await api.post(`pools${poolId}/games/${gameId}/guesses`, {
        firtTeamPoints: Number(firtTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      }); 

      toast.show({
        title:'Palpite realizado com sucesso',
        placement: 'top',
        bgColor:'green.500'
      });

      fetchGames(); 

      
      
    } catch (error) {
      toast.show({
        title:'Nao foi possivel enviar o palpite',
        placement: 'top',
        bgColor:'red.500'
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if(isLoading) {
    return <Loading/>
  }

  return (
    <FlatList
    data={games}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <Game
      data={item} 
      setFirstTeamPoints={setFirtTeamPoints}
      setSecondTeamPoints={setSecondTeamPoints}
      onGuessConfirm={() => handleGuessConfirm(item.id)}
      />
    )}
    _contentContainerStyle={{ pb: 10}}
    ListEmptyComponent={() => 
    <EmptyMyPoolList
          code={code}
    />}
    />
  );
}


