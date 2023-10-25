import React from 'react';
import BarChart from './components/BarChart';

function App() {

  //dummy data
  const data = [45, 85, 32, 90, 110, 33, 230];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
  const theme = { barColor: 'green', labelColor: 'black' };
  const theme2 = { barColor: 'blue', labelColor: 'red' };
  const theme3 = { barColor: 'black', labelColor: 'purple' };
  const data1 = [6566, 100, 2333, 567, 10000];
  const labels1 = ['Q1', 'Q2', 'Q3', 'Q4', 'Q1'];

  return (
    <div className="App">
      <h1>My Bar Chart Demo</h1>
      <BarChart data={data} labels={labels} theme={theme}/> 
      <BarChart data={data1} labels={labels1} theme={theme3}/>
      <BarChart data={data} labels={labels} horizontal={true} theme={theme2}/>
      <BarChart data={data1} labels={labels1} horizontal={true} theme={theme3}/>
    </div>
  );
}

export default App;
