import Select from "react-tailwindcss-select";
import InputGroup from "./InputGroup";

const SelectGroup = (props) => {
    return (
        <InputGroup label={props.label}>
            <Select
                value={props.value}
                onChange={props.changeHandler}
                options={props.items}
                isSearchable={true}
                placeholder={props.placeholder}
                isDisabled={props.disabled}
            />
        </InputGroup>
    )
}

export default SelectGroup;
