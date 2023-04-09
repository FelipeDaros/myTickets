import {Box, Button, HStack, Text, VStack} from 'native-base';
import { CustomButton } from '../components/CustomButton';
import { CustomButtonFilters } from '../components/CustomButtonFilters';
import { TicketCards } from '../components/TicketCards';
import { Routes } from '../routes';

export function Home(){
  return(
    <VStack bg="muted.800" flex={1}>
      <Text alignSelf="center" mt="10" color="white" fontFamily="heading" fontSize="title">TICKETS</Text>
      <HStack justifyContent="space-between" mx="16" mt="6">
        <CustomButtonFilters 
          onChangeFilter={() => {}}
          title="Em aberto"
          backgroundColor="amber.400"
        />
        <CustomButtonFilters 
          onChangeFilter={() => {}}
          title="Finalizados"
          backgroundColor="success.600"
        />
      </HStack>
      <VStack alignItems="center" mt="10">
        <TicketCards />
        <TicketCards />
        <TicketCards />
        <TicketCards />
      </VStack>
      <Box alignItems="center" mt="8">
        <CustomButton 
          onChange={() => {}}
          title="Cadastrar"
          backgroundColor="success.600"
        />
      </Box>
    </VStack>
  )
}