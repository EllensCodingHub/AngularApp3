
export interface Book {
  bookID?: number;
  authorName: string;
  bookTitle: string;
  storyHook: string;
  genre: string;
  pubDate: string;
  publisher: string;
  recBy: number | null; // helps user remember where they first heard about the book. For now the list will be limited to YouTube or BookTok, but more can be added in the future.
  starRating: number | null; // if there is no star rating yet, that means the user has not read it or has not finished reading yet.
  imageName?: string;
}