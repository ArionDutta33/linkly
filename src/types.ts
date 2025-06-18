export type LinkType = {
  id: number;
  link: string;
  link_title: string;
  description: string;
  action: {
    delete: string;
    edit: string;
  };
};
