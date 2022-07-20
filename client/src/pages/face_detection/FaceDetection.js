import './faceDetection.css'
import React, { useEffect, useRef } from 'react';
import { TopBar } from '../../components/topbar/topBar';
import * as faceapi from 'face-api.js'

export default function FaceDetection() {

    const publicFolder= process.env.REACT_APP_LOAD_FACES;

    function loadLabeledImages () {
        const labels = ["Salman Khan"]

        return Promise.all(
            labels.map(async label =>{
                const descriptions = [];
                for(let i=1; i<=2; i++){
                    const img = await faceapi.fetchImage(`http://localhost:8080/faces/${label}/${i}.jpg`);

                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                    descriptions.push(detections.descriptor);
                }

                return new faceapi.LabeledFaceDescriptors(label, descriptions)

            })
        )
    }

    const imgRef =  useRef()
    const canvasRef = useRef()
    const loadImg = useRef()

    const detectFace = async ()=>{

        const LabeledFaceDescriptors = await loadLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);


        const image = await faceapi.bufferToImage(imgRef.current.files[0])

        const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
        
        if(detections!= undefined){
            
            loadImg.current.src = image.src
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(image);
            const displaysize = {width: image.width, height:image.height}
            // console.log(canvas);
            console.log(canvasRef.current);
            faceapi.matchDimensions(canvasRef.current, displaysize);
            
            
            const resizedDetections = faceapi.resizeResults(detections, displaysize);
            console.log(resizedDetections)

            const result = faceMatcher.findBestMatch(resizedDetections.descriptor);

            console.log(result);

            const drawbox = new faceapi.draw.DrawBox(detections.detection.box, {label: result.toString() });
    
            drawbox.draw(canvasRef.current)
        }else{
            loadImg.current.alt = "cannot read face of such images"
        }

    }
    const handleImage = async ()=>{
        console.log("loaded");

        // const detections = await faceapi.detectSingleFace(imgRef.current, new faceapi.TinyFaceDetectorOptions() )
        // .withFaceLandmarks()
        // .withFaceDescriptor();

        // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
        
        // faceapi.matchDimensions(canvasRef.current, { width:600, height: 450 })
        // const resized = faceapi.resizeResults(detections, { width: 600, height: 450});
        // faceapi.draw.drawDetections(canvasRef.current, resized);
    }

    useEffect(()=>{
        const loadModels = ()=>{
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
            ]).then(handleImage)
            .catch(e => console.log(e));
        };
        // imgRef.current && loadModels();
        // console.log(imgRef.current);
        loadModels();

    },[])

  return (
      <>
        <TopBar />
            <h1>Face Detection page...</h1>
            <input type="file" ref={imgRef} onChange={detectFace} />
        <div className='faceContainer' >
            {/* <img
            crossOrigin='anonymous'
            ref = {imgRef}
            src="https://media.istockphoto.com/photos/excited-woman-wearing-rainbow-cardigan-picture-id1327495437?b=1&k=20&m=1327495437&s=170667a&w=0&h=Vbl-XLyAnBoTkyGXXi-X1CFzuSHlNcn-dqB-sCosxFo=" alt="" 
            width= "600"
            height = "450" 
            /> */}
            <img src="" alt="" className='loadImage' ref={loadImg} />
            <canvas ref={canvasRef} ></canvas>
            
        </div>
      </>
  )
}
