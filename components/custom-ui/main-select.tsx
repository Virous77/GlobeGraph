/* eslint-disable no-unused-vars */
'use client';

import React, { ComponentPropsWithRef } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';

type TSelect = Omit<
  ComponentPropsWithRef<typeof Select>,
  'onOpenChange' | 'open' | 'value' | 'onValueChange' | 'className'
>;
type TSelectTrigger = Omit<
  ComponentPropsWithRef<typeof SelectTrigger>,
  'className'
>;
type TSelectValue = Omit<
  ComponentPropsWithRef<typeof SelectValue> & {
    placeholder: string | React.ReactNode;
  },
  'className'
>;
type TSelectContent = Omit<
  ComponentPropsWithRef<typeof SelectContent> & { className: string },
  'className'
>;
type TSelectGroup = Omit<
  ComponentPropsWithRef<typeof SelectGroup>,
  'className'
>;
type TSelectItem = Omit<ComponentPropsWithRef<typeof SelectItem>, 'className'>;
type TSelectLabel = Omit<
  ComponentPropsWithRef<typeof SelectLabel> & { className: string },
  'className'
>;
type TSelectSeparator = Omit<
  ComponentPropsWithRef<typeof SelectSeparator> & { className: string },
  'className'
>;

type TSelectData = {
  name: string;
  value: string;
};

type TGroupedData = {
  name: string;
  data: TSelectData[];
};

type TMainSelect = {
  onOpenChange?: (e: boolean) => void;
  open?: boolean;
  id?: string;
  value?: string;
  onChange?: (e: string) => void;
  data: TSelectData[] | TGroupedData[];
  isGrouped?: boolean;
  classNames?: {
    trigger?: string;
    content?: string;
    group?: string;
    item?: string;
    label?: string;
    separator?: string;
    placeholder?: string;
  };
  placeholder: string | React.ReactNode;
  selectProps?: TSelect;
  selectTriggerProps?: TSelectTrigger;
  selectValueProps?: TSelectValue;
  selectContentProps?: TSelectContent;
  selectGroupProps?: TSelectGroup;
  selectItemProps?: TSelectItem;
  selectLabelProps?: TSelectLabel;
  selectSeparatorProps?: TSelectSeparator;
};

const MainSelect: React.FC<TMainSelect> = (props) => {
  const renderGroup = React.useMemo(() => {
    const groups = (group: TGroupedData, data: TGroupedData[], idx: number) => {
      if (!group.data) return null;
      return (
        <React.Fragment key={idx}>
          <SelectGroup
            key={group.name}
            className={cn(props.classNames?.group)}
            {...props.selectGroupProps}
          >
            <SelectLabel
              {...props.selectLabelProps}
              className={cn(props.classNames?.label)}
            >
              {group.name}
            </SelectLabel>
            {group.data?.map((item) => (
              <SelectItem
                {...props.selectItemProps}
                key={item.value}
                value={item.value}
                className={cn('rounded-[20px]', props.classNames?.item)}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
          {data.length > 1 && idx !== data.length - 1 && (
            <SelectSeparator
              className={cn(props?.classNames?.separator)}
              {...props.selectSeparatorProps}
            />
          )}
        </React.Fragment>
      );
    };
    return groups;
  }, [props.data]);

  const renderItems = React.useMemo(() => {
    return (data: TSelectData[]) => {
      return data?.map((item) => (
        <SelectItem
          {...props.selectItemProps}
          key={item.value}
          value={item.value}
          className={cn('rounded-[20px]', props?.classNames?.item)}
        >
          {item.name}
        </SelectItem>
      ));
    };
  }, [props.data]);

  return (
    <Select
      {...props.selectProps}
      onOpenChange={(e) => {
        if (props.onOpenChange) {
          props.onOpenChange(e);
        }
      }}
      open={props.open}
      value={props.value}
      onValueChange={(e) => {
        if (props.onChange) {
          props.onChange(e);
        }
      }}
    >
      <SelectTrigger
        id={props.id}
        className={cn(
          'text-title w-[180px] rounded-[20px] bg-accent',
          props.classNames?.trigger
        )}
        {...props.selectTriggerProps}
      >
        <SelectValue
          {...props.selectValueProps}
          className={cn(props.classNames?.placeholder)}
          placeholder={props.placeholder || 'Select'}
        />
      </SelectTrigger>
      <SelectContent
        id={props.id}
        {...props.selectContentProps}
        className={cn('z-[100] rounded-[20px]', props.classNames?.content)}
      >
        {props.isGrouped
          ? (props.data as TGroupedData[])?.map((group, idx) =>
              renderGroup(group, props.data as TGroupedData[], idx)
            )
          : renderItems(props.data as TSelectData[])}
      </SelectContent>
    </Select>
  );
};

export default MainSelect;
