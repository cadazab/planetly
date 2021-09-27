import { Box } from "@mui/system";
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import React from "react";
import { RequestedData } from "../../types";
import { getChartData, getFilterCountries } from "./actions";

const CarbonConsumptionChart = (props: {
    data: RequestedData[];
    loading: boolean;
}) => {
    const [filterCountry, setFilterCountry] = React.useState<
        string | undefined
    >(undefined);
    const chartData = getChartData(props.data, filterCountry);
    const filterCountries = getFilterCountries(props.data);
    return props.loading ? (
        <CircularProgress className="loading" color="inherit" />
    ) : (
        <div className="container">
            <h2>Your entries</h2>
            <Box
                sx={{
                    "& > :not(style)": {
                        m: 1,
                        width: "250px",
                        marginBottom: "32px",
                    },
                }}
            >
                <FormControl>
                    <InputLabel>Filter by country</InputLabel>
                    <Select
                        value={filterCountry}
                        label="filter by country"
                        onChange={(country) =>
                            setFilterCountry(country.target.value)
                        }
                    >
                        {filterCountries.map((country) => (
                            <MenuItem id="country.code" value={country.code}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <ResponsiveContainer width="100%" minHeight="300px">
                <LineChart
                    width={300}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="carbon_mt"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CarbonConsumptionChart;
