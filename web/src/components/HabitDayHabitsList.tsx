import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { FC, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitDayHabitsListProps {
	date: string;
	onCompletedChanged: (completed: number) => void;
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


export const HabitDayHabitsList: FC<HabitDayHabitsListProps> = ({ date, onCompletedChanged }) => {
	const [habitsList, setHabitsList] = useState<HabitsList>();

	useEffect(() => {
		api
			.get<HabitsList>("/day", {
				params: {
					date
				}
			})
			.then(response => setHabitsList(response.data))
	}, []);

	useEffect(() => {
		if (habitsList) {
			onCompletedChanged(habitsList.completedHabits.length)
		}
	}, [habitsList]);

	const isDateInPast = dayjs(date, { utc: true }).isBefore(new Date(), 'day')

	async function handleToggleHabit(habitId: string) {
		api.patch(`/habits/${habitId}/toggle`)
		const isHabitAlreadyCompleted = habitsList?.completedHabits.includes(habitId);

		if (isHabitAlreadyCompleted) {
			setHabitsList(prevState => ({
				possibleHabits: prevState!.possibleHabits,
				completedHabits: prevState!.completedHabits.filter(id => id != habitId)
			}));
		} else {
			setHabitsList(prevState => ({
				possibleHabits: prevState!.possibleHabits,
				completedHabits: [...prevState!.completedHabits, habitId]
			}));
		}
	}

	return (
		<div className="mt-6 flex flex-col gap-3 h-[10rem] overflow-y-auto p-2 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">
			{(habitsList && habitsList.possibleHabits.length > 0) ? habitsList.possibleHabits.map(habit => (
				<Checkbox.Root
					checked={habitsList.completedHabits.includes(habit.id)}
					disabled={isDateInPast}
					key={habit.created_at}
					className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
					onCheckedChange={() => handleToggleHabit(habit.id)}
				>
					<div
						className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background"
					>
						<Checkbox.Indicator>
							<Check size={20} color="white" />
						</Checkbox.Indicator>
					</div>
					<span
						className="font-bold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
					>
						{habit.title}
					</span>
				</Checkbox.Root>
			)) : (
				<span
					className="text-xl text-bold text-center leading-tight text-white m-auto"
				>
					Não há hábitos programados para este dia.
				</span>
			)}
		</div>
	)
}