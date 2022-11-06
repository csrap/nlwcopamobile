import { Box, useToast} from 'native-base';
import { useState } from 'react';


interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true); 

  const toast = useToast(); 

  async function fetchGames(){
    try {
      
    } catch (error) {
      console.log(error);

      toast.show({
        title:'Nao foi possivel carregar os detalhes do bolao',
        placement: 'top',
        bgColor:'red.500'
      });
    }

  }

  return (
    <Box>

    </Box>
  );
}
function useToast() {
  throw new Error('Function not implemented.');
}

