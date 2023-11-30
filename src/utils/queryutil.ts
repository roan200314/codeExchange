import { api } from "@hboictcloud/api";
import "../hboictcloud-config";

export async function runQuery(query: string, params?: Array<any>): Promise<Array<any> | undefined> {
    try {
        return (await api.queryDatabase(query, params)) as Array<any>;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}