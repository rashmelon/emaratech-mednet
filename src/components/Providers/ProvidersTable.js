const ProvidersTable = (props) => {
    const providers = props.providers.map((provider) => {
        return (
            <tr key={provider.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{provider.name}</td>
                <td className="py-4 px-6">{provider.address}</td>
                <td className="py-4 px-6">{provider.telephone_1} {provider.telephone_2} {provider.hotline}</td>
                <td className="py-4 px-6">{provider.online}</td>
            </tr>
        )
    });

    const previousHandler = () => {
        if (props.currentPage !== 1) {
            props.onPageChanged(props.currentPage - 1);
        }
    }

    const nextHandler = () => {
        if (props.currentPage !== props.pagesCount) {
            props.onPageChanged(props.currentPage + 1);
        }
    }

    const pageChangeHandler = (pageNumber) => {
        if (pageNumber !== props.currentPage) {
            props.onPageChanged(pageNumber);
        }
    }

    let pages;
    if (props.pagesCount > 0) {
        pages = (
            <li key="prev">
                <button
                    onClick={previousHandler}
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
                    ${props.currentPage === 1 
                        ? 'cursor-not-allowed bg-gray-600 text-gray-300 dark:bg-gray-600 dark:text-gray-300 hover:text-gray-300 hover:bg-gray-600 dark:hover:text-gray-300 dark:hover:bg-gray-600' 
                        : 'cursor-pointer'
                    }`}
                >
                    Previous
                </button>
            </li>
        );

        for (let i = 0; i < props.pagesCount; i++) {
            pages = [pages,
                <li key={i}>
                    <button
                        onClick={pageChangeHandler.bind(null, i + 1)}
                        className={i + 1 === props.currentPage
                            ? "cursor-not-allowed flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            : "cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                    >
                        {i + 1}
                    </button>
                </li>
            ];
        }

        pages = [...pages,
            <li key="next">
                <button
                    onClick={nextHandler}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                        ${props.currentPage === props.pagesCount
                            ? 'cursor-not-allowed bg-gray-600 text-gray-300 dark:bg-gray-600 dark:text-gray-300 hover:text-gray-300 hover:bg-gray-600 dark:hover:text-gray-300 dark:hover:bg-gray-600'
                            : 'cursor-pointer '
                        }`}
                >
                    Next
                </button>
            </li>
        ];
    }

    return (<div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">Name</th>
                    <th scope="col" className="py-3 px-6">Address</th>
                    <th scope="col" className="py-3 px-6">Phone</th>
                    <th scope="col" className="py-3 px-6">Online</th>
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
        </div>

        <nav className=" overflow-x-auto mt-2">
            <ul className="inline-flex -space-x-px text-sm">
                {pages}
            </ul>
        </nav>
    </div>)
}

export default ProvidersTable;
