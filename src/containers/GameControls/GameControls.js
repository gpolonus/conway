
import React from 'react';

export default ({toggleRun, running, step, save, restore, clearGrid, getOutput, setOutput, saved, random}) => {
  return (
    <div>
      <button onClick={toggleRun}>{running ? 'Stop' : 'Run'}</button>
      <button onClick={step}>Step</button>
      <button onClick={save}>Save</button>
      <button onClick={restore} disabled={saved === ''}>Restore</button>
      <button onClick={random}>Random</button>
      <button onClick={clearGrid}>Clear</button>
      <div style={{padding: '10px 0'}}><textarea value={getOutput()} onChange={event => setOutput(event.target.value)}></textarea></div>
      <div>{getOutput().length}</div>
    </div>
  );
}