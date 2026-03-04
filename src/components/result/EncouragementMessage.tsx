import { useMemo } from 'react';
import { ENCOURAGEMENT_MESSAGES } from '@/lib/constants';

interface EncouragementMessageProps {
  message?: string;
}

export default function EncouragementMessage({ message }: EncouragementMessageProps) {
  const displayMessage = useMemo(
    () => message ?? ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)],
    [message]
  );

  return (
    <p className="font-display text-2xl text-bark text-center">
      {displayMessage}
    </p>
  );
}
