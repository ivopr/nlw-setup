import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { HabitDay } from "./HabitDay";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export const SummaryTable = () => {
	return (
		<div className="w-full flex">
			<div className="grid grid-rows-7 grid-flow-row gap-3">
				{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((weekDay, i) => (
					<div
						key={`${weekDay}-${i}`}
						className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
					>
						{weekDay}
					</div>
				))}
			</div>

			<div className="grid grid-flow-col grid-rows-7 gap-3">
				{summaryDates.map((date) => (
					<HabitDay
						amount={5}
						completed={Math.round(Math.random() * 5)}
						key={date.toString()}
					/>
				))}
				{amountOfDaysToFill > 0 ? Array.from({ length: amountOfDaysToFill }).map((_, i) => (
					<div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
				)) : null}
			</div>
		</div>
	)
}