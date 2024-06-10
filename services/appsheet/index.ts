import axios from 'axios';

interface ApiResponse<T> {
    statusCode: number;
    data: T;
}

interface AppSheetRow {
    [key: string]: any; // Definir la estructura de las filas según tu aplicación
}

class AppSheetAPI {
    private readonly baseURL: string = 'https://api.appsheet.com/api/v2';

    constructor(private readonly appId: string, private readonly accessKey: string) { }

    private async request(endpoint: string, method: string, data?: any): Promise<ApiResponse<any>> {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'ApplicationAccessKey': this.accessKey
        };
        try {
            const response = await axios.request({
                url,
                method,
                headers,
                data
            });

            return {
                statusCode: response.status,
                data: response.data
            };
        } catch (error) {
            if (error.response) {
                return {
                    statusCode: error.response.status,
                    data: error.response.data
                };
            } else {
                // Si no hay una respuesta en el error, se lanza el error original
                throw error;
            }
        }
    }

    async addRow(tableName: string, row: AppSheetRow) {
        const endpoint = `/apps/${this.appId}/tables/${encodeURIComponent(tableName)}/Action`;
        const requestData = {
            Action: 'Add',
            Properties: {
                Locale: "es-AR"
            },
            Rows: [row]
        };
        return this.request(endpoint, 'POST', requestData);
    }

    async editRow(tableName: string, rowId: string, row: AppSheetRow) {
        const endpoint = `/apps/${this.appId}/tables/${encodeURIComponent(tableName)}/Action`;
        const requestData = {
            Action: 'Edit',
            RowId: rowId,
            Row: row
        };
        return this.request(endpoint, 'POST', requestData);
    }

    async deleteRow(tableName: string, rowId: string) {
        const endpoint = `/apps/${this.appId}/tables/${encodeURIComponent(tableName)}/Action`;
        const requestData = {
            Action: 'Delete',
            RowId: rowId
        };
        return this.request(endpoint, 'POST', requestData);
    }

    async findRow(tableName: string, rowId: string) {
        const endpoint = `/apps/${this.appId}/tables/${encodeURIComponent(tableName)}/Action`;
        const requestData = {
            Action: 'Find',
            RowId: rowId
        };
        return this.request(endpoint, 'POST', requestData);
    }
}

export default AppSheetAPI