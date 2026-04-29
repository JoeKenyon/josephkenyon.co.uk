---
title: "Digital Box"
description: "A hybrid acoustic-digital string instrument."
tags: ["Instrument Design", "Max-MSP", "Sound Synthesis"]
videoUrl: "https://www.youtube.com/embed/VjRkfHHMrPk"
---
I have a deep interest in the guitar, which inspired me to design a string-based instrument. I wanted to build an instrument that blends acoustic textures with synthesised digital sounds. To achieve this, I created both a physical and a digital component.

Drawing inspiration from Indian classical music, I explored the concepts of drones, microtones, and pitch bends in my design. Indian classical music often uses a tanpura to provide a constant drone that accompanies the melody played on other instruments (like the sitar). I wanted my instrument to produce a slow moving ambient drone, with the strings acting as both the sound source for the melody and as a controller for the synth.

### Box
The physical component of the instrument is a slab of wood fitted with strings tuned to Ab minor sus4 (an open tuning) and includes a pickup, along with tone and volume controls. This design comprised of 5 main components:

1. The Bridge: Holds the strings securely on the wooden base.
2. The Strings: Plucked to generate sound.
3. The Tuners: Used to tighten or loosen the strings.
4. The Pickup: Captures the acoustic vibrations.
5. The Wood: Acts as a stable base for all the components.

![Design View 1](/imgs/Pasted%20image%2020260219175142.png)
![Design View 2](/imgs/Pasted%20image%2020260219175156.png)
![Design View 3](/imgs/Pasted%20image%2020260219175229.png)

This is the final design of the digital_box with labels... the design was also very portable, making it easy to setup for performance.

### Max-MSP
The digital component was created using MAX-MSP, a visual programming language used to create audio and multimedia applications.

The parameters of the various synth layers are changed to create an ambient drone that responds to the way you play the box.

![Max MSP Patch](/imgs/Pasted%20image%2020260219175003.png)

### Conclusion
My primary goal was to create a drone instrument inspired by Indian classical music that allows for melodies to be played on-top, I believe this was successfully achieved...

Overall, this project gave me a deeper understanding of musical instruments and how when designing them, the ability to express ones self is very important.