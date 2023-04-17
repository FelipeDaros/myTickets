import { Box, Button, HStack, Text, VStack } from 'native-base';
import { CustomButton } from '../components/CustomButton';
import { CustomButtonFilters } from '../components/CustomButtonFilters';
import { TicketCards } from '../components/TicketCards';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getRealm } from '../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Realm from 'realm';
import Loading from '../components/Loading';

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
  const [filters, setFilters] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [selecionado, setSelecionado] = useState(false);
  const navigation = useNavigation();

  async function listarTickets(status?: string){
    setLoading(true);
    const realm = await getRealm();
    let tickets: TicketObjetoRealm[];
    try {
      tickets = realm
        .objects<TicketObjetoRealm[]>('Ticket')
        .toJSON();


      if(status){
        tickets = tickets.filter(ticket => ticket.status === status);
      }

      setTickets(tickets);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(filters){
      listarTickets(filters);
    }
  }, [filters])

  useFocusEffect(
    useCallback(() => {
      listarTickets();
    }, [])
  );

  function ticketSelected(ticketId: string) {
    navigation.navigate('TicketSelecionado', { ticketId });
  }

  return (
    <>{loading ? <Loading /> : <VStack bg="muted.800" flex={1}>
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
        onChangeFilter={() => {setFilters('open')}}
        title="Em aberto"
        backgroundColor="success.600"
      />
      <CustomButtonFilters
        onChangeFilter={() => {setFilters('closed')}}
        title="Finalizados"
        backgroundColor="amber.400"
      />
    </HStack>
    <VStack alignItems="center" mt="10">
      <FlatList<TicketObjetoRealm>
        data={tickets}
        renderItem={({ item }) => (
          <TicketCards
            item={item}
            irPara={() => {
              ticketSelected(item._id);
            }}
          />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          !tickets.length ? (
            <Text fontFamily="heading" color="muted.600">
              Não há tickets cadastrados
            </Text>
          ) : null
        }
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
  </VStack>}</>
  );
}
