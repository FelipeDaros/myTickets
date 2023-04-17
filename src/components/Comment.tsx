import { Box, HStack, Text } from 'native-base';
import moment from 'moment';

type Comment = {
  data: {
    _id: string;
    message: string;
    status: boolean;
    ticketId: string;
    createdAt: Date;
  };
};

export function Comment({ data }: Comment) {
  return (
    <Box bg="muted.700" w="40" mt="2" rounded="sm">
      <HStack p="1" justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="heading"
          color="white"
          fontWeight="bold"
          fontSize={12}
        >
          Usuário
        </Text>
        <Text fontFamily="body" color="white" fontSize={8}>
          {moment(data?.createdAt).format('lll')}
        </Text>
      </HStack>
      <Text fontFamily="body" color="white" fontSize={10} p="1">
        {data?.message}
      </Text>
    </Box>
  );
}
