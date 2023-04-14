import {
  Box,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { Comment } from '../components/Comment';
import { CustomButton } from '../components/CustomButton';
import { getRealm } from '../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Loading from '../components/Loading';

type Ticket = {
  _id: string;
  description: string;
  title: string;
  status: string;
  createdAt: Date;
};

interface TicketObjetoRealm extends Realm.Object<Ticket>, Ticket {}

export function EmAberto(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<TicketObjetoRealm>();
  const navigation = useNavigation();

  async function buscarInfoTicket() {
    const realm = await getRealm();

    try {
      const ticket = realm
        .objects<TicketObjetoRealm[]>('Ticket')
        .filtered(`_id = '${props.route.params.ticketId}'`)
        .toJSON();

      setTicket(ticket[0]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function concluir() {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const myTicket = realm.objectForPrimaryKey<TicketObjetoRealm>(
          'Ticket',
          `${props.route.params.ticketId}`
        );
        myTicket.status = 'closed';
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      realm.close();
    }
  }

  useEffect(() => {
    buscarInfoTicket();
  }, []);

  return (
    <VStack bg="muted.800" flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack alignItems="center" mt="16">
            <Text
              fontFamily="heading"
              color="white"
              fontWeight="bold"
              fontSize="lg"
            >
              Em aberto
            </Text>
            <Box bg="amber.400" h="2" w="50%" mt="2" rounded="sm"></Box>
            <Text fontFamily="heading" color="white" fontSize="md" mt="4">
              {ticket.title}
            </Text>
          </VStack>
          <VStack alignItems="center" mt="16">
            <Text fontFamily="heading" color="white" fontSize="md">
              Descrição
            </Text>
            <Box bg="amber.400" h="1" w="75%" mt="2" rounded="sm"></Box>
          </VStack>
          <VStack alignItems="center" mt="6">
            <ScrollView
              w="60%"
              h="32"
              rounded="sm"
              showsVerticalScrollIndicator={false}
              pt="6"
              pb="6"
            >
              <Text
                fontFamily="body"
                color="white"
                fontSize="sm"
                textAlign="center"
              >
                {ticket.description}
              </Text>
            </ScrollView>
          </VStack>
          <VStack alignItems="center" mt="6">
            <Box bg="muted.700" h="1" w="75%" mt="2" rounded="sm"></Box>
            <Text
              fontFamily="heading"
              color="white"
              fontSize="md"
              mt="2"
              mb="2"
            >
              Comentários
            </Text>
            <Comment />
          </VStack>
          <VStack alignItems="center">
            <Input
              bg="muted.700"
              w="60%"
              alignSelf="center"
              mt="4"
              borderWidth="0"
              placeholder="Escreva o comentário"
              placeholderTextColor="white"
              color="white"
              mb="4"
            />
            <CustomButton
              onChange={() => {}}
              title="Comentar"
              backgroundColor="amber.400"
            />
          </VStack>
          <Box alignItems="center" mt="4" mb="4">
            <CustomButton
              onChange={() => {
                concluir();
              }}
              title="Concluir"
              backgroundColor="success.600"
            />
          </Box>
        </ScrollView>
      )}
    </VStack>
  );
}
