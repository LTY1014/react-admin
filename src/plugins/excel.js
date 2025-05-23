import * as XLSX from 'xlsx'

function auto_width(ws, data) {
  /*set worksheet max width per col*/
  const colWidth = data.map((row) =>
    row.map((val) => {
      /*if null/undefined*/
      if (val == null) {
        return { wch: 10 }
      } else if (val.toString().charCodeAt(0) > 255) {
      /*if chinese*/
        return { wch: val.toString().length * 2 }
      } else {
        return { wch: val.toString().length }
      }
    }),
  )
  /*start in the first row*/
  let result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
}

function json_to_array(key, jsonData) {
  return jsonData.map((v) =>
    key.map((j) => {
      return v[j]
    }),
  )
}

// fix data,return string
function fixdata(data) {
  let o = ''
  let l = 0
  const w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

// get head from excel file,return array
function get_header_row(sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const export_table_to_excel = (id, filename) => {
  const table = document.getElementById(id)
  const wb = XLSX.utils.table_to_book(table)
  XLSX.writeFile(wb, filename)
}

export const export_json_to_excel = ({ data, key, title, fileName='export', autoWidth=true }) => {
  const wb = XLSX.utils.book_new()
  const arr = json_to_array(key, data)
  data.unshift(title)
  const ws = XLSX.utils.json_to_sheet(data, { header: key, skipHeader: true })
  if (autoWidth) {
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  XLSX.writeFile(wb, fileName + '.xlsx')
}

/**
 * @param key  键名(对象属性)
 * @param data  数组数据
 * @param title 文件标题
 * @param fileName  文件名
 * @param autoWidth   自动设置列宽
 */
export const export_array_to_excel = ({ key, data, title, fileName='export', autoWidth=true }) => {
  const wb = XLSX.utils.book_new()
  const arr = json_to_array(key, data)
  arr.unshift(title)
  const ws = XLSX.utils.aoa_to_sheet(arr)
  if (autoWidth) {
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  XLSX.writeFile(wb, fileName + '.xlsx')
}

export const read = (data, type) => {
  const workbook = XLSX.read(data, { type: type })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  const header = get_header_row(worksheet)
  const results = XLSX.utils.sheet_to_json(worksheet)
  return { header, results }
}

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_json_to_excel,
  read,
}

// `export_${new Date().getTime()}.xlsx`