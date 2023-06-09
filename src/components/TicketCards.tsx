import { Box, HStack, Pressable, Text, VStack } from 'native-base';
import moment from 'moment';

type Props = {
  item: {
    _id: string;
    createdAt: Date;
    description: string;
    status: string;
    title: string;
  }
  irPara: () => void;
}

export function TicketCards({item, irPara}: Props) {
  return (
    <Pressable
      onPress={irPara}
    >
      <VStack
        bg="muted.700"
        w="64"
        h="16"
        rounded="sm"
        borderWidth="0.2"
        borderColor="muted.100"
        my="2"
      >
        <HStack>
          <Box
            bg={item.status === 'closed' ? 'amber.400' : 'success.600'}
            w="1"
            h="16"
            rounded="sm"
          />
          <Box justifyContent="center" flex={1}>
            <Text fontWeight="light" fontFamily="heading" color="white" ml="2">
              {item.title}
            </Text>
          </Box>
          <Text
            mr="2"
            color="white"
            fontWeight="light"
            fontFamily="body"
            fontSize={8}
          >{moment(item.createdAt).format('lll')}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}
