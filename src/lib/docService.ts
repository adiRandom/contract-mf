import * as path from "path";
import * as fs from "fs";
import {Contract} from "../model/contract";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import open from 'open';


function openTemplate() {
    const template = fs.readFileSync(path.join(__dirname, "template.docx"), "binary");
    const zip = new PizZip(template);
    return new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
}

export function generateContractAndOpen(contract: Contract, savePath: string) {
    const template = openTemplate();
    template.render({
        ...contract,
        contract_date: formatDate(contract.contract_date),
    })

    const buf = template.getZip().generate({type: "nodebuffer", compression: "DEFLATE"});
    const outPath = path.resolve(savePath, `${contract.contract_number}.docx`);


    fs.writeFileSync(path.resolve(savePath, outPath), buf);

    open(path.resolve(savePath, outPath));
}


// Get date as DD/MM/YYYY
function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
