document.addEventListener('DOMContentLoaded', function() {
    drawBoard('')
}, false)

async function updateBoard(event) {
    const file = event.target.files.item(0)
    const text = await file.text()
    drawBoard(text)
}

function drawBoard(pgnStr) {
    PGNV.pgnView('board', { pgn: pgnStr, pieceStyle: 'merida', boardSize: chessBoardWidth(), theme: 'blue' })
}

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