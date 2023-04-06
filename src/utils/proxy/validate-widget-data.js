import widgets from "widgets/widgets";

export default function validateWidgetData(widget, endpoint, data) {
    let valid = true;
    let dataParsed;
    if (typeof data === 'object') {
        dataParsed = data;
    } else {
        try {
            dataParsed = JSON.parse(data);
        } catch (e) {
            valid = false;
        }
    }

    if (dataParsed && Object.entries(dataParsed).length) {
        const validate = widgets[widget.type]?.mappings?.[endpoint]?.validate;
        validate?.forEach(key => {
            if (dataParsed[key] === undefined) {
                valid = false;
            }
        });
    }
    
    return valid;
}
