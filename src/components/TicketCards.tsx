import { Box, HStack, Text, VStack } from "native-base";



export function TicketCards(){
  return(
    <VStack bg="muted.700" w="64" h="16" rounded="sm" borderWidth="0.2" borderColor="muted.100" my="2">
      <HStack>
        <Box bg="amber.400" w="1" h="16" rounded="sm"/>
        <Box justifyContent="center" flex={1}>
          <Text fontWeight="light" fontFamily="heading" color="white" ml="2">TESTE</Text>
        </Box>
        <Text mr="2" color="white" fontWeight="light" fontFamily="body" fontSize={8}>12-04-2023</Text>
      </HStack>
    </VStack>
  )
}