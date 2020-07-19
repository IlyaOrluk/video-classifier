import * as ml5 from 'ml5'
import p5 from 'p5'

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier

// A variable to hold the image we want to classify
let video
let poseNet
let pose

let mobileNet

let videoClassifierResults

const init = (p) => {

  const modelReady = () => {
    console.log('Model Ready')
  }
  // A function to run when we get any errors and the results
  const gotResults = (error, results) => {
    // Display error in the console
    if (error) {
      console.error(error)
    } else {
      // The results are in an array ordered by confidence.
      console.log(results)
      videoClassifierResults = results
      mobileNet.predict(gotResults)
      


      // createDiv(`Label: ${results[0].label}`)
      // createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`)
    }
  }

  p.preload = function() {
    console.log('preload')

  }

  p.setup = function(VIDEO) {
    console.log('setup')
    p.createCanvas(640, 600)
    video = p.createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', getPoses)

    mobileNet = ml5.imageClassifier('MobileNet', video, modelReady)
  }

  function getPoses(poses) {
    pose = poses[0] && poses[0].pose
    // console.log(poses[0] && poses[0].pose)
  }

  function modelLoaded() {
    console.log('poseNet ready!')
    mobileNet.predict(gotResults)
  }

  p.draw = function() {
    console.log('draw')
    p.fill(0)
    p.rect(0,480,640,50)
    p.image(video,0,0)
    p.fill(255)
    p.textSize(24)
    p.text(videoClassifierResults && videoClassifierResults[0].label, 50, 520)
    // p.text(videoClassifierResults && videoClassifierResults[1].label, 50, 100)
    // p.text(videoClassifierResults && videoClassifierResults[2].label, 50, 150)
    // if(pose) {
    //   p.fill(255,0,0)
    //   p.circle(pose.nose.x, pose.nose.y, 30)
    //   p.fill(55,100,0)
    //   p.circle(pose.leftEye.x, pose.leftEye.y, 25)
    //   p.fill(55,100,0)
    //   p.circle(pose.rightEye.x, pose.rightEye.y, 25)
    //   p.fill(55,100,0)
    //   p.circle(pose.rightShoulder.x, pose.rightShoulder.y, 25)
    // } 
  }
}

const myp5 = new p5(init)






