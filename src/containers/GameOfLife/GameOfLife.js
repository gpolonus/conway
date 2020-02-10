
import React, { Component, Fragment } from 'react';
import GameControls from '../GameControls/GameControls';
import Grid from '../../components/Grid/Grid';
import Cells from '../../objects/Cells';

export default class GameOfLife extends Component {
  constructor({ size }) {
    super();
    const cells = new Cells();
    cells.fill(size);
    this.state = {
      cells: cells,
      saved: '',
      running: false
    };
  }

  toggleRun = () => {
    this.setState(prev => ({running: !prev.running}));
  }

  toggle = (i, j) => {
    const cells = this.state.cells.copy();
    const cell = cells.get(i, j);
    cells.set(1 - cell, i, j);
    this.setState({ cells: cells, running: false});
  }

  componentDidUpdate() {
    if (this.state.running) {
      setTimeout(() => {
        this.setState(({ cells }) => ({ cells: this.runGeneration(cells) }));
      }, 50);
    }
  }

  runGeneration(cells) {
    const newCells = cells.map((cell, i, j) => {
      return this.checkCell(cells, i, j);
    })

    // // check outer rim
    // Array(cells.length + 1).fill().map((_, i) => {
    //   // top

    //   // bottom
    //   // left
    //   // right
    // });

    return newCells;
  }

  checkCell(cells, i, j) {
    const n = this.getNeighbors(cells, i, j);
    const cell = cells.get(i, j);
    let ret = cell;
    if (cell === 1) {
      if (n < 2) {
        ret = 0;
      } else if (n === 2 || n === 3) {
        ret = 1;
      } else if (n >= 4) {
        ret = 0;
      }
    } else if (!cell && n === 3) {
      ret = 1;
    }
    return ret;
  }

  getNeighbors(cells, i, j) {
    let num = 0;
    num += cells.get(i, j + 1);
    num += cells.get(i, j - 1);
    num += cells.get(i - 1, j);
    num += cells.get(i - 1, j + 1);
    num += cells.get(i - 1, j - 1);
    num += cells.get(i + 1, j);
    num += cells.get(i + 1, j + 1);
    num += cells.get(i + 1, j - 1);
    return num;
  }

  step = () => {
    this.setState({ cells: this.runGeneration(this.state.cells), running: false });
  }

  getOutput = (cells = this.state.cells) => {
    return Object.values(cells.c).map(cellRow => Object.values(cellRow).join('')).join('');
  }

  setOutput = (value) => {
    const zi = this.state.cells.zeroIndex;
    const size = this.state.cells.count();
    const cells = this.state.cells.map((_, i, j) => value.charAt((i + zi) * size + j + zi) || 0);

    // const size = this.state.cells.count();
    // const cells = this.makeEmptyCells(size).map((cellRow, i) => {
    //   return cellRow.map((_, j) => {
    //     const cell = value.charAt(i * size + j);
    //     return cell === "" ? 0 : parseInt(value.charAt(i * size + j), 10);
    //   });
    // })
    this.setState({ cells });
  }

  save = () => {
    this.setState((prevState) => {
      const cells = prevState.cells;
      return {
        saved: this.getOutput(cells)
      };
    });
  }

  restore = () => {
    this.setOutput(this.state.saved);
  }

  clearGrid = () => {
    const cells = this.state.cells.map(() => 0);
    this.setState({ cells: cells });
  }

  random = (size = this.state.cells.count()) => {
    this.setState({cells: this.state.cells.map(_ => Math.round(Math.random())), running: false});
  }

  render() {
    return (
      <Fragment>
        <GameControls
          toggleRun={this.toggleRun}
          running={this.state.running}
          step={this.step}
          save={this.save}
          restore={this.restore}
          clearGrid={this.clearGrid}
          getOutput={this.getOutput}
          setOutput={this.setOutput}
          random={this.random}
          saved={this.state.saved}
        />
        <Grid cells={this.state.cells} toggle={this.toggle}/>
      </Fragment>
    );
  }
}