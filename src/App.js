import React, { Component } from 'react'
import ImgAnnotation from './Components/ImgAnnotation'


class App extends Component {

  constructor(props){
    super(props)
    this.state = { file: null }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    }, this.saveToLocal)
  }

  saveToLocal() {
    const local = this.state.file;
    sessionStorage.setItem('filename', JSON.stringify(local));
  }

  componentDidMount () {
    const fileName = sessionStorage.getItem('filename');
    if(fileName) {
      this.setState({file: JSON.parse(fileName) });
    }
  }

  
  

  render () {
    var Imgname = this.state.file;
    
    return (
      <div className="imageIn">
      <h1>Add Annotations to your Image</h1>
      
      <input type="file" onChange={this.handleChange}/>
              
      { this.state.file != null ? (
        <ImgAnnotation imgAnnotation={Imgname} />
        /*<img src={this.state.file} alt="hi"/> */
      ) : (<p>Please upload an image</p>)
      }
      <p>{Imgname}</p>
      
      </div>

    );
  }

}
export default App;