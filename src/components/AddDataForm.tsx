import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Box,
    Stack,
} from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import { addElectricityEstimate } from "../api";
import Countries from "../data/countries";
import { EnergyUnit } from "../types";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat, CustomProps>(
    function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                allowLeadingZeros={false}
            />
        );
    }
);

const AddDataForm = (props: { fetchData: () => Promise<void> }) => {
    const [unit, setUnit] = React.useState<EnergyUnit>("mwh");
    const [country, setCountry] = React.useState<string>("");
    const [consume, setConsume] = React.useState<number>(0);

    return (
        <div className="container">
            <h2>Save a new entry</h2>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "250px" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    await addElectricityEstimate(country, unit, consume);
                    props.fetchData();
                }}
            >
                <TextField
                    label="electricity consum value"
                    name="numberformat"
                    id="formatted-numberformat-input"
                    variant="filled"
                    InputProps={{
                        inputComponent: NumberFormatCustom as any,
                    }}
                    value={consume}
                    onChange={(consum) =>
                        setConsume(consum.target.value as unknown as number)
                    }
                />
                <FormControl>
                    <InputLabel>Energy Unit</InputLabel>
                    <Select
                        value={unit}
                        label="Energy Unit"
                        onChange={(unit) =>
                            setUnit(unit.target.value as EnergyUnit)
                        }
                    >
                        <MenuItem id="mwh" value={"mwh"}>
                            mwh
                        </MenuItem>
                        <MenuItem id="kwh" value={"kwh"}>
                            kwh
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={country}
                        label="Country"
                        onChange={(country) => setCountry(country.target.value)}
                    >
                        {Countries.map((country) => (
                            <MenuItem id="country.code" value={country.code}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Stack spacing={2}>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </Stack>
            </Box>
        </div>
    );
};

export default AddDataForm;
