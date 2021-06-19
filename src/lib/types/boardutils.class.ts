import type {Turn, BoardState} from "$lib/types/board.interface";
import type {Player} from "$lib/types/player.interface";
import type {Board, Move} from "../types";

class BoardUtils {

    public static MINIMUM_LINE_TO_SCORE = 4;

    moveIsValid(board: Board, col: number): Move | false
    {
        const line = board[col].indexOf('');
        return !(
            col >= board.length || col < 0
            || line < 0 || line >= board[col].length
        ) ? [col, line] : false;
    }

    gameWon(board: Board, move: Move): number | false
    {

        // Count max aligned tiles on lines after the move
        function countOnDirection(board: Board, col: number, line: number, iDelta: number, jDelta: number) {

            if (![-1, 0, 1].includes(iDelta)) throw Error("countOnDirection: wrong parameters. Abort, hoy hoy! (aka iDelta parameter failed : " + iDelta + ")");
            if (![-1, 0, 1].includes(jDelta)) throw Error("countOnDirection: wrong parameters. Abort, hoy hoy! (aka jDelta parameter failed : " + jDelta + ")");

            const playerTile = board[col][line];
            let i = col + iDelta, j = line + jDelta;
            let playerLine = 0;
            while ( i >= 0 && i < board.length &&
            j >= 0 && j < board[i].length &&
            board[i][j] === playerTile) {

                playerLine++;
                i += iDelta;
                j += jDelta;
            }
            return playerLine;
        }

        function countHorizontalLine(board: Board, col:number, line: number) {

            if (!Array.isArray(board)) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka board parameter failed : " + board + ")");
            if (col < 0 || col >= board.length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka col parameter failed : " + col + ")");
            if (line < 0 || line >= board[col].length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka line parameter failed : " + line + ")");

            let playerLine = 1;
            // Right
            if (col < board.length) {
                playerLine += countOnDirection(board, col, line, 1, 0);
            }
            // To the left
            if (col >= 0) {
                playerLine += countOnDirection(board, col, line, -1, 0);
            }
            return (playerLine >= BoardUtils.MINIMUM_LINE_TO_SCORE ? playerLine : 0);
        }

        function countVerticalLine(board: Board, col: number, line:number) {
            let playerLine = 1;
            // Up
            if (line < board[col].length) {
                playerLine += countOnDirection(board, col, line, 0, -1);
            }
            // Down
            if (line >= 0) {
                playerLine += countOnDirection(board, col, line,  0, 1);
            }
            return (playerLine >= BoardUtils.MINIMUM_LINE_TO_SCORE ? playerLine : 0);
        }

        function countDiagDown(board: Board, col: number, line: number) {
            let playerLine = 1;
            // Up Left
            if (line < board[col].length && col >= 0) {
                playerLine += countOnDirection(board, col, line, 1, -1);
            }
            // Down Right
            if (line >= 0 && col < board.length) {
                playerLine += countOnDirection(board, col, line, -1, 1);
            }
            return (playerLine >= BoardUtils.MINIMUM_LINE_TO_SCORE ? playerLine : 0);
        }

        function countDiagUp(board: Board, col: number, line:number) {
            let playerLine = 1;
            // Down Left
            if (line >= 0 && col >= 0) {
                playerLine += countOnDirection(board, col, line, -1, -1);
            }
            // Up Right
            if (line < board[col].length && col < board.length) {
                playerLine += countOnDirection(board, col, line, 1, 1);
            }
            return (playerLine >= BoardUtils.MINIMUM_LINE_TO_SCORE ? playerLine : 0);
        }

        const [col, line] = move;

        if (col < 0 || col >= board.length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka col parameter failed : " + col + ")");
        if (line < 0 || line >= board[col].length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka line parameter failed : " + line + ")");

        let playerScore = 0;
        playerScore += countHorizontalLine(board, col, line);
        playerScore += countVerticalLine(board, col, line);
        playerScore += countDiagDown(board, col, line);
        playerScore += countDiagUp(board, col, line);

        return playerScore;
    }

    nextTurn(state: BoardState, move: Move): BoardState {

        const previousTurn = Object.assign({}, state.current);
        previousTurn.move = [...move];
        const nextMemory = [...state.memory, previousTurn];

        const nextBoard = this.deepCopyBoard(previousTurn.board);
        nextBoard[move[0]][move[1]] = previousTurn.player.tile;

        const nextTurn: Turn = {
            player: state.nextPlayer(),
            board: nextBoard,
            move: [null,null],
            freeSlots: previousTurn.freeSlots--,
        }

        const newState = Object.assign({}, state);
        newState.memory = nextMemory;
        newState.current = nextTurn;
        return newState;
    }

    newGameBoard(height: number, width: number, players: Player[]): BoardState {
        const blankState: BoardState = {
            height,
            width,
            memory: [],
            players: (function* (players){
                const turns = players;
                let index = 0;
                while(true){
                    const player: Player = turns[index];
                    yield player;
                    index = (index + 1) % turns.length;
                }
            })(players),
            nextPlayer: function() {return this.players.next().value},
            current: {
                player: null,
                board: this.getCleanBoard(height, width),
                move: [null,null],
                freeSlots: height*width,
            },
        };
        blankState.current.player = blankState.nextPlayer();

        return blankState;
    }

    getCleanBoard(height: number, width: number): Board {
        let cleanBoard = Array(width).fill(null);
        cleanBoard = cleanBoard.map((column) => Array(height).fill(''));
        return cleanBoard;
    }

    deepCopyBoard(board: Board): Board{
        return board.slice().map( (col) => col.slice());
    }
}

export const boardUtils = new BoardUtils();
