import { FC, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";

type Country = {
	translations: {
		[key: string]: string | undefined;
	};
	name: {
		common: string;
	};
};

export const CountrySelect: FC = () => {

	const [countryState, setCountryState] = useState({
		countries: [] as Country[],
		errorMessage: ""
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setCountryState({
					...countryState
				});

				const dataUrl = `https://restcountries.com/v3.1/all`;
				const response = await axios.get(dataUrl);

				const countriesWithTranslations = response.data.map((country: Country) => ({
					...country,
					translations: {
						ru: country.translations["ru"]
					}
				}));

				setCountryState({
					...countryState,
					countries: countriesWithTranslations
				});
			} catch (error) {
				setCountryState({
					...countryState,
					errorMessage: "Sorry Something went wrong"
				});
			}
		};

		fetchData();
	}, []);

	const { errorMessage, countries } = countryState;
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

	return (
		<>
			<select
				value={selectedCountry}
				onChange={(e) => setSelectedCountry(e.target.value)}
				className={styles.selectContainer}
			>
				<option>Выберите страну</option>
				{countries.map((item, index) => {
					return (
						<option key={index} value={item.name.common}>
							{item.name.common}
						</option>
					);
				})}
			</select>
		</>
	);
};
