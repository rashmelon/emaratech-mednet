import {useEffect, useState} from "react";
import supabaseConfig from "../../config/Supabase";
import SelectGroup from "../UI/SelectGroup";
import InputGroup from "../UI/InputGroup";

const supabase = supabaseConfig.supabase;

const prepareForSelect = (items, labelKey = null, valueKey = null) => {
    const returnItems = [];

    for (const key in items) {
        returnItems.push({
            value: items[key][valueKey],
            label: items[key][labelKey],
        });
    }

    return returnItems;
}

const Filters = (props) => {
    const [city, setCity] = useState(null);
    const [region, setRegion] = useState(null);
    const [providerType, setProviderType] = useState(null);
    const [speciality, setSpeciality] = useState(null);
    const [searchInput, setSearchInput] = useState("")

    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [providerTypes, setProviderTypes] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const fetchCities = async () => {
        const {data} = await supabase
            .from('city')
            .select()
        setCities(prepareForSelect(data, 'name', 'id'));
    }

    const fetchRegions = async (cityId) => {
        const {data} = await supabase
            .from('region')
            .select()
            .eq('city_id', cityId)
        setRegions(prepareForSelect(data, 'name', 'id'));
    }

    const fetchProviderTypes = async (cityId) => {
        const {data} = await supabase
            .from('provider_type')
            .select()
        setProviderTypes(prepareForSelect(data, 'name', 'id'));
    }

    const fetchSpecialities = async (cityId) => {
        const {data} = await supabase
            .from('speciality')
            .select()
        setSpecialities(prepareForSelect(data, 'name', 'id'));
    }

    useEffect(() => {
        fetchCities()
        fetchProviderTypes()
        fetchSpecialities()
    }, []);

    const cityChangeHandler = (selectedOption) => {
        setCity(selectedOption);
        setRegion(null);
        fetchRegions(selectedOption.value);
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
                    <SelectGroup
                        value={city}
                        changeHandler={cityChangeHandler}
                        items={cities}
                        label="City"
                        placeholder="select city..."
                    />
                    <SelectGroup
                        value={region}
                        changeHandler={regionChangeHandler}
                        items={regions}
                        label="Region"
                        placeholder="select region..."
                        disabled={regions.length === 0}
                    />
                    <SelectGroup
                        value={providerType}
                        changeHandler={providerTypeChangeHandler}
                        items={providerTypes}
                        label="Provider Type"
                        placeholder="select type..."
                    />
                    <SelectGroup
                        value={speciality}
                        changeHandler={specialityChangeHandler}
                        items={specialities}
                        label="Speciality"
                        placeholder="select speciality..."
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

export default Filters;
