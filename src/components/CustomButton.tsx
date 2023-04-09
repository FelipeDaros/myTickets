import { Button, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  onChange: () => void;
}

export function CustomButton({onChange, title, backgroundColor}: Props){
    return(
        <>
        <Button bg={backgroundColor} fontWeight="bold" onPress={onChange} w="32">
            <Text color="white" fontFamily="heading">
                {title}
            </Text>
        </Button>
        </>
    )
}