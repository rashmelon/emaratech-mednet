import Header from "./components/Partials/Header";
import {useState} from "react";
import FiltersForm from "./components/Filter/FiltersForm";
import Providers from "./components/Providers/Providers";
import Footer from "./components/Partials/Footer";

export default function App() {
    const [searchData, setSearchData] = useState({
        city: null,
        region: null,
        providerType: null,
        speciality: null,
        searchInput: null,
    })

    const submitHandler = async (city, region, providerType, speciality, searchInput) => {
        setSearchData({
            city: city,
            region: region,
            providerType: providerType,
            speciality: speciality,
            searchInput: searchInput,
        })
    }

    return (<div className="bg-gray-300 min-h-screen -mb-25 flex flex-col">
        <div className="flex-1">
            <Header/>
            <main className="mt-5 flex flex-col items-center gap-5">
                <div className="bg-white dark:bg-gray-700 dark:text-gray-400 md:w-3/4 w-11/12 p-5 rounded-md">
                    <FiltersForm onSubmit={submitHandler}/>
                </div>
                <div className=" md:w-3/4 w-11/12">
                    <Providers searchData={searchData}/>
                </div>
            </main>
        </div>
        <Footer className="mb-25 shrink-0"/>
    </div>)
}