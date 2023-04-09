import { Box, HStack, Text } from "native-base";


export function Comment(){
  return(
    <Box bg="muted.700" w="50%" rounded="sm">
      <HStack p="1" justifyContent="space-between" alignItems="center">
        <Text fontFamily="heading" color="white" fontWeight="bold" fontSize={12}>Usuário</Text>
        <Text fontFamily="body" color="white" fontSize={8}>12-10-2020</Text>
      </HStack>
      <Text fontFamily="body" color="white" fontSize={10} p="1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
    </Box>
  )
}