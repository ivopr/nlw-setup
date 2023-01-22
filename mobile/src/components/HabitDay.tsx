import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps { }

export function HabitDay({ ...rest }: HabitDayProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1"
			style={{
				height: DAY_SIZE,
				width: DAY_SIZE
			}}
			{...rest}
		/>
	)
}