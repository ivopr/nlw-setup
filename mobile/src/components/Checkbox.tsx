import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { white } from "tailwindcss/colors";


interface CheckboxProps extends TouchableOpacityProps {
	checked?: boolean;
	title: string;
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="flex-row mb-2 items-center"
			{...rest}
		>
			{checked ? (
				<Animated.View
					className="h-8 w-8 bg-green-600 rounded-lg items-center justify-center"
					entering={ZoomIn}
					exiting={ZoomOut}
				>
					<Feather color={white} name="check" size={20} />
				</Animated.View>
			) : (
				<View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center" />
			)}
			<Text className="text-white ml-3">{title}</Text>
		</TouchableOpacity>
	)
}