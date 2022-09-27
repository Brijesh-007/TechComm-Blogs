export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    slug: any;
    name: string;
    image: string;
  };
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Comment {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: true;
  comment: string;
  email: string;
  name: string;
  post: { _ref: string; _type: string };
}

export interface Author {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  bio: [
    {
      children: any;
      title: "Block";
      type: "block";
      styles: [{ title: "Normal"; value: "normal" }];
      lists: [];
    }
  ];
  slug: {
    current: string;
  };
}
