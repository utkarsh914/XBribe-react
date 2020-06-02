import React from 'react';

export default function UploadPreview(props) {
  let style = {
    minHeight: '100vh', width: '100vw',
    background: 'rgba(0,0,0,0.85)',
    position: 'fixed',
    left: 0, top: 0,
    zIndex: 100
  }

  let imgStyle = {
    // maxWidth: '400px',
    maxHeight: '50vh',
  }

  let previewSrc
  if (props.fileType==='pics') previewSrc = props.filesCurrentlyUploading
  else if (props.fileType==='audios') previewSrc = '/images/icons/audio.png'
  else if (props.fileType==='videos') previewSrc = '/images/icons/video.png'

  return (
    <section className="container-fluid text-center d-flex align-items-center justify-content-center py-5 m-0" id="intro" style={style}>
      <div className="">
        <img className="mb-3" alt="img" src={previewSrc} style={imgStyle}/>
        <div style={{width: '100%'}}>
          <progress value={props.percentage} max="100" id="progress" style={{minWidth: '300px', width: '35vw'}}></progress>
        </div>
        
      </div>
    </section>
  )

}