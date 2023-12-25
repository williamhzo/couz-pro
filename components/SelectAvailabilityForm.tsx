'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn, getNextSaturdays, getWeekendRange } from '@/lib/utils';
import { User } from '@/types/common';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

export const SelectAvailabilityForm: FC<{ userId: User['id'] }> = ({
  userId,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  const weekends = getNextSaturdays(12);

  const handleSubmit = async () => {
    alert(JSON.stringify({ availabilities, userId }));
  };

  return (
    <>
      <ul>
        {weekends.map((weekend) => {
          const weekendISO = weekend.toDateString();
          const checked = availabilities.includes(weekendISO);
          return (
            <div key={weekendISO} className="mb-8">
              <div className="flex justify-between items-center">
                <Label
                  className={cn(
                    'text-sm w-full transition-colors duration-200',
                    checked ? 'text-foreground' : 'text-muted-foreground'
                  )}
                  htmlFor={weekendISO}
                >
                  {getWeekendRange(weekend)}
                </Label>

                <Checkbox
                  id={weekendISO}
                  checked={checked}
                  onCheckedChange={(checked) => {
                    checked
                      ? setAvailabilities([...availabilities, weekendISO])
                      : setAvailabilities(
                          availabilities.filter((d) => d !== weekendISO)
                        );
                  }}
                />
              </div>

              <hr className="h-px border-none bg-border mt-2" />
            </div>
          );
        })}
      </ul>

      <div className="self-end">
        {submitted ? (
          <p className="text-sm">bien reçu, cimer 🫡</p>
        ) : (
          <Button onClick={handleSubmit}>j&apos;envoie</Button>
        )}
      </div>
    </>
  );
};
