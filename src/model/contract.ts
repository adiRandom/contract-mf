import {Sale} from "./sale";

export class Contract {
    readonly contract_number: number;
    readonly contract_date: Date;
    readonly company_name: string;
    readonly company_address: string;
    readonly company_code: string;
    readonly company_j: string;
    readonly company_representative: string;
    readonly total_pay: number;
    readonly services_pay: number;
    readonly sub_pay: number;
    readonly sold_table: Sale[];

    constructor({
                    contract_number,
                    contract_date,
                    company_name,
                    company_address,
                    company_code,
                    company_j,
                    company_representative,
                    total_pay,
                    services_pay,
                    sub_pay,
                    sold_table
                }: {
        contract_number: number;
        contract_date: Date;
        company_name: string;
        company_address: string;
        company_code: string;
        company_j: string;
        company_representative: string;
        total_pay: number;
        services_pay: number;
        sub_pay: number;
        sold_table: Sale[];
    }) {
        this.contract_number = contract_number;
        this.contract_date = contract_date;
        this.company_name = company_name;
        this.company_address = company_address;
        this.company_code = company_code;
        this.company_j = company_j;
        this.company_representative = company_representative;
        this.total_pay = total_pay;
        this.services_pay = services_pay;
        this.sub_pay = sub_pay;

        this.sold_table = sold_table
    }
}


export type CrawlResult = {
    company_name: string;
    company_address: string;
    company_code: string;
    company_j: string;
}