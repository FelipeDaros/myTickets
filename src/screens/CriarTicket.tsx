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

export function CriarTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function teste() {
    setLoading(true);
    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('tickets', {
          _id: uuid.v4,
          title,
          description,
          status: 'open',
          createAt: Date.now(),
        });
      });
    } catch (error) {
      toast.show({
        render: (error: any) => {
          return (
            <Box bg="error.500" px="2" py="1" rounded="lg" mb={5}>
              <Text color="white" fontSize="md">
                {error}
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
        />
      </Box>
    </VStack>
  );
}
