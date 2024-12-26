export type ModalVariant = 'info' | 'success' | 'warning' | 'error';

export type BaseModalProps = {
  title: string;
  isLoading?: boolean;
};

export type ModalTypes = {
  auth: BaseModalProps & {
    content?: string;
  };
  logout: BaseModalProps;
  share: BaseModalProps & {
    url?: string;
  };
  confirmation: BaseModalProps & {
    text: string;
    action: () => Promise<void> | void;
    variant?: ModalVariant;
    confirmText?: string;
    cancelText?: string;
    data?: any;
  };
  question: BaseModalProps & {
    data?: any;
  };
  modificationAttributes: BaseModalProps & {
    attributesList: Record<string, any>;
    handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
  fastOrder: BaseModalProps & {
    product: any;
  };
};
