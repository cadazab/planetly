import { CountryCodes, RequestedData } from "../../types";
import Countries from "../../data/countries";

export const getChartData = (stimates: RequestedData[], country?: string) => {
    const { DateTime } = require("luxon");
    const filteredStimates =
        country && country !== "ALL"
            ? stimates.filter(
                  (item) =>
                      item.data.attributes.country.toUpperCase() === country
              )
            : stimates;
    const data = filteredStimates.map((item) => {
        const attributes = item.data.attributes;
        const parseDate = DateTime.fromISO(attributes.estimated_at);
        return {
            name: parseDate.toLocaleString(DateTime.DATETIME_MED),
            carbon_mt: attributes.carbon_mt,
        };
    });
    console.log(data);
    return data;
};

export const getFilterCountries = (stimates: RequestedData[]) => {
    const filterCountries: CountryCodes[] = [
        {
            name: "All",
            code: "ALL",
        },
    ];
    stimates.forEach((item) => {
        const countryKey = item.data.attributes.country.toUpperCase();
        const matchElement = Countries.find(
            (element) => element.code === countryKey
        );
        if (matchElement && !filterCountries.includes(matchElement)) {
            filterCountries.push(matchElement);
        }
    });
    return filterCountries;
};
