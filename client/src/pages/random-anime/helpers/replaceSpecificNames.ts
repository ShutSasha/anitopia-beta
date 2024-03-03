const specificNames = [
	{ "[ТВ]": "" },
	{ "[ТВ-1]": "" },
	{ "[ТВ-2]": " 2" },
	{ "[ТВ-3]": " 3" },
	{ "[ТВ-4]": " 4" },
	{ "[ТВ, часть 1]": "сезон 1, часть 1" },
	{ "[ТВ-1, часть 1]": "сезон 1, часть 1" },
	{ "[ТВ-1, часть 2]": "сезон 1, часть 2" },
	{ "[ТВ-2, часть 1]": "сезон 2, часть 1" },
	{ "[ТВ-2, часть 2]": "сезон 2, часть 2" },
	{ "[ТВ-3, часть 1]": "сезон 3, часть 1" },
	{ "[ТВ-3, часть 2]": "сезон 3, часть 2" },
	{ "[ТВ-3, часть 3]": "сезон 3, часть 3" },
];

export const replaceSpecificNames = (nameAnime: string) => {
	const replacedName = nameAnime
		.split(" ")
		.map((item) => {
			const foundSpecificName = specificNames.find(
				(specificName) => Object.keys(specificName)[0] === item
			);
			return foundSpecificName ? Object.values(foundSpecificName)[0] : item;
		})
		.join(" ");

	return replacedName !== nameAnime ? replacedName : nameAnime;
};
