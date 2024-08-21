'use client'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  import Image from 'next/image'
  import DatePicker from "react-datepicker";
  import { Textarea } from "./ui/textarea";
  import { Input } from "@/components/ui/input"
  import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

  import { FormFieldType} from  './forms/PatientForm'
// /React phone number selection
  import 'react-phone-number-input/style.css'
  import PhoneInput from "react-phone-number-input";
  import { Checkbox } from "./ui/checkbox";




//  passing in the form as a prop from patientForm
  import { Control } from "react-hook-form"
  interface CustomProps {
    control: Control <any>,
    fieldType:FormFieldType,
    name:string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt? : string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field : any) => React.ReactNode,
  }
//  a functional component that would render all kinds of inputs
const RenderField =({field, props}: {field: any; props: CustomProps}) =>{
  const { fieldType,iconSrc, iconAlt, placeholder,showTimeSelect,dateFormat, renderSkeleton} =props
   switch (fieldType) {
    case FormFieldType.INPUT:
        return(
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
        )
        case FormFieldType.PHONE_INPUT:
          return (
            <FormControl>
              <PhoneInput
                defaultCountry="US"
                placeholder={placeholder}
                international
                withCountryCallingCode
                value={undefined}
                onChange={field.onChange}
                className="input-phone shad-input border-0"
          />
            </FormControl>
          )
   
      case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
        <Image
          src="/assets/icons/calendar.svg"
          height={24}
          width={24}
          alt="user"
          className="ml-2"
        />
        <FormControl>
          <DatePicker
            showTimeSelect={showTimeSelect ?? false}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            timeInputLabel="Time:"
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            wrapperClassName="date-picker"
           
        
          />
        </FormControl>
      </div>

          )

          case FormFieldType.CHECKBOX:
            return (
              <FormControl>
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor={props.name} className="checkbox-label">
                    {props.label}
                  </label>
                </div>
              </FormControl>
            );
      case FormFieldType.SKELETON:
        return renderSkeleton ? renderSkeleton(field) : null;

        case FormFieldType.SELECT:
          return (
            <FormControl>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
            </FormControl>
          )

          case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      )
    default:
        break;
   }
}


function CustomFormField( props: CustomProps) {
    const { control, fieldType, name, label} = props;
    

    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {/* if the filedtype is not a checkbox and the label exist, */}
            {fieldType !== FormFieldType.CHECKBOX && label &&(
                <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />
          </FormItem>
        )}
        />
    )
}

export default CustomFormField
