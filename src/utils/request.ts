/**
 * 重写XMLHttpRequest
 */
interface IXmlHttpRequest {
    readonly readyState: number;
    readonly response: any;
    readonly responseText: string;
    readonly status: number;
    readonly statusText: string;

    open(method: string, url: string): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
}
enum readyState {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
}

type Options = {
    onComplete?: (a: any) => void;
    onBeforeRequest?: (a: any) => void;
};
interface MyRequestInfo {
    request?: any;
    response?: any;
    target?: any;
}

export interface RequestEventeMap {
    onComplete: CustomEvent<MyRequestInfo>;
    onBeforeRequest: CustomEvent<MyRequestInfo>;
}

class RequestEventer extends EventTarget {}
const requestEventBus = new RequestEventer();
const rawXMLHttpRequest = window.XMLHttpRequest;

export function reWriteXMLHttpRequest(options: Options) {
    const rawOpen = rawXMLHttpRequest.prototype.open;
    rawXMLHttpRequest.prototype.open = function (
        ...args: [
            method: string,
            url: string | URL,
            async?: boolean,
            username?: string | null | undefined,
            password?: string | null | undefined
        ]
    ) {
        const requestType = args;
        const event = new CustomEvent('onBeforeRequest', {
            detail: {
                requestType,
                target: this,
            },
        });

        requestEventBus.dispatchEvent(event);
        this.addEventListener('readystatechange', () => {
            // console.log('pz readyState', this.readyState);
            if (this.readyState === readyState.DONE) {
                // const event = new CustomEvent('onComplete', {
                //   detail: {
                //     requestType,
                //     responseData: tryParseRequestData(this.response),
                //     target: this,
                //   },
                // });
                // requestEventBus.dispatchEvent(event);
            }
        });
        return rawOpen.apply(this, args as any);
    };

    // 重写XMLHttpRequest open方法

    const { onComplete, onBeforeRequest } = options || {};
    if (onComplete) {
        requestEventBus.addEventListener('onComplete', onComplete);
    }
    if (onBeforeRequest) {
        requestEventBus.addEventListener('onBeforeRequest', onBeforeRequest);
    }
}
