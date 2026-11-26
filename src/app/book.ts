
export interface Book {
  bookID?: number;
  authorName: string;
  bookTitle: string;
  storyHook: string;
  genre: string;
  pubDate: string;
  publisher: string;
  recBy: string | null; // helps user remember where they first heard about the book.
  starRating: number | null; // if there is no star rating yet, that means the user has not read it or has not finished reading yet.
  imageName?: string;
}