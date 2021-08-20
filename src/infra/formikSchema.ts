import { FieldAttributes } from "formik";

export type Schema = Array<FieldAttributes<any>>;
export class FormSchema {
    constructor(schema: Schema) {
        this.schema = schema;
    }

    getDefaultValues(): {} {
        return this.schema.reduce((obj, { name, defaultValue }) => {
            obj[name] = defaultValue;
            return obj;
        }, {});
    }

    schema: Schema;
}
