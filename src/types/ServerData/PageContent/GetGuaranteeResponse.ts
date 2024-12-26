import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

interface BaseContentBlock {
  id: string;
  type: string;
}

interface HeaderBlock extends BaseContentBlock {
  type: 'header';
  data: {
    text: string;
    level: number;
  };
}

interface ParagraphBlock extends BaseContentBlock {
  type: 'paragraph';
  data: {
    text: string;
  };
}

interface ListItem {
  content: string;
  items: ListItem[];
}

interface ListBlock extends BaseContentBlock {
  type: 'list';
  data: {
    style: 'ordered' | 'unordered';
    items: ListItem[];
  };
}

type ContentBlock = HeaderBlock | ParagraphBlock | ListBlock;

export interface GuaranteeData {
  individual: ContentBlock[];
  legal: ContentBlock[];
}

export interface GuaranteeResponse extends AdditionalServerResponseData {
  data: GuaranteeData;
}
