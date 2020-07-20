import * as ml5 from 'ml5'
import p5 from 'p5'

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier

// A variable to hold the image we want to classify
let video
let poseNet

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
    mobileNet = ml5.imageClassifier('MobileNet', video, modelLoaded)
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
  }
}

const myp5 = new p5(init)






