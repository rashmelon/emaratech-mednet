import SelectGroup from "../UI/SelectGroup";
import {useCallback, useEffect, useState} from "react";
import supabaseConfig from "../../config/Supabase";

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

const SupaBaseFilter = (props) => {
    const [items, setItems] = useState([])

    const itemSelectedHandler = (item) => {
        props.onItemSelected(item)
    }

    const fetchItems = useCallback(async () => {
        const builder = supabase
            .from(props.databaseModel)
            .select()
            .order('name', { ascending: true });

        if (props.filters) {
            props.filters.forEach((filter) => builder.eq(filter.key, filter.value));
        }

        const {data} = await builder

        setItems(prepareForSelect(data, 'name', 'id'));
    }, [props.databaseModel, props.filters, setItems]);

    useEffect(() => {
        if (! props.disabled) {
            fetchItems()
        }
    }, [fetchItems, props.disabled]);

    return (
        <div>
            <SelectGroup
                value={props.value}
                changeHandler={itemSelectedHandler}
                items={items}
                label={props.label}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />
        </div>
    )
}

export default SupaBaseFilter;
