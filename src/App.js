import React from 'react';
import logo from './logo.svg';
import './App.css';
import XLSX from 'xlsx';

class App extends React.Component{
  constructor(){
    super(...arguments)
    this.upload = null
  }

  handleFile(e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var first_sheet_name = workbook.SheetNames[0];
      var address_of_cell = 'A1';
      var worksheet = workbook.Sheets[first_sheet_name];
      var desired_cell = worksheet[address_of_cell];
      var desired_value = (desired_cell ? desired_cell.v : undefined);
      var ret = XLSX.utils.sheet_to_json(worksheet)
      console.log(ret)
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(f);
  }

  componentDidMount(){
    this.upload && this.upload.addEventListener('change', this.handleFile, false)
  }

  render(){
    return <div className="App">
        <input type='file' ref={ref => this.upload = ref} />
      </div>
  }
}

export default App;
