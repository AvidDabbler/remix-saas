"use client"
import { SelectItem } from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form";


import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { SelectContent, SelectTrigger, SelectValue, Select as _Select } from '~/components/ui/select'
import { cn } from "~/lib/utils"

import { Label } from "./ui/label";



export function Combobox({
  name,
  options,
  error,
  onChange,
  disabled,
  label,
  className = ''
}: {
  name: string;
  options: SelectItemType[];
  disabled?: boolean;
  error?: undefined | string;
  onChange?: (e: SelectItemType) => void;
  label?: string;
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState<null | string>(null)
  const { register } = useForm();

  return (
    <div className={clsx("flex flex-col w-full max-w-[300px] gap-2", className)} >
      {label ? <Label>{label}</Label> : null}
      <input {...register(name)} hidden />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={disabled ? 'hover:cursor-not-allowed' : ''}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="justify-between w-full "
          >
            <span className="w-[calc(90%)] truncate text-left">{searchValue
              || "Select an item"}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={clsx("w-full max-w-[300px] max-h-[300px] overflow-y-auto p-0", className)}>
          <Command>
            <CommandInput placeholder="Search items" className="w-full" />
            <CommandEmpty>No item selected</CommandEmpty>
            <CommandGroup>
              {options.map((el, key) => (
                <CommandItem
                  key={key}
                  value={el.name}
                  onSelect={() => {
                    setSearchValue(searchValue && el.name === searchValue ? null : el.name)
                    setOpen(false)
                    if (onChange) onChange(el)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      searchValue && searchValue === el.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {el.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error ? <p className="text-danger break-normal px-3">{error}</p> : null}
    </div >
  )
}


export interface SelectItemType { [k: string]: string | number; name: string }
export interface SelectItemWithId { [k: string]: string | number; name: string; id: string; }

export function Select({
  name,
  options,
  error,
  disabled,
  label
}: {
  name: string;
  options: SelectItemType[];
  disabled?: boolean;
  error?: undefined | string;
  onChange?: (e: SelectItemType) => void;
  label?: string;
}) {
  const { register } = useForm();

  return (
    <div className={clsx(disabled && "cursor-not-allowed", 'w-full')}>
      <input {...register(name)} hidden />
      <label className="pb-2">{label}</label>
      <_Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>
        <SelectContent>
          {options.map((el, key) => <SelectItem key={key} value={el.name}>{el.name}</SelectItem>)}
        </SelectContent>
      </_Select>
      {error ? <p className="text-danger break-normal px-3">{error}</p> : null}
    </div>
  );
}


