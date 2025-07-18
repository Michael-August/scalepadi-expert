import { Controller, useFormContext } from "react-hook-form";
import Select from 'react-select';

const MultiSelectField = ({ name, label, options }: { name: string; label: string; options: any[] }) => {

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium">{label}</label>
            <Controller
                control={control}
                name={name}
                rules={{ required: `${label} is required` }}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti
                        options={options}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={(val) => field.onChange(val)}
                    />
                )}
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message as string}</p>}
        </div>
    )
}

export default MultiSelectField
