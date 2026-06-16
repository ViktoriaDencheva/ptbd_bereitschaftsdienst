export interface Message {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistRole: string;
  therapistPhoto: string;
  from: "patient" | "therapist";
  text: string;
  sentAt: string;
  read: boolean;
}

const KEY = "pb_messages";

export function getMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function save(msgs: Message[]) {
  localStorage.setItem(KEY, JSON.stringify(msgs));
  window.dispatchEvent(new Event("pb_messages_change"));
}

export function getThread(therapistId: string): Message[] {
  return getMessages().filter(m => m.therapistId === therapistId);
}

export function getThreads(): { therapistId: string; therapistName: string; therapistRole: string; therapistPhoto: string; last: Message; unread: number }[] {
  const msgs = getMessages();
  const map = new Map<string, Message[]>();
  msgs.forEach(m => {
    const arr = map.get(m.therapistId) ?? [];
    arr.push(m);
    map.set(m.therapistId, arr);
  });
  return Array.from(map.entries()).map(([tid, arr]) => {
    const sorted = arr.sort((a, b) => a.sentAt.localeCompare(b.sentAt));
    return {
      therapistId: tid,
      therapistName: arr[0].therapistName,
      therapistRole: arr[0].therapistRole,
      therapistPhoto: arr[0].therapistPhoto,
      last: sorted[sorted.length - 1],
      unread: arr.filter(m => !m.read && m.from === "therapist").length,
    };
  }).sort((a, b) => b.last.sentAt.localeCompare(a.last.sentAt));
}

export function sendPatientMessage(therapistId: string, therapistName: string, therapistRole: string, therapistPhoto: string, text: string): Message {
  const all = getMessages();
  const msg: Message = {
    id: crypto.randomUUID(),
    therapistId, therapistName, therapistRole, therapistPhoto,
    from: "patient",
    text,
    sentAt: new Date().toISOString(),
    read: true,
  };
  save([...all, msg]);
  return msg;
}

export function sendTherapistMessage(therapistId: string, therapistName: string, therapistRole: string, therapistPhoto: string, text: string): Message {
  const all = getMessages();
  const msg: Message = {
    id: crypto.randomUUID(),
    therapistId, therapistName, therapistRole, therapistPhoto,
    from: "therapist",
    text,
    sentAt: new Date().toISOString(),
    read: false,
  };
  save([...all, msg]);
  return msg;
}

export function markThreadRead(therapistId: string) {
  const all = getMessages().map(m =>
    m.therapistId === therapistId ? { ...m, read: true } : m
  );
  save(all);
}

export function getTotalUnread(): number {
  return getMessages().filter(m => !m.read && m.from === "therapist").length;
}
