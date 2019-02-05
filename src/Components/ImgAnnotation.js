import React, { Component } from 'react'
import Annotation from 'react-image-annotation'
import { RectangleSelector } from 'react-image-annotation/lib/selectors'

var textData = [];

const Box = ({ children, geometry, style }) => (
  <div
    style={{
      ...style,
      position: 'absolute',
      left: `${geometry.x}%`,
      top: `${geometry.y}%`,
      height: `${geometry.height}%`,
      width: `${geometry.width}%`
    }}
  >
    {children}
  </div>
)


function renderHighlight ({ annotation, active }) {
  const { geometry } = annotation
  if (!geometry) return null

  return (
    <Box
      key={annotation.data.id}
      geometry={geometry}
      style={{
        color: 'red',
        fontSize: '25px',
        border: 'solid 1px white',
        /*
        boxShadow: active
          && '0 0 20px 20px rgba(255, 255, 255, 0.3) inset', */
      }}
    >
      {annotation.data.text}
    </Box>
  )
}

class ImgAnnotation extends Component {
  state = {
    annotations: [],
    annotation: {},
    type: RectangleSelector.TYPE
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    }, this.saveToLocal)
  }

  saveToLocal() {
    const local = this.state.annotations;
    sessionStorage.setItem('annotationsdata', JSON.stringify(local));
    this.getAnnotationText();
  }


  componentDidMount () {
    const annotationsData = sessionStorage.getItem('annotationsdata');
    if(annotationsData) {
      this.setState({annotations: JSON.parse(annotationsData) });
      this.getAnnotationText();
    }
  
  }

  getAnnotationText(){
      const allannotationData = JSON.parse(sessionStorage.getItem('annotationsdata'));
      
      for(var x = 0; x < allannotationData.length; x++) {
        textData[x] = allannotationData[x].data['text'];
      }
  } 

  showAnnotationText(){
    return (
    textData.map((textData) =>
    <li key={Math.random()}>{textData}</li>
    )
    )
  }


  render () {

    return (

      <div>

      <br />
      <br />
      <Annotation
        //src={"https://i.imgur.com/Fk1T0pN.png"}
        src={this.props.imgAnnotation}
        alt='Two pebbles anthropomorphized holding hands'

        annotations={this.state.annotations}

        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        renderHighlight={renderHighlight}

      />
      <p>{this.showAnnotationText()}</p>
      
     

      </div>
    )
  }
}

export default ImgAnnotation;