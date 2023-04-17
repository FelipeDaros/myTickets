import { Button, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  desativado?: any;
  tamanho?: string;
  tamanhoFonte?: string;
  loading?: boolean;
  onChange: () => void;
};

export function CustomButton({
  onChange,
  title,
  backgroundColor,
  desativado,
  tamanho,
  tamanhoFonte,
  loading
}: Props) {
  return (
    <>
      <Button
        bg={desativado ? 'muted.300' : backgroundColor}
        opacity={desativado ? 0.2 : 1}
        fontWeight="bold"
        onPress={onChange}
        w={tamanho}
        disabled={desativado}
        isLoading={loading}
      >
        <Text color="white" fontFamily="heading" fontSize={tamanhoFonte}>
          {title}
        </Text>
      </Button>
    </>
  );
}
