import {Fragment} from "react";

const ProviderListItem = (props) => {
    const {provider, index, onRowClick, rowIsOpened} = props;
    return (
        <Fragment>
            <tr onClick={onRowClick.bind(null, index)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className={`md:hidden cursor-pointer ${rowIsOpened? 'rotate-180': ''}`}>
                    <div className="flex justify-center items-center">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                        </svg>
                    </div>
                </td>
                <td className="py-4 px-6">{provider.name}</td>
                <td className="py-4 px-6 hidden md:block">{provider.address}</td>
                <td className="py-4 px-6">
                    <a className="mr-1 block md:inline" href={`tel:${provider.telephone_1}`}>{provider.telephone_1}</a>
                    <a className="mr-1 block md:inline" href={`tel:${provider.telephone_2}`}>{provider.telephone_2}</a>
                    <a className="mr-1 block md:inline" href={`tel:${provider.hotline}`}>{provider.hotline}</a>
                </td>
                <td className="py-4 px-6 hidden md:block">{provider.online}</td>
            </tr>
            {rowIsOpened && <tr className="md:hidden bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td className="py-4 px-6" colSpan={4}>Address: {provider.address}<br/>Online: {provider.online}</td>
            </tr>}
        </Fragment>
    )
}

export default ProviderListItem;
