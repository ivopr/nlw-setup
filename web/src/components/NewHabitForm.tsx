import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export const NewHabitForm = () => {
	const [title, setTitle] = useState("");
	const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

	function createNewHabit(event: FormEvent) {
		event.preventDefault();

		if (!title || selectedWeekDays.length === 0) {
			return;
		}

		api.post("/habits", {
			title,
			weekDays: selectedWeekDays
		}).then(() => {
			setTitle("");
			setSelectedWeekDays([]);
		});
	}

	function onToggleWeekDay(i: number) {
		if (selectedWeekDays.includes(i)) {
			setSelectedWeekDays(prevState => prevState.filter(weekDay => weekDay != i));
		} else {
			setSelectedWeekDays(prevState => [...prevState, i]);
		}
	}

	return (
		<form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
			<label className="font-semibold leading-tight" htmlFor="title">Qual seu comprometimento?</label>
			<input
				autoFocus
				className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
				id="title"
				onChange={event => setTitle(event.target.value)}
				placeholder="ex.: Exercicíos, dormir bem, etc..."
				type="text"
				value={title}
			/>

			<label className="font-semibold leading-tight mt-4" htmlFor="">Qual a recorrência?</label>
			<div className="flex flex-col gap-2 mt-3">
				{weekDays.map((weekDay, i) => (
					<Checkbox.Root
						className="flex items-center gap-3 group focus:outline-none"
						key={weekDay}
						checked={selectedWeekDays.includes(i)}
						onCheckedChange={() => onToggleWeekDay(i)}
					>
						<div
							className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
						>
							<Checkbox.Indicator>
								<Check size={20} color="white" />
							</Checkbox.Indicator>
						</div>
						<span
							className="text-white leading-tight"
						>
							{weekDay}
						</span>
					</Checkbox.Root>
				))}
			</div>
			<button
				className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
				type="submit"
			>
				<Check size={20} weight="bold" /> Confirmar
			</button>
		</form>
	)
}