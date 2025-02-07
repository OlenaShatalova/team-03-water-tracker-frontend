import { toast } from 'react-hot-toast';

export const ErrorToast = message => {
  toast.error(message, {
    style: {
      background: '#D7E3FF',
      color: '#EF5050',
      padding: '10px 16px',
      borderRadius: '8px',
    },
  });
};
