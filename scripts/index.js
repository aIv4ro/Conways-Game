import { columns, rows, startClassName, stopClassName } from './constants.js'
import { checkCeld } from './algorithm.js'

let isGameStopped = true
let grid
let gameInterval
let isEditing = false

const generateGrid = () => {
  grid = []

  for(let r = 0; r < rows; r++){
    const currentRow = []
    grid.push(currentRow)
    for(let c = 0; c < columns; c++){
      const random = Math.random()

      let state = 0

      if(random < .05){
        state = 1
      }

      currentRow.push({ state, row: r, col: c })
    }
  }
}

const gridContainer = document.getElementById('main')

generateGrid()

const drawGame = (arr) => {
  gridContainer.replaceChildren([])

  arr.forEach(row => {
    row.forEach(celd => {
      const celdDiv = document.createElement(`div`)
  
      let { state, _, col } = celd 
      const classes = ['grid-cell']
  
      if(state == 1){
        classes.push('alive')
      }
  
      celdDiv.classList.add(...classes)
      celdDiv.onclick = () => {
        if(!isEditing){
          return
        }

        celdDiv.classList.toggle('alive')
        state = state == 0 ? 1 : 0
        row[col] = { state, row: celd.row, col }
      }

      gridContainer.appendChild(celdDiv)
    })
  });
}

drawGame(grid)

const conwaysGame = () => {
  const rows = grid.length
  const cols = grid[0].length

  gameInterval = window.setInterval(() => {
    if(isGameStopped){
      return
    }
    
    const newState = []

    grid.forEach(row => {
      const newRow = []
      newState.push(newRow)
      row.forEach(celd => {
        const newCeld = checkCeld(
          { celd, gameState: grid, rows, cols }
        )

        newRow.push(newCeld)
      })
    });

    grid = [...newState]
    drawGame(newState)
  }, 1000)
}
const editButton = document.getElementById('edit-button')
const toggleGameButton = document.getElementById('toggle-game-button')
const refreshButton = document.getElementById('refresh-button')

toggleGameButton.onclick = () => {
  if(isEditing){
    return
  }

  editButton.classList.toggle('disabled')

  toggleGameButton.classList.toggle(startClassName)
  toggleGameButton.classList.toggle(stopClassName)
  toggleGameButton.innerHTML = toggleGameButton.className == startClassName ? 'Start' : 'Stop'
  isGameStopped = !isGameStopped
}

refreshButton.onclick = () => {
  if(gameInterval){
    clearInterval(gameInterval)
  }

  generateGrid()
  drawGame(grid)
  conwaysGame()
}

editButton.onclick = () => {
  if(!isGameStopped){
    return
  }

  isEditing = !isEditing
  editButton.classList.toggle('editing')
  toggleGameButton.classList.toggle('disabled')
}

conwaysGame()