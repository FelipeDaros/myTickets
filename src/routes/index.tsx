import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { NavigationContainer} from '@react-navigation/native';
import { Box } from 'native-base';
import { EmAberto } from '../screens/EmAberto';
import { CriarTicket } from '../screens/CriarTicket';

const {Navigator,  Screen} = createNativeStackNavigator();

export function Routes() {
  return (
    <Box flex={1} bg="muted.800">
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="CriarTicket" component={CriarTicket} />
          <Screen name="EmAberto" component={EmAberto} />
          <Screen name="Home" component={Home} />
        </Navigator>
      </NavigationContainer>
    </Box>
  );
}