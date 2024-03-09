import {Sale} from "./sale";

export class Contract {
    readonly contract_number: Field<number>;
    readonly contract_date: Field<Date>;
    readonly company_name: Field<string>;
    readonly company_address: Field<string>;
    readonly company_code: Field<string>;
    readonly company_j: Field<string>;
    readonly company_representative: Field<string>;
    readonly total_pay: Field<number>;
    readonly services_pay: Field<number>;
    readonly sub_pay: Field<number>;
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
        this.contract_number = {value: contract_number, isBold: true, fontSize: 11};
        this.contract_date = {value: contract_date, isBold: true, fontSize: 11};
        this.company_name = {value: company_name, isBold: true, fontSize: 9};
        this.company_address = {value: company_address, isBold: false, fontSize: 9};
        this.company_code = {value: company_code, isBold: false, fontSize: 9};
        this.company_j = {value: company_j, isBold: false, fontSize: 9};
        this.company_representative = {value: company_representative, isBold: false, fontSize: 9};
        this.total_pay = {value: total_pay, isBold: true, fontSize: 9};
        this.services_pay = {value: services_pay, isBold: true, fontSize: 9};
        this.sub_pay = {value: sub_pay, isBold: true, fontSize: 9};

        this.sold_table = sold_table
    }
}


export type Field<T extends string | number | Date> = {
    value: T;
    isBold: boolean;
    fontSize: number
}

export type CrawlResult = {
    company_name: string;
    company_address: string;
    company_code: string;
    company_j: string;
}