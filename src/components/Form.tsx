import axios from "axios";
import { useState } from "react";
import Error from "./error";
import Response from "./Response";
import { TailSpin } from 'react-loader-spinner';

const apiUrl = "http://localhost:8000"

const Form = () => {

    const [error, setError] = useState<string | undefined>()
    const [cities, setCities] = useState<string>("")
    const [unit, setUnit] = useState<string>("standard")
    const [isLoading, setIsLoading] = useState(false)

    const [weather, setWeather] = useState()


    const handelSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const cities_array = cities.split(',').map(item => item.trim())
            const res = await axios.post(apiUrl + "/getWeather", { cities: cities_array, unit })
            setIsLoading(false)

            if (res.status === 200) {
                setWeather(res.data.weather);
                setError(undefined)
            }
            else {
                setError(res.data.error)
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError("Some Error Occured")
        }
    }
    return (
        <div className="form">
            <h1>Get Weather data!</h1>
            <form onSubmit={(e) => handelSubmit(e)} style={{ paddingBottom: "1rem" }}>
                <input placeholder="Cities (comma seperated)" required value={cities} onChange={(e) => setCities(e.target.value)} />
                <label htmlFor="unitDropdown">Select a unit:</label>
                <select id="unitDropdown" value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="standard">K</option>
                    <option value="metric">{"\u00B0C"}</option>
                    <option value="imperial">{"\u00B0F"}</option>
                </select>
                <button type="submit">get data</button>
                {isLoading && <TailSpin color="blue" height={50} width={50} />}
            </form>
            {error && <Error message={error!} />}
            {weather && <Response data={weather} />}
        </div >
    )
}

export default Form
