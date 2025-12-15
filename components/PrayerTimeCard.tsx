'use client';

interface PrayerTimeCardProps {
  name: string;
  time: string;
}

export default function PrayerTimeCard({ name, time }: PrayerTimeCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-emerald-100">
      <h3 className="text-lg font-semibold text-emerald-700 mb-2">
        {name}
      </h3>
      <p className="text-2xl font-bold text-emerald-800">
        {time}
      </p>
    </div>
  );
}