import { IncomingHttpHeaders } from 'http';

declare module 'http' {
    interface IncomingHttpHeaders {
        "user_id"?: string
    }
}
