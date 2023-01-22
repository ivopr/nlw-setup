import { FC } from "react"

interface ProgressBarProps {
	progress: number,
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
	return (
		<div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
			<div
				aria-label="Progresso de hábitos completados nesse dia"
				aria-valuenow={progress}
				className="h-3 rounded-xl bg-violet-600"
				role="progressbar"
				style={{
					width: `${progress}%`
				}}
			/>
		</div>
	)
}