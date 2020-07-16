import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }
    render() {
        return (
            <section className="field">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </section>
        );
    }

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>

    }

}
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current
            .squares
            .slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext
            ? 'X'
            : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move
                ? 'Go to move #' + move
                : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext
                ? 'X'
                : 'O');
        }
        return (
            <main className="game">

                <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>

                <section className="game-info">
                    <h2 className="status">{status}</h2>
                    <ol>{moves}</ol>
                </section>
            </main>
        );
    }
}
function calculateWinner(squares) {
    const lines = [
        [
            0, 1, 2
        ],
        [
            3, 4, 5
        ],
        [
            6, 7, 8
        ],
        [
            0, 3, 6
        ],
        [
            1, 4, 7
        ],
        [
            2, 5, 8
        ],
        [
            0, 4, 8
        ],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,
            b,
            c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
export default Game;