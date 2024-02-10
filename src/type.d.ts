export interface ApiQuote {
  category: string;
  author: string;
  text: string;
}

export interface Quote extends ApiQuote {
  id: string;
}

export interface ApiQuotes {
  [id: string]: ApiQuote;
}