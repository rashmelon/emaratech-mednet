const InputGroup = (props) => {
    return (
        <div className={`grid gap-1 ${props.className}`}>
            <label>{props.label}</label>

            {props.children}
        </div>
    )
}

export default InputGroup;
