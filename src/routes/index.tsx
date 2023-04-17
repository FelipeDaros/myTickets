import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { NavigationContainer} from '@react-navigation/native';
import { Box } from 'native-base';
import { TicketSelecionado } from '../screens/TicketSelecionado';
import { CriarTicket } from '../screens/CriarTicket';

const {Navigator,  Screen} = createNativeStackNavigator();

export function Routes() {
  return (
    <Box flex={1} bg="muted.800">
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="Home" component={Home} />
          <Screen name="TicketSelecionado" component={TicketSelecionado} />
          <Screen name="CriarTicket" component={CriarTicket} />
        </Navigator>
      </NavigationContainer>
    </Box>
  );
}