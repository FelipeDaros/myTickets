import { Button, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  onChangeFilter: () => void;
}

export function CustomButtonFilters({onChangeFilter, title, backgroundColor}: Props){
    return(
        <>
        <Button bg={backgroundColor} fontWeight="bold" onPress={onChangeFilter} w="32">
            <Text color="white" fontFamily="heading">
                {title}
            </Text>
        </Button>
        </>
    )
}