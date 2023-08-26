import { useTranslation } from 'react-i18next';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { useToast } from '@/hooks/use-toast';

export default function Toaster() {
  const {
    i18n: { language },
  } = useTranslation();
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast
            key={id}
            className={
              language === 'en'
                ? 'data-[state=closed]:slide-out-to-right-full'
                : 'data-[state=closed]:slide-out-to-left-full'
            }
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
