import { toast } from 'react-hot-toast';

export const ErrorToast = message => {
  toast.error(message, {
    style: {
      background: '#ef4444',
      color: '#EF5050',
      padding: '10px 16px',
      borderRadius: '8px',
    },
  });
};
