import { Box, Input, KeyboardAvoidingView, ScrollView, Text, VStack } from "native-base";
import { Comment } from "../components/Comment";
import { CustomButton } from "../components/CustomButton";


export function EmAberto(){
  return(
    <VStack bg="muted.800" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <VStack alignItems="center" mt="16">
        <Text fontFamily="heading" color="white" fontWeight="bold" fontSize="lg">Em aberto</Text>
        <Box bg="amber.400" h="2" w="50%" mt="2" rounded="sm"></Box>
      </VStack>
      <VStack alignItems="center" mt="16">
        <Text fontFamily="heading" color="white" fontSize="md">Descrição</Text>
        <Box bg="amber.400" h="1" w="75%" mt="2" rounded="sm"></Box>
      </VStack>
      <VStack alignItems="center" mt="6">
        <ScrollView w="60%" h="32" rounded="sm" showsVerticalScrollIndicator={false} pt="6" pb="6">
          <Text fontFamily="body" color="white" fontSize="sm" textAlign="center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        </ScrollView>
      </VStack>
      <VStack alignItems="center" mt="6">
        <Box bg="muted.700" h="1" w="75%" mt="2" rounded="sm"></Box>
        <Text fontFamily="heading" color="white" fontSize="md" mt="2" mb="2">Comentários</Text>
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
          onChange={() => {}}
          title="Concluir"
          backgroundColor="success.600"
        />
      </Box>
      </ScrollView>
      
    </VStack>
  )
}