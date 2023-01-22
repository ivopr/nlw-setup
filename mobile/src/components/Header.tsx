import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { violet } from "tailwindcss/colors";

import LogoImage from "../assets/logo.svg";

export function Header() {
	const { navigate } = useNavigation();

	return (
		<View className="w-full flex-row items-center justify-between">
			<LogoImage />

			<TouchableOpacity
				activeOpacity={0.7}
				className="flex-row gap-x-3 justify-center items-center rounded-lg pl-1 pr-4 py-3 border border-violet-500"
				onPress={() => navigate("new-habit")}
			>
				<Feather color={violet[500]} name="plus" size={14} />
				<Text className="text-white font-semibold text-sm">Novo</Text>
			</TouchableOpacity>
		</View>
	)
}