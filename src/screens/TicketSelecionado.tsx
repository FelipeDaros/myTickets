import {
  Box,
  CheckIcon,
  FlatList,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
  WarningIcon,
} from 'native-base';
import { Comment } from '../components/Comment';
import { CustomButton } from '../components/CustomButton';
import { getRealm } from '../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Loading from '../components/Loading';
import uuid from 'react-native-uuid';

type Ticket = {
  _id: string;
  description: string;
  title: string;
  status: string;
  createdAt: Date;
};

interface TicketObjetoRealm extends Realm.Object<Ticket>, Ticket {}

type Comment = {
  _id: string;
  message: string;
  status: boolean;
  ticketId: string;
  createdAt: Date;
};

interface CommnetObjectoRealm extends Realm.Object<Comment>, Comment {}

export function TicketSelecionado(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<TicketObjetoRealm>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState('');
  const [submmitComment, setSubmmitComment] = useState(false);
  const navigation = useNavigation();

  async function buscarInfoTicket() {
    const realm = await getRealm();
    setIsLoading(true);
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
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function addComment() {
    const realm = await getRealm();
    setIsLoading(true);
    setSubmmitComment(true);
    try {
      realm.write(() => {
        realm.create('Comment', {
          _id: uuid.v4(),
          message,
          status: false,
          ticketId: String(props.route.params.ticketId),
          createdAt: new Date(),
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setMessage('');
      setIsLoading(false);
      setSubmmitComment(false);
    }
  }

  async function buscarComentarios() {
    const realm = await getRealm();
    setIsLoading(true);
    try {
      const comments = realm
        .objects<Comment[]>('Comment')
        .filtered(`ticketId = '${props.route.params.ticketId}'`)
        .toJSON();
      setComments(comments);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarComentarios();
    buscarInfoTicket();
  }, [submmitComment]);

  return (
    <VStack bg="muted.800" flex={1}>
      {isLoading && !ticket ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack alignItems="center" mt="16">
            {ticket?.status === 'open' ? (
              <WarningIcon size="8" mt="0.5" mb="2" color="white" />
            ) : (
              <CheckIcon size="8" mt="0.5" mb="2" color="amber.400" />
            )}
            <Text
              fontFamily="heading"
              color="white"
              fontWeight="bold"
              fontSize="lg"
            >
              {ticket?.status === 'open' ? 'Em aberto' : 'Fechado'}
            </Text>

            <Box
              bg={ticket?.status === 'open' ? 'success.600' : 'amber.400'}
              h="2"
              w="50%"
              mt="2"
              rounded="sm"
            ></Box>
            <Text fontFamily="heading" color="white" fontSize="md" mt="4">
              {ticket?.title}
            </Text>
          </VStack>
          <VStack alignItems="center" mt="16">
            <Text fontFamily="heading" color="white" fontSize="md">
              Descrição
            </Text>
            <Box
              bg={ticket?.status === 'open' ? 'success.600' : 'amber.400'}
              h="1"
              w="75%"
              mt="2"
              rounded="sm"
            ></Box>
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
                {ticket?.description}
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
            <VStack alignItems="center" w="100%">
              <FlatList
                nestedScrollEnabled
                maxH="40"
                data={comments}
                renderItem={({ item }) => submmitComment ? <Loading /> : <Comment data={item} />}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={() =>
                  !comments.length ? (
                    <Text fontFamily="heading" color="muted.600">
                      Não há tickets cadastrados
                    </Text>
                  ) : null
                }
              />
            </VStack>
          </VStack>
          {ticket?.status === 'open' ? (
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
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                }}
              />
              <CustomButton
                onChange={() => {
                  addComment();
                }}
                title="Comentar"
                backgroundColor="amber.400"
                tamanho="16"
                tamanhoFonte="8"
                loading={submmitComment}
                desativado={!message}
              />
            </VStack>
          ) : (
            <></>
          )}
          {ticket?.status === 'open' ? (
            <Box alignItems="center" mt="4" mb="4">
              <CustomButton
                onChange={() => {
                  concluir();
                }}
                tamanho="40"
                title="Concluir"
                backgroundColor="success.600"
              />
            </Box>
          ) : (
            <></>
          )}
        </ScrollView>
      )}
    </VStack>
  );
}
