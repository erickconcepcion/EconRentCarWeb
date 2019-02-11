import { isNullOrUndefined } from 'util';

export interface EnumOptions {
    label: string;
    value: number;
}
export function GetLabels(enumOptions: EnumOptions[]): string[] {
    const output: string[] = [];
    if (isNullOrUndefined(enumOptions.find(eo => eo.value === 0))) {
        output.push('');
    }
    for (const option of enumOptions) {
        output.push(option.label);
    }
    return output;
}
export function changeEnum(instance: Object): EnumOptions[] {
    const keys = Object.keys(instance);
    const values: EnumOptions[] = [];
    for (const key of keys) {
        const value = instance[key];
        if (typeof value === 'string') {
            values.push({
                label: value,
                value: instance[value]
            });
        }
    }
    return values;
}
