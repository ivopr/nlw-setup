import { View } from "react-native";
import { Header } from "../components/Header";
import { SummaryTable } from "../components/SummaryTable";

export function Home() {
	return (
		<View className="bg-background flex-1 px-8 pt-16">
			<Header />
			<SummaryTable />
		</View>
	)
}