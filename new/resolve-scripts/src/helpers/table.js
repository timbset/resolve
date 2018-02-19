import { table, getBorderCharacters } from 'table'

const config = {
  border: getBorderCharacters('void'),
  columnCount: 2,
  columns: {
    0: {
      width: 16,
      paddingLeft: 2,
      paddingRight: 1
    },
    1: {
      width: 59,
      wrapWord: true,
      paddingLeft: 1,
      paddingRight: 0
    }
  },
  drawHorizontalLine: () => false
}

export default data => table(data, config)
