export type EnergyUnit = "mwh" | "kwh";

export type RequestedData = {
    data: {
        attributes: {
            carbon_mt: number;
            country: string;
            estimated_at: string;
        };
    };
};

export type DataChart = {
    name: string;
    carbon_mt: number;
};

export type CountryCodes = {
    name: string;
    code: string;
};
