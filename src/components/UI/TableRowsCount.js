const TableRowsCount = (props) => {
    const onChange = (event) => {
        props.onPageSizeChange(event.target.value)
    }
    return (
        <div className="flex justify-end items-center mt-2">
            <div className="mr-2">
                Displaying {Math.min(props.itemsCount, props.pageSize)} of {props.totalCount}
            </div>
            <select className="border border-gray-300 rounded px-2 py-1" onChange={onChange} value={props.pageSize}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    )
}

export default TableRowsCount;
