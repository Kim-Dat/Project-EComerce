import * as XLSX from "xlsx/xlsx.mjs";

class CommonUtils {
    static exportExcel(data, nameSheet, nameFile) {
        return new Promise((resolve, reject) => {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, nameSheet);
            XLSX.writeFile(wb, `${nameFile}.xlsx`);
            resolve("success");
        });
    }
}

export default CommonUtils;
