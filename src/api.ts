const base = "https://www.carboninterface.com/api/v1/estimates";

const send = async (method: "GET" | "POST", data?: string) => {
    try {
        const request = await fetch(base, {
            body: data || undefined,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: method,
        });
        return await request.json();
    } catch (err) {
        alert(err);
    }
};

export const getStimates = async () => {
    return await send("GET");
};

export const addElectricityEstimate = async (
    country: string,
    electricityUnit: "mwh" | "kwh",
    value: number
) => {
    const data = JSON.stringify({
        type: "electricity",
        country: country,
        electricity_unit: electricityUnit,
        electricity_value: value,
    });
    return await send("POST", data);
};
