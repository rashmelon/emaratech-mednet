import Pagination from "../UI/Pagination";
import TableRowsCount from "../UI/TableRowsCount";
import Loader from "../UI/Loader";
import {useState} from "react";
import ProviderListItem from "./ProviderListItem";

const ProvidersTable = (props) => {
    const [openedIndex, setOpenedIndex] = useState(-1);

    const openRowHandler = (index) => {
        if (openedIndex === index) {
            setOpenedIndex(-1);
        } else {
            setOpenedIndex(index)
        }
    }

    const providers = props.providers.map((provider, index) => {
        return (
            <ProviderListItem
                key={provider.id}
                provider={provider}
                index={index}
                onRowClick={openRowHandler}
                openedIndex={openedIndex}
                rowIsOpened={openedIndex === index}
            />
        )
    });

    return (<div>
        {props.isLoading && (
            <div className="flex justify-center">
                <Loader/>
            </div>
        )}
        {!props.isLoading && (
            <div className="overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-4 px-6 md:hidden">-</th>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6 hidden md:block">Address</th>
                        <th scope="col" className="py-3 px-6">Phone</th>
                        <th scope="col" className="py-3 px-6 hidden md:block">Online</th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers.length > 0 && providers}
                    {providers.length === 0 && (
                        <tr className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td colSpan={4} className="text-center text-2xl p-4">No Entries</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <TableRowsCount onPageSizeChange={props.onPageSizeChange} pageSize={props.pageSize}/>

                <Pagination currentPage={props.currentPage} pagesCount={props.pagesCount}
                            onPageChanged={props.onPageChanged}/>
            </div>
        )}
    </div>)
}

export default ProvidersTable;
