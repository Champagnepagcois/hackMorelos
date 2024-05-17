// global.d.ts
interface Window {
    calendar: {
      schedulingButton: {
        load: (config: {
          url: string;
          color: string;
          label: string;
          target?: HTMLElement;
        }) => void;
      };
    };
  }
  