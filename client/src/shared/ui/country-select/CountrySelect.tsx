import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";

type Country = {
	name: {
		common: string;
	};
	flags: {
		png: string;
	};
	idd: {
		root: string;
		suffixes: string[];
	};
};

export const CountrySelect: React.FC = () => {
	const [countryState, setCountryState] = useState({
		loading: false,
		countries: [] as Country[],
		errorMessage: ""
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setCountryState({
					...countryState,
					loading: true
				});

				const dataUrl = `https://restcountries.com/v3.1/all`;
				const response = await axios.get(dataUrl);
				setCountryState({
					...countryState,
					countries: response.data,
					loading: false
				});
			} catch (error) {
				setCountryState({
					...countryState,
					loading: false,
					errorMessage: "Sorry Something went wrong"
				});
			}
		};

		fetchData();
	}, []);

	const { loading, errorMessage, countries } = countryState;
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

	return (
		<>
			<div>
				{loading ?
					<div className={styles.loading}>
						<p className={styles.loadingText}>...loading</p>
					</div> :
					<div className={styles.gridContainer}>
						<div>
							<select
								value={selectedCountry}
								onChange={(e) => setSelectedCountry(e.target.value)}
								className={styles.selectContainer}
							>
								<option>--Select Country--</option>
								{countries.map((item, index) => {
									return (
										<option key={index} value={item.name.common}>
											{item.name.common}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				}
			</div>
		</>
	);
};
