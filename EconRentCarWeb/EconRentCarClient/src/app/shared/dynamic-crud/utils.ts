import { isNullOrUndefined } from 'util';

export interface EnumOptions {
    label: string;
    value: number;
}
export function GetLabels(enumOptions: EnumOptions[]): string[] {
    const output: string[] = [];
    if (isNullOrUndefined(enumOptions.find(eo => eo.value === 0 ))) {
        output.push('');
    }
    for (const option of enumOptions) {
        output.push(option.label);
    }
    return output;
}
