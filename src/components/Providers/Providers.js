import {useCallback, useEffect, useState} from "react";
import ProvidersTable from "./ProvidersTable";
import supabaseConfig from "../../config/Supabase";
import usePrevious from "../../hooks/previous";

const supabase = supabaseConfig.supabase;
const Providers = (props) => {
    const [providers, setProviders] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const previousCurrentPage = usePrevious(currentPage);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const countBuilder = supabase
            .from('provider')
            .select('count');

        const builder = supabase
            .from('provider')
            .select().range((currentPage - 1) * pageSize, currentPage * (pageSize) - 1)
            .order('name', { ascending: true });

        if (props.searchData.city) {
            builder.eq('city_id', props.searchData.city);
            countBuilder.eq('city_id', props.searchData.city);
        }
        if (props.searchData.region) {
            builder.eq('region_id', props.searchData.region);
            countBuilder.eq('region_id', props.searchData.region);
        }
        if (props.searchData.providerType) {
            builder.eq('provider_type_id', props.searchData.providerType);
            countBuilder.eq('provider_type_id', props.searchData.providerType);
        }
        if (props.searchData.speciality) {
            builder.eq('speciality_id', props.searchData.speciality);
            countBuilder.eq('speciality_id', props.searchData.speciality);
        }
        if (props.searchData.searchInput) {
            builder.ilike('name', `%${props.searchData.searchInput}%`);
            countBuilder.ilike('name', `%${props.searchData.searchInput}%`);
        }

        const {data} = await countBuilder;
        const count = data[0].count;
        setTotalCount(count)

        setPagesCount(Math.ceil(count / pageSize));
        const {data: providers} = await builder;

        setProviders(providers);
        setIsLoading(false);
    }, [currentPage, props.searchData, pageSize]);

    useEffect(() => {
        if (previousCurrentPage === currentPage) {
            setCurrentPage(1);
        }
        fetchData();
    }, [props.searchData, currentPage, fetchData, pageSize]);

    const pageChangedHandler = (page) => {
        setCurrentPage(page);
    }

    const onPageSizeChange = (value) => {
        setCurrentPage(1);
        setPageSize(value);
    }

    return (<ProvidersTable
            providers={providers}
            pagesCount={pagesCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChanged={pageChangedHandler}
            onPageSizeChange={onPageSizeChange}
            isLoading={isLoading}
            totalCount={totalCount}
        />);
}

export default Providers;
