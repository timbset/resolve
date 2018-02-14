import { table, getBorderCharacters } from 'table'

const config = {
  border: getBorderCharacters('void'),
  columnCount: 3,
  columns: {
    0: {
      width: 16,
      paddingLeft: 2,
      paddingRight: 1
    },
    1: {
      width: 32,
      wrapWord: true,
      paddingLeft: 1,
      paddingRight: 1
    },
    2: {
      alignment: 'right',
      width: 26,
      wrapWord: true,
      paddingLeft: 1,
      paddingRight: 0
    }
  },
  drawHorizontalLine: () => false
}

export default data => table(data, config)
