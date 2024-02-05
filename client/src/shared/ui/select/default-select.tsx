import { FC, ChangeEvent, useState } from "react";
import styles from './styles.module.scss';
interface SelectProps {
	options: string[];
	onSelect: (selectedOption: string) => void;
}

export const Select: FC<SelectProps> = ({ options, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState<string>('Не указано');

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
		onSelect(event.target.value);
	};

	return (
		<select className={styles.select} value={selectedOption} onChange={handleChange}>
			<option value={'Не указано'}>Не указано</option>
			{options.map((option, index) => (
				<option key={index} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default Select;
