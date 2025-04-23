import { firebaseAuth } from "@/core/firebase";
import { ApiResultDTO } from "@/shared/interfaces/api-result.interface";
import { Author } from "@/shared/interfaces/author.interface";
import { Book, BookFilter, BooksAround, CreateBook } from "@/shared/interfaces/book.interface";
import { Publisher } from "@/shared/interfaces/publisher.interface";
import { Reader } from "@/shared/interfaces/reader.interface";
import axios, { AxiosInstance } from "axios";
import { onAuthStateChanged } from "firebase/auth";


export class Api {
  private http: AxiosInstance;

  constructor(baseURL?: string, apiKey?: string) {
    if (!baseURL) {
      throw Error("API URL not provided");
    }

    if (!apiKey) {
      throw Error("API Key not provided");
    }

    this.http = axios.create({
      baseURL,
      headers: {
        "api-key": apiKey
      }
    });

    this.http.interceptors.request.use(async (request) => {
      const token = await this.getUserToken();

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    }, (error) => error);
  }

  async getAuthors(options: { page?: number, limit?: number }): Promise<ApiResultDTO<Author[]>> {
    const qs = new URLSearchParams();

    qs.append("page", String(options.page || 1));
    qs.append("limit", String(options.limit || 20));

    const { data } = await this.http.get<ApiResultDTO<Author[]>>(`/author?${qs}`);
    return data;
  }

  async getAuthorById(id: string): Promise<ApiResultDTO<Author>> {
    const { data } = await this.http.get<ApiResultDTO<Author>>(`/author/${id}`);
    return data;
  }

  async getBooks(options: { filter: BookFilter | string; query?: string, page?: number, limit?: number }): Promise<ApiResultDTO<Book[]>> {
    const qs = new URLSearchParams();

    if (options.query) {
      qs.append(options.filter, options.query);
    }

    qs.append("page", String(options.page || 1));
    qs.append("limit", String(options.limit || 20));

    const { data } = await this.http.get<ApiResultDTO<Book[]>>(`/book?${qs}`);
    return data;
  }

  async getBookById(id: string): Promise<ApiResultDTO<Book>> {
    const { data } = await this.http.get<ApiResultDTO<Book>>(`/book/${id}`);
    return data;
  }

  async getNextBookCode(): Promise<ApiResultDTO<{ nextCode: string }>> {
    const { data } = await this.http.get<ApiResultDTO<{ nextCode: string }>>("/book/next-code");
    return data;
  }

  async getBooksAroundById(id: string): Promise<ApiResultDTO<BooksAround>> {
    const { data } = await this.http.get<ApiResultDTO<BooksAround>>(`/book/${id}/around`);
    return data;
  }

  async getPublishers(): Promise<ApiResultDTO<Publisher[]>> {
    const { data } = await this.http.get<ApiResultDTO<Publisher[]>>("/publisher");
    return data;
  }

  async getPublisherById(id: string): Promise<ApiResultDTO<Publisher>> {
    const { data } = await this.http.get<ApiResultDTO<Publisher>>(`/publisher/${id}`);
    return data;
  }

  async getReaders(): Promise<ApiResultDTO<Reader[]>> {
    const { data } = await this.http.get<ApiResultDTO<Reader[]>>("/publisher");
    return data;
  }

  async getReaderById(id: string): Promise<ApiResultDTO<Reader>> {
    const { data } = await this.http.get<ApiResultDTO<Reader>>(`/publisher/${id}`);
    return data;
  }

  async createBook(book: CreateBook): Promise<ApiResultDTO<Book>> {
    const { data } = await this.http.post<ApiResultDTO<Book>>("/book", book);
    return data;
  }

  async updateBookCover(id: string, coverUrl: string): Promise<ApiResultDTO<Book>> {
    const { data } = await this.http.patch<ApiResultDTO<Book>>(`/book/${id}/`, {
      coverUrl
    });

    return data;
  }

  private getUserToken = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          resolve(token);
        } else {
          console.info("User not logged in");
          resolve(null);
        }
        unsub();
      });
    });
  };
}

export default new Api(import.meta.env.VITE_API_BASEURL, import.meta.env.VITE_API_KEY);
