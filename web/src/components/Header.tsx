import { Plus } from "phosphor-react";
import logoImage from "../assets/logo.svg";

export const Header = () => {
	return (
		<div className="w-full max-w-3xl mx-auto flex items-center justify-between">
			<img src={logoImage} alt="Habits" />
			<button className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300" type="button">
				<Plus className="text-violet-500" size={20} /> Novo Hábito
			</button>
		</div>
	)
}