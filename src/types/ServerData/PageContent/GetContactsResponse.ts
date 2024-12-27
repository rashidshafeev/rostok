import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface ContactsFile {
  url: string;
  icon: string;
  type: string;
  date: string;
}

export interface ContactsDataItem {
  id: string;
  value: string;
}

export interface ProjectBranch {
  id: number;
  name: string;
  phone: string;
  working_hours: string;
  email: string;
  address: string;
  city: string;
  street: string;
  house: string;
  latitude: string;
  longitude: string;
  region_code: string;
  region: string;
}

export interface ContactsProps {
  file: ContactsFile;
  data: ContactsDataItem[];
}

export interface ContactsResponse extends AdditionalServerResponseData {
  props: ContactsProps;
  ProjectPageBranches: ProjectBranch[];
}
