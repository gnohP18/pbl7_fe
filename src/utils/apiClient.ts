import * as StatusCode from "~/constants/status-code";

const config = useRuntimeConfig();
const singletonEnforcer = Symbol();
const nuxtApp = useNuxtApp();

class ApiClient {
  private static inst: ApiClient;

  private client: any;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot initialize client single instance");
    }

    this.client = $fetch.create(this.makeClient());
  }

  static get instance(): ApiClient {
    if (this.inst) {
      return this.inst;
    }

    this.inst = new ApiClient(singletonEnforcer);

    return this.inst;
  }

  makeClient(): Object {
    return {
      baseURL: config.public.API_BASE_URL,
      headers: this.getHeaders(),
      async onRequest() {
        nuxtApp.callHook("page:loading:start");
      },
      async onResponse() {
        nuxtApp.callHook("page:loading:end");
      },
      async onResponseError({ response }) {
        if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
          console.log(`Log status code ${StatusCode.INTERNAL_SERVER_ERROR}`);
        } else if (response.status === StatusCode.NOT_FOUND) {
          navigateTo("/notfound");
        } else if (response.status === StatusCode.UNAUTHENTICATED) {
          console.log(`Log status code ${StatusCode.UNAUTHENTICATED}`);
        } else if (
          [
            StatusCode.UNPROCESSABLE_CONTENT,
            StatusCode.BAD_REQUEST,
            StatusCode.FORBIDDEN,
          ].includes(response.status)
        ) {
          console.log(`Log status code ${response.status}`);
        }
      },
    };
  }

  getHeaders(): Object {
    // const token = getToken();
    let headers = {
      Accept: "application/json",
    };

    // if (token) {
    //   headers = Object.assign(headers, { Authorization: `Bearer ${token}` });
    // }

    // if (config.public.API_TYPE === "tenant") {
    //   headers = Object.assign(headers, {
    //     "X-Tansocart-Client": config.public.API_TENAND_ID,
    //   });
    // }

    return headers;
  }

  get(url: string, params: Object = {}): Promise<any> {
    console.log(123);
    
    return null;
    // return this.client(url, {
    //   method: "GET",
    //   query: params,
    // });
  }

  post(url: string, data: Object = {}): Promise<any> {
    return this.client(url, {
      method: "POST",
      body: data,
    });
  }

  put(url: string, data: Object = {}): Promise<any> {
    return this.client(url, {
      method: "PUT",
      body: data,
    });
  }

  patch(url: string, data: Object = {}): Promise<any> {
    return this.client(url, {
      method: "PATCH",
      body: data,
    });
  }

  delete(url: string, data: Object = {}): Promise<any> {
    return this.client(url, {
      method: "DELETE",
      body: data,
    });
  }
}

export const apiClient = ApiClient.instance;
