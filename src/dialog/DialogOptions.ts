export enum DialogType {
  Modal,
  Fullscreen
}

interface IDialogOptions {
  onCancel?: () => void;
  onConfirm?: () => void;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  title?: string;
  type: DialogType;
}

export default IDialogOptions;
