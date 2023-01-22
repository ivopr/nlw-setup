import { useFocusEffect, useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";

interface Params {
	date: string;
}


interface HabitsList {
	possibleHabits: Habit[],
	completedHabits: string[]
}

interface Habit {
	id: string;
	title: string;
	created_at: string;
}

export function Habit() {
	const [habitsList, setHabitsList] = useState<HabitsList>({
		completedHabits: [],
		possibleHabits: []
	});
	const [isFetching, setIsFetching] = useState(true);

	const route = useRoute();
	const { date } = route.params as Params;

	const parsedDate = dayjs(date, { utc: true });
	const isDateInPast = parsedDate.isBefore(dayjs(new Date, { utc: true }), 'day');
	const dayOfWeek = parsedDate.format('dddd');
	const dayAndMonth = parsedDate.format('DD/MM');

	const fetchHabits = useMemo(() => {
		setIsFetching(true);
		api
			.get("/day", {
				params: {
					date: parsedDate,
				}
			})
			.then((response) => setHabitsList(response.data))
			.finally(() => setIsFetching(false));

		return () => { }
	}, [date]);

	useFocusEffect(fetchHabits);

	const handleToggleHabit = (habitId: string) => {
		api.patch(`/habits/${habitId}/toggle`).catch(() => Alert.alert("Ops", "Não foi possível alterar o estado do hábito no servidor."));
		if (habitsList.completedHabits.includes(habitId)) {
			setHabitsList(prevState => ({
				possibleHabits: prevState.possibleHabits,
				completedHabits: prevState.completedHabits.filter(id => habitId != id)
			}));
		} else {
			setHabitsList(prevState => ({
				possibleHabits: prevState.possibleHabits,
				completedHabits: [...prevState.completedHabits, habitId]
			}));
		}
	}

	const progress = habitsList.possibleHabits.length > 0 ? (habitsList.completedHabits.length / habitsList.possibleHabits.length) * 100 : 0;

	if (isFetching) {
		return <Loading />
	};

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<BackButton />
				<Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{dayOfWeek}</Text>
				<Text className="text-white font-extrabold text-3xl">{dayAndMonth}</Text>
				<ProgressBar progress={progress} />

				<View className="mt-6">
					{isDateInPast ? (
						<Text className="text-white text-center mb-2">
							Você não pode alterar o estado de um dia que já passou.
						</Text>
					) : null}
					{habitsList.possibleHabits.length ? habitsList.possibleHabits.map(habit => (
						<Checkbox
							key={habit.id}
							checked={habitsList.completedHabits.includes(habit.id)}
							disabled={isDateInPast}
							className={clsx({
								'opacity-50': isDateInPast
							})}
							title={habit.title}
							onPress={() => handleToggleHabit(habit.id)}
						/>
					)) : (
						<Text className="text-zinc-400 text-base text-center">
							Não há nenhum hábito programado para este dia.
						</Text>
					)}
				</View>
			</ScrollView>
		</View>
	)
}