import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { white, zinc } from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function NewHabit() {
	const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

	function handleToggleWeekDay(weekDayIndex: number) {
		if (selectedWeekDays.includes(weekDayIndex)) {
			setSelectedWeekDays(prevState => prevState.filter(weekDay => weekDay != weekDayIndex));
		} else {
			setSelectedWeekDays(prevState => [...prevState, weekDayIndex]);
		}
	}

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 32
				}}
			>
				<BackButton />

				<Text className="mt-6 text-white font-extrabold text-3xl">Criar Hábito</Text>

				<Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>
				<TextInput
					className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-300"
					placeholder="ex.: Exercicíos, dormir bem, etc..."
					placeholderTextColor={zinc[400]}
				/>

				<Text className="mt-4 mb-3 text-white font-semibold text-base">Qual a recorrência?</Text>
				{weekDays.map((weekDay, i) => (
					<Checkbox
						checked={selectedWeekDays.includes(i)}
						key={weekDay}
						onPress={() => handleToggleWeekDay(i)}
						title={weekDay}
					/>
				))}

				<TouchableOpacity
					activeOpacity={0.7}
					className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
				>
					<Feather color={white} name="check" size={20} />
					<Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}