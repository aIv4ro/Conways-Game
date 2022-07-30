import { clamp } from './utils.js'

export const checkCeld = ({celd, gameState, rows, cols}) => {
  const { state, row, col } = celd

  const startRow = clamp(row - 1, 0, rows - 1)
  const endRow = clamp(row + 1, 0, rows - 1)

  const startCol = clamp(col - 1, 0, cols - 1)
  const endCol = clamp(col + 1, 0, cols - 1)

  let closeCeldsAlive = 0

  for(let i = startRow; i <= endRow; i++){
    for(let j = startCol; j <= endCol; j++){
      if(i == row && j == col){
        continue
      }

      if(gameState[i][j].state == 1){
        closeCeldsAlive++
      }
    }
  } 

  let newCeldState

  if(state == 0 && closeCeldsAlive == 3){
    newCeldState = 1
  }else if(state == 1 && (closeCeldsAlive == 2 || closeCeldsAlive == 3)){
    newCeldState = 1
  }else{
    newCeldState = 0
  }

  const newCeld = { state: newCeldState, row, col }

  return newCeld
}