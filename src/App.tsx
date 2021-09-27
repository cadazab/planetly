import "./App.css";
import React from "react";
import { getStimates } from "./api";
import AddDataForm from "./components/AddDataForm";
import CarbonConsumptionChart from "./components/CarbonCunsumptionChart";
import { RequestedData } from "./types";

function App() {
    const [data, setData] = React.useState<RequestedData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const stimates = await getStimates();
        setData(stimates);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Your carbon usage</h1>
            <AddDataForm fetchData={fetchData} />
            <CarbonConsumptionChart data={data} loading={loading} />
        </div>
    );
}

export default App;
