import {useState} from "react";
import SupaBaseFilter from "./SupaBaseFilter";
import InputGroup from "../UI/InputGroup";

const FiltersForm = (props) => {
    const [city, setCity] = useState(null);
    const [region, setRegion] = useState(null);
    const [providerType, setProviderType] = useState(null);
    const [speciality, setSpeciality] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const cityChangeHandler = (selectedOption) => {
        setCity(selectedOption);
    }

    const regionChangeHandler = (selectedOption) => {
        setRegion(selectedOption);
    }

    const providerTypeChangeHandler = (selectedOption) => {
        setProviderType(selectedOption);
    }

    const specialityChangeHandler = (selectedOption) => {
        setSpeciality(selectedOption);
    }

    const searchInputHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const searchHandler = (event) => {
        event.preventDefault();
        props.onSubmit(
            city ? city.value : null,
            region ? region.value : null,
            providerType ? providerType.value : null,
            speciality ? speciality.value : null,
            searchInput
        );
    }

    const resetHandler = (event) => {
        event.preventDefault();
        setCity(null);
        setRegion(null);
        setProviderType(null);
        setSpeciality(null);
        setSearchInput("");
    }

    return (
        <div>
            <form onSubmit={searchHandler} onReset={resetHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                    <SupaBaseFilter
                        value={city}
                        label="City"
                        placeholder="select city..."
                        onItemSelected={cityChangeHandler}
                        databaseModel="city"
                    />
                    <SupaBaseFilter
                        value={region}
                        label="Region"
                        placeholder="select region..."
                        onItemSelected={regionChangeHandler}
                        filters={city ? [{
                            key: "city_id",
                            value: city.value
                        }] : null}
                        databaseModel="region"
                        disabled={city === null}
                    />
                    <SupaBaseFilter
                        value={providerType}
                        label="Provider Type"
                        placeholder="select type..."
                        onItemSelected={providerTypeChangeHandler}
                        databaseModel="provider_type"
                    />
                    <SupaBaseFilter
                        value={speciality}
                        label="Speciality"
                        placeholder="select speciality..."
                        onItemSelected={specialityChangeHandler}
                        databaseModel="speciality"
                    />

                    <InputGroup label="Search" className="md:col-span-2 xl:col-span-4">
                        <input
                            className="border-gray-300 border rounded-md py-1.5 px-2 font-normal text-gray-500 text-sm"
                            value={searchInput}
                            onChange={searchInputHandler}
                            placeholder="enter provider's name..."
                        />
                    </InputGroup>

                    <div className="md:col-span-2 xl:col-span-4 flex justify-center gap-2">
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Search
                        </button>
                        <button type="reset"
                                className="border border-red-500 text-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FiltersForm;
