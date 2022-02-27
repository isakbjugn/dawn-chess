document.addEventListener('DOMContentLoaded', function() {
    drawBoard('')
}, false)

async function updateBoard(event) {
    const file = event.target.files.item(0)
    const ext = await file.name.match(/\.([^\.]+)$/)[1]
    switch ( ext ) {
        case 'pgn':
            break;
        default:
            alert('Please select a valid .pgn file')
            wipeInputField()
            return;
    }
    const text = await file.text()
    drawBoard(text)
    document.getElementById("custom-link").value = ''
}

function wipeInputField() {
    const inputField = document.getElementById('custom-file')
    inputField.value = ''
}

function drawBoard(pgnStr) {
    resetMoveText()
    PGNV.pgnView('board', { pgn: pgnStr, pieceStyle: 'merida', boardSize: chessBoardWidth(), theme: 'blue' })
}

async function evalSourceLink(event) {
    const text = event.target.value
    if ( text.length < 28 ) { return }
    if ( text.substring(0,20) === 'https://lichess.org/' ) {
        const gameId = text.substring(20,28)
        importGame(gameId)
    }
}

async function importGame(gameId) {
    const Url = 'https://lichess.org/game/export/' + gameId
    $.get(Url, function(data, status) {
        if (status === 'success') {
            drawBoard(`${data}`)
        }
    })
}

const customLinkInputField = document.getElementById('custom-link')
customLinkInputField.addEventListener('input', evalSourceLink)


$('.featured-product').on('DOMSubtreeModified', '#boardInner', function() {
    if ( $('.yellow').length ) {
        const move = parseInt($('.yellow').parent().attr('id').replace('boardMoves', '')) + 1
        const white = ( $('.yellow').parent().attr('class') === undefined ) ? false : true
        setMoveText(move, white)
    }
})

$('.featured-product').on('click', '#boardButtonprev', function() {
    if ( $('.yellow').length ) {
        return
    }
    resetMoveText()
})

$('.featured-product').on('click', '#boardButtonfirst', function() {
    resetMoveText()
})

function resetMoveText() {
    document.getElementById('custom-move').value = ''
}

function setMoveText(move, white) {
    if (move === 0) {
        resetMoveText()
    }
    else {
        const moveStr = move.toString()
        const colourStr = ( white ) ? 'White' : 'Black'
        const movePair = ( white ) ? (move + 1) / 2 : move / 2
        const movePairStr = movePair.toString()
        document.getElementById('custom-move').value = movePairStr + '. ' + colourStr + ' (' + moveStr + ')'
    }
}

function chessBoardWidth() {
    const width = screen.width
    if (width < 750) {
        return (Math.round(width*0.09)*10 < 500 ? Math.round(width*0.09)*10 : 500)
    }
    return (Math.round(width*0.45) < 500 ? Math.round(width*0.45) : 500)
}

function updateGameSourceField(gameSource) {
    if (gameSource === "Lichess") {
        document.getElementById("custom-game-source-lichess").classList.remove('hidden')
        document.getElementById("custom-game-source-pgn").classList.add('hidden')
    }
    else {
        document.getElementById("custom-game-source-lichess").classList.add('hidden')
        document.getElementById("custom-game-source-pgn").classList.remove('hidden')
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateGameSourceField("Lichess")
}, false)