import { addDays, addMinutes, isBefore, formatISO } from 'date-fns';

const SLOT_DURATION_MINUTES = 30;

const OFFICE_HOURS = {
  startMorning: 9,
  endMorning: 12,
  startAfternoon: 13,
  endAfternoon: 17,
};

function generateSlotsForDay(baseDate: Date): Date[] {
  const slots: Date[] = [];

  const createSlots = (startHour: number, endHour: number) => {
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += SLOT_DURATION_MINUTES) {
        const slot = new Date(baseDate);
        slot.setHours(hour, min, 0, 0);
        if (isBefore(new Date(), slot)) {
          slots.push(new Date(slot));
        }
      }
    }
  };

  createSlots(OFFICE_HOURS.startMorning, OFFICE_HOURS.endMorning);
  createSlots(OFFICE_HOURS.startAfternoon, OFFICE_HOURS.endAfternoon);

  return slots;
}

export function getNextAvailableSlotsFromAppointments(
  appointments: { appointmentStartTime: string; appointmentEndTime: string }[],
  count = 5
): string[] {
  
  
  const availableSlots: string[] = [];
  let daysChecked = 0;

  while (availableSlots.length < count && daysChecked < 30) {
    const currentDay = addDays(new Date(), daysChecked);
    const weekday = currentDay.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    if (weekday >= 1 && weekday <= 5) { // Monday to Friday
      const daySlots = generateSlotsForDay(currentDay);

      for (const slot of daySlots) {
        const slotEnd = addMinutes(slot, SLOT_DURATION_MINUTES);

        const isConflicting = appointments.some(appt => {
          const apptStart = new Date(appt.appointmentStartTime);
          const apptEnd = new Date(appt.appointmentEndTime);
          return slot < apptEnd && slotEnd > apptStart;
        });

        if (!isConflicting) {
          availableSlots.push(formatISO(slot));
          if (availableSlots.length >= count) break;
        }
      }
    }

    daysChecked++;
  }

  return availableSlots;
}
