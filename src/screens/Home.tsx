import { Box, Button, HStack, Text, VStack } from 'native-base';
import { CustomButton } from '../components/CustomButton';
import { CustomButtonFilters } from '../components/CustomButtonFilters';
import { TicketCards } from '../components/TicketCards';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getRealm } from '../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Realm from 'realm';

type Ticket = {
  _id: string;
  createdAt: Date;
  description: string;
  status: string;
  title: string;
};

interface TicketObjetoRealm extends Realm.Object<Ticket>, Ticket {}

export function Home() {
  const [tickets, setTickets] = useState<TicketObjetoRealm[]>([]);
  const [filters, setFilters] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  async function listarTickets() {
    setLoading(true);
    const realm = await getRealm();

    try {
      const tickets: Array<TicketObjetoRealm> = realm
        .objects('Ticket')
        .toJSON();
      setTickets(tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      listarTickets();
    }, [])
  );

  function ticketSelected(ticketId: string) {
    navigation.navigate('EmAberto', { ticketId });
  }

  return (
    <VStack bg="muted.800" flex={1}>
      <Text
        alignSelf="center"
        mt="10"
        color="white"
        fontFamily="heading"
        fontSize="title"
      >
        TICKETS
      </Text>
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
        <FlatList<TicketObjetoRealm>
          data={tickets}
          renderItem={({ item }) => (
            <TicketCards item={item} irPara={() => {ticketSelected(item._id)}} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <Box alignItems="center" mt="8">
        <CustomButton
          onChange={() => {
            navigation.navigate('CriarTicket');
          }}
          title="Cadastrar"
          backgroundColor="success.600"
        />
      </Box>
    </VStack>
  );
}
