import "./index.css"
import {Sale} from "./model/sale";
import {Contract, CrawlResult} from "./model/contract";

const UNSELECTED = "Neselectat"

let servicePrice = 0;
let subPrice = 0;

function loadOptions(options: string[]){
    const optionsWithUnselected = [UNSELECTED, ...options]

    document.querySelectorAll(".model").forEach((el) => {
        el.innerHTML = optionsWithUnselected.map((opt) => `<option value="${opt}">${opt}</option>`).join('')
    })
}

function updateTotal() {
    const total = servicePrice + subPrice
    document.querySelector<HTMLInputElement>("#totalCtrField").value = total.toString()
}

function loadDate() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    document.querySelector<HTMLInputElement>("#dateField").value = `${day}/${month}/${year}`
}

function createContract() {
    const date = new Date()
    const id = document.querySelector<HTMLInputElement>("#idField").value
    const company = document.querySelector<HTMLInputElement>("#societateField").value
    const address = document.querySelector<HTMLInputElement>("#adresaField").value
    const companyJ = document.querySelector<HTMLInputElement>("#numarOrcField").value
    const companyCode = document.querySelector<HTMLInputElement>("#codFiscalField").value
    const representative = document.querySelector<HTMLInputElement>("#reprezentantField").value
    const total = servicePrice + subPrice


    const soldItem: Sale[] = []

    for (let i = 1; i <= 5; i++) {
        const item = document.querySelector<HTMLInputElement>(`#model${i}`).value
        const sn = document.querySelector<HTMLInputElement>(`#serie${i}`).value
        const address = document.querySelector<HTMLInputElement>(`#loc${i}`).value

        if (item !== UNSELECTED) {
            soldItem.push({
                id: i,
                item,
                sn,
                address
            })
        }
    }

    const contract = new Contract({
        contract_number: Number.parseInt(id),
        contract_date: date,
        company_name: company,
        company_j: companyJ,
        company_code: companyCode,
        company_address: address,
        sold_table: soldItem,
        total_pay: total,
        sub_pay: subPrice,
        services_pay: servicePrice,
        company_representative: representative
    });

    console.log(contract);

    (window as any).electronAPI.createContract({...contract})
}


function main() {
    // document.onload = loadOptions
    document.addEventListener("DOMContentLoaded", () => {
        (window as any).electronAPI.loadItems()
        loadDate()
    })


    document.querySelector("#costServiceField").addEventListener("input", (e) => {
        servicePrice = parseInt((e.target as HTMLInputElement).value)
        updateTotal()
    })

    document.querySelector("#costInternetField").addEventListener("input", (e) => {
        subPrice = parseInt((e.target as HTMLInputElement).value)
        updateTotal()
    })

    document.querySelector("#generateContractBtn").addEventListener("click", () => {
        createContract()
    });

    (window as any).electronAPI.onRefreshItems();
    (window as any).electronAPI.onItemsLoaded(loadOptions)

    document.querySelector("#crawlBtn").addEventListener("click", () => {
        const code = document.querySelector<HTMLInputElement>("#codFiscalField").value;
        (window as any).electronAPI.crawl(code)
    });

    (window as any).electronAPI.onCrawlResult((result: CrawlResult) => {
        console.log(result)
        document.querySelector<HTMLInputElement>("#societateField").value = result.company_name
        document.querySelector<HTMLInputElement>("#adresaField").value = result.company_address
        document.querySelector<HTMLInputElement>("#numarOrcField").value = result.company_j
    })
}

main()

