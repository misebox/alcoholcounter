export function formatLocalTime(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getDayKey(timestamp: number, cutOffTime: string): string {
  const date = new Date(timestamp);
  
  const localYear = date.getFullYear();
  const localMonth = date.getMonth();
  const localDay = date.getDate();
  const localHour = date.getHours();
  const localMinute = date.getMinutes();
  
  // Parse cutoff time (HH:MM format)
  const [cutoffHour, cutoffMinute] = cutOffTime.split(':').map(Number);
  
  let adjustedDate = new Date(localYear, localMonth, localDay);
  
  // Check if current time is before cutoff time
  const currentMinutes = localHour * 60 + localMinute;
  const cutoffMinutes = cutoffHour * 60 + cutoffMinute;
  
  if (currentMinutes < cutoffMinutes) {
    adjustedDate.setDate(adjustedDate.getDate() - 1);
  }
  
  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
  const day = String(adjustedDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export function getDayOfWeek(dateStr: string): string {
  const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const date = new Date(dateStr + 'T12:00:00');
  return days[date.getDay()] ?? '';
}

export function getCurrentDayKey(cutOffTime: string): string {
  const now = new Date();
  return getDayKey(now.getTime(), cutOffTime);
}

export function getTimezoneInfo(): string {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  const offsetSign = offset <= 0 ? '+' : '-';
  const offsetString = `UTC${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
  
  return `${timezone} (${offsetString})`;
}