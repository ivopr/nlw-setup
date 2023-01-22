import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { DAY_SIZE, HabitDay } from "./HabitDay";
import { Loading } from "./Loading";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 13 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
	id: string;
	date: string;
	amount: number;
	completed: number;
}[];

export function SummaryTable() {
	const { navigate } = useNavigation();
	const [summary, setSummary] = useState<Summary>([]);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		setIsFetching(true);

		api
			.get("/summary")
			.then(response => setSummary(response.data))
			.catch(error => {
				console.error(error)
				Alert.alert("Ops.", "Não foi possível carregar o sumário de hábitos")
			})
			.finally(() => setIsFetching(false));
	}, []);

	if (isFetching) {
		return <Loading />;
	}

	return (
		<View className="flex-1">
			<View className="flex-row mt-6 mb-2 justify-evenly">
				{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((weekDay, i) => (
					<View
						key={`${weekDay}-${i}`}
						className="flex items-center justify-center mx-1"
						style={{
							height: DAY_SIZE,
							width: DAY_SIZE
						}}
					>
						<Text className="text-zinc-400 font-bold text-xl">{weekDay}</Text>
					</View>
				))}
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 32
				}}
			>
				<View className="flex-row flex-wrap justify-evenly items-center">
					{summaryDates.map(date => {
						const dayInSummary = summary.find(day => dayjs(date, { utc: true }).isSame(day.date, 'day'));

						return (
							<HabitDay
								amount={dayInSummary?.amount}
								completed={dayInSummary?.completed}
								date={date}
								key={date.toString()}
								onPress={() => navigate("habit", { date: dayjs(date, { utc: true }).startOf('day').toISOString() })}
							/>
						)
					})}
					{amountOfDaysToFill > 0 ? Array.from({ length: amountOfDaysToFill }).map((_, i) => (
						<View
							key={i}
							className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-60"
							style={{ width: DAY_SIZE, height: DAY_SIZE }}
						/>
					)) : null}
				</View>
			</ScrollView>
		</View>
	)
}