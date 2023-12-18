import Header from "./components/UI/Header";
import Filters from "./components/Filter/Filters";
import ProvidersTable from "./components/Providers/ProvidersTable";
import {useEffect, useState} from "react";
import supabaseConfig from "./config/Supabase";

const supabase = supabaseConfig.supabase;
const PAGE_SIZE = 100;

export default function App() {
    const [providers, setProviders] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState({
        city: null,
        region: null,
        providerType: null,
        speciality: null,
        searchInput: null,
    })

    const fetchData = async (page = null) => {
        page = page?? currentPage
        const countBuilder = supabase
            .from('provider')
            .select('count');

        const builder = supabase
            .from('provider')
            .select().range((page - 1) * PAGE_SIZE, page * (PAGE_SIZE) - 1);

        if (searchData.city) {
            builder.eq('city_id', searchData.city)
            countBuilder.eq('city_id', searchData.city)
        }
        if (searchData.region) {
            builder.eq('region_id', searchData.region)
            countBuilder.eq('region_id', searchData.region)
        }
        if (searchData.providerType) {
            builder.eq('provider_type_id', searchData.providerType)
            countBuilder.eq('provider_type_id', searchData.providerType)
        }
        if (searchData.speciality) {
            builder.eq('speciality_id', searchData.speciality)
            countBuilder.eq('speciality_id', searchData.speciality)
        }
        if (searchData.searchInput) {
            builder.ilike('name', `%${searchData.searchInput}%`)
            countBuilder.ilike('name', `%${searchData.searchInput}%`)
        }

        const {data} = await countBuilder
        const count = data[0].count;

        setPagesCount(Math.ceil(count / PAGE_SIZE));
        const {data: providers} = await builder

        setProviders(providers)
    }

    useEffect(() => {
        fetchData();
    }, [searchData, currentPage]);

    const submitHandler = async (city, region, providerType, speciality, searchInput) => {
        setSearchData({
            city: city,
            region: region,
            providerType: providerType,
            speciality: speciality,
            searchInput: searchInput,
        })

        setCurrentPage(1);
    }

    const pageChangedHandler = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <Header/>
            <main className="mt-5 flex flex-col items-center gap-5">
                <div className="bg-white dark:bg-gray-700 dark:text-gray-400 w-3/4 p-5 rounded-md">
                    <Filters onSubmit={submitHandler}/>
                </div>
                <div className="w-3/4">
                    <ProvidersTable providers={providers} pagesCount={pagesCount} currentPage={currentPage} onPageChanged={pageChangedHandler} />
                </div>
            </main>
        </div>
    )
}