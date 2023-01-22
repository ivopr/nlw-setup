import clsx from "clsx";
import dayjs from "dayjs";
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
	amount?: number;
	completed?: number;
	date: Date
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) {
	const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;
	const isToday = dayjs(date).isSame(dayjs(new Date(), { utc: true }), 'day');

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className={clsx("rounded-lg border-2 m-1", {
				'bg-zinc-900 border-zinc-800': progress === 0,
				'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
				'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
				'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
				'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
				'bg-violet-500 border-violet-400': progress >= 80,
				'border-white border-3': isToday,
			})}
			style={{
				height: DAY_SIZE,
				width: DAY_SIZE
			}}
			{...rest}
		/>
	)
}