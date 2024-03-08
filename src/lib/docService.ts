import {
    HeightRule,
    IPatch,
    Paragraph,
    patchDocument,
    PatchType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType
} from "docx";
import * as path from "path";
import * as fs from "fs/promises";
import {Contract, Field} from "../model/contract";
import {Sale} from "../model/sale";

export async function generateContract(contract: Contract, savePath: string) {
    console.log(__dirname)
    const template = await fs.readFile(path.join(__dirname, "template.docx"));
    const patches: Record<string, IPatch> = {};

    for (const key in contract) {
        const indexKey = key as keyof Contract;

        console.log(key)

        if (Array.isArray(contract[indexKey])) {
            patches[key] = getPatchForTable(contract[indexKey] as Array<Sale>);
        } else {
            patches[key] = getPatch(contract[indexKey] as PatchableField);
        }
    }

    const doc = await patchDocument(template, {
        patches: patches
    });

    await fs.writeFile(path.join(savePath, `${contract.contract_number.value}.docx`), doc);
}


type PatchableField = Field<string> | Field<number> | Field<Date>;

function getPatch(field: PatchableField): IPatch {
    console.log(field)

    let value: string
    if (typeof field.value === "string") {
        value = field.value;
    } else if (field.value instanceof Date) {
        value = formatDate(field.value as Date)
    } else {
        value = field.value.toString();
    }

    return {
        type: PatchType.PARAGRAPH,
        children: [new TextRun({
            text: value,
            bold: field.isBold,
            size: `${field.fontSize * 2}pt`,
            font: "Tahoma"
        })],
    }
}


// Get date as DD/MM/YYYY
function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function getPatchForTable(sales: Array<Sale>): IPatch {
    console.log("table")
    const headerRow = new TableRow({
        height:{
            value: 600,
            rule: HeightRule.EXACT
        },
        children: [
            new TableCell({
                verticalAlign: "center",
                margins: {
                    top: 20,
                    bottom: 20,
                },
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: "Nr. crt",
                            bold: true,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: "Casa de marcat (marca si modelul)",
                            bold: true,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: "Seria",
                            bold: true,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: "Adresa locului de amplasare",
                            bold: true,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),
        ]
    })

    return {
        type: PatchType.DOCUMENT,
        children: [new Table(
            {
                width: {
                    size: 100,
                    type: WidthType.AUTO,
                },
                columnWidths: [2500, 2500, 2500, 2500],
                indent: {
                    size: 450,
                    type: WidthType.DXA,
                },
                rows: [headerRow, ...sales.map(getPatchForSale)]
            }
        )]

    }
}

function getPatchForSale(sale: Sale): TableRow {
    return new TableRow({
        height:{
            value: 350,
            rule: HeightRule.EXACT
        },
        children: [
            new TableCell({
                verticalAlign: "center",
                shading: {
                    fill: "#ECECEC"
                },
                children: [
                    new Paragraph({
                        alignment: "right",
                        children: [new TextRun({
                            text: sale.id.toString(),
                            bold: false,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                shading: {
                    fill: "#ECECEC"
                },
                width: {size: 25, type: WidthType.PERCENTAGE},
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: sale.item,
                            bold: false,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                shading: {
                    fill: "#ECECEC"
                },
                width: {size: 25, type: WidthType.PERCENTAGE},
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: sale.sn,
                            bold: false,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),

            new TableCell({
                verticalAlign: "center",
                shading: {
                    fill: "#ECECEC"
                },
                width: {size: 25, type: WidthType.PERCENTAGE},
                children: [
                    new Paragraph({
                        children: [new TextRun({
                            text: sale.address,
                            bold: false,
                            size: "20pt",
                            font: "Tahoma"
                        })]
                    }),
                ]
            }),
        ]
    })
}