import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { HabitDayHabitsList } from "./HabitDayHabitsList";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
	amount?: number;
	defaultCompleted?: number;
	date: Date;
}

export const HabitDay: FC<HabitDayProps> = ({ amount = 0, defaultCompleted = 0, date }) => {
	const [completed, setCompleted] = useState(defaultCompleted)

	const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayAndMonth = dayjs(date).format("DD/MM");
	const weekDay = dayjs(date).format("dddd");

	function handleCompletedChange(newCompleted: number) {
		setCompleted(newCompleted)
	}

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx("w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background", {
					'bg-zinc-900 border-zinc-800': progress === 0,
					'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
					'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
					'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
					'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
					'bg-violet-500 border-violet-400': progress >= 80,
				})}
			/>
			<Popover.Portal>
				<Popover.Content className="w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
					<span className="font-semibold text-zinc-400">{weekDay}</span>
					<span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

					<ProgressBar progress={progress} />

					<HabitDayHabitsList
						date={dayjs(date, { utc: true }).toString()}
						onCompletedChanged={handleCompletedChange}
					/>

					<Popover.Arrow className="fill-zinc-900" height={8} width={16} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	)
}