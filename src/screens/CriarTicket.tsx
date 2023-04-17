  import {
  Box,
  Center,
  Input,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { CustomButton } from '../components/CustomButton';
import { useState } from 'react';
import { getRealm } from '../database/realm';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CriarTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigation();

  async function teste() {
    setLoading(true);
    const realm = await getRealm();

    if(!title || !description){
      Alert.alert('Título ou a descrição está vazio.');
      return;
    }

    try {
      realm.write(() => {
        realm.create('Ticket', {
          _id: uuid.v4(),
          title,
          description,
          status: 'open',
          createdAt: new Date()
        });
      });
      toast.show({
        render: () => {
          return (
            <Box bg="success.600" px="2" py="1" rounded="sm" mb={5}>
              <Text color="white" fontSize="md">
                Ticket criado com sucesso!
              </Text>
            </Box>
          );
        },
      });
      navigate.goBack();
    } catch (error) {
      let err = error;
      toast.show({
        render: () => {
          return (
            <Box bg="error.500" px="2" py="1" rounded="lg" mb={5}>
              <Text color="white" fontSize="md">
                {err.message}
              </Text>
            </Box>
          );
        },
      });
    } finally {
      realm.close();
      setLoading(false);
    }
  }

  return (
    <VStack bg="muted.800" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack alignItems="center" mt="16">
          <Text
            fontFamily="heading"
            color="white"
            fontWeight="bold"
            fontSize="lg"
          >
            Criar Ticket
          </Text>
          <Box bg="success.600" h="2" w="50%" mt="2" rounded="sm"></Box>
        </VStack>
        <VStack alignItems="center" mt="16">
          <Text fontFamily="heading" color="white" fontSize="md">
            Descrição
          </Text>
          <Box bg="success.600" h="1" w="75%" mt="2" rounded="sm"></Box>
        </VStack>
        <VStack alignItems="center" mt="6">
          <Text
            fontFamily="body"
            color="white"
            fontSize="sm"
            textAlign="center"
          >
            Título
          </Text>
          <Input
            bg="muted.700"
            w="60%"
            alignSelf="center"
            mt="4"
            borderWidth="0"
            placeholder="Escreva o título"
            placeholderTextColor="white"
            color="white"
            mb="4"
            value={title}
            onChangeText={(t) => {
              setTitle(t);
            }}
          />
        </VStack>
        <VStack alignItems="center">
          <Text
            fontFamily="body"
            color="white"
            fontSize="sm"
            textAlign="center"
          >
            Descrição
          </Text>
          <Input
            bg="muted.700"
            w="60%"
            mt="4"
            borderWidth="0"
            placeholder="Escreva aa descrição"
            textAlign="left"
            placeholderTextColor="white"
            color="white"
            mb="4"
            value={description}
            onChangeText={(d) => {
              setDescription(d);
            }}
          />
        </VStack>
      </ScrollView>
      <Box alignItems="center" mb="4">
        <CustomButton
          onChange={() => {
            teste();
          }}
          title="Cadastrar"
          backgroundColor="success.600"
          desativado={!title || !description}
        />
      </Box>
    </VStack>
  );
}
