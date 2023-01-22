import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Habit } from "../screens/Habit";
import { Home } from "../screens/Home";
import { NewHabit } from "../screens/NewHabit";

export function AppRoutes() {
	return (
		<Navigator
			initialRouteName="home"
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="habit" component={Habit} />
			<Screen name="home" component={Home} />
			<Screen name="new-habit" component={NewHabit} />
		</Navigator>
	)
}