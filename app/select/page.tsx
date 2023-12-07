'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getNextSaturdays, getWeekendRange } from '@/lib/utils';
import add from 'date-fns/add';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Select() {
  const [submitted, setSubmitted] = useState(false);

  const [availabilities, setAvailabilities] = useState([]);

  const weekends = getNextSaturdays(10);

  const searchParams = useSearchParams();
  const user = searchParams.get('couz');

  return (
    <main className="flex flex-col gap-12">
      <Heading>
        choisis tes dates <span className="font-medium">{user}</span>
      </Heading>

      <ul>
        {weekends.map((weekend) => (
          <div key={weekend.toISOString()} className="mb-8">
            <div className="flex justify-between items-end">
              <p className="text-sm">{getWeekendRange(weekend)}</p>

              <ToggleGroup type="single" variant="outline">
                <ToggleGroupItem
                  value="yes"
                  aria-label="Toggle yes"
                  className="w-16 px-0"
                >
                  là
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="no"
                  aria-label="Toggle no"
                  className="w-16 px-0"
                >
                  pas là
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <hr className="h-px border-none bg-border mt-2" />
          </div>
        ))}
      </ul>

      <div className="self-end">
        {submitted ? (
          <p className="text-sm">bien reçu, cimer 🫡</p>
        ) : (
          <Button onClick={() => console.log('handleSubmit')}>
            j&apos;envoie
          </Button>
        )}
      </div>
    </main>
  );
}
