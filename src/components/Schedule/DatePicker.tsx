'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib';
import {
  Calendar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

type DatePickerProps = {
  activeDay: Date;
  gotoClassDate: (date: Date) => void;
}

export default function DatePicker({ activeDay, gotoClassDate }: DatePickerProps) {
  const selectHandler = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    gotoClassDate(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-[110px] justify-center font-normal text-xs',
            !activeDay ? 'text-muted-foreground' : '',
          )}
          variant={activeDay ? 'outline' : 'default'}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {activeDay ? format(activeDay, 'MM/dd/yy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={activeDay}
          onSelect={selectHandler}
          className="bg-gradient-to-b from-white to-mint-seafoam"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
