---
title: Engine Audio
video: https://www.youtube.com/embed/DyfLkTeAsn4?si=k7Pa6HTe4oPhSYSy
thumbnail: "../../assets/imgs/projects/Pasted image 20260219173509.png"
---
This project involved the redevelopment and analysis of a procedural audio engine sound model originally implemented in the Web Audio framework. The primary goal was to create a cross-platform, functionally equivalent C++ version of the model and document its underlying theoretical foundations, which had not been previously available.

A multi-stage methodology was employed, beginning with a reverse-engineering phase in Max/MSP to deconstruct the existing model and understand its logic. This was a crucial step, as it revealed that the overtone synthesis component in the original [Nemisindo](https://nemisindo.com/) model was inactive, a discovery that would have been difficult to make through code analysis alone. The process provided a robust foundation for the subsequent implementation phase.

![Max/MSP reverse engineering logic](../../assets/imgs/projects/Pasted%20image%2020260219173509.png)

The model was then prototyped in the JUCE C++ framework to address specific technical challenges, such as class architecture and memory management. A key achievement was the development of a custom delay line class to properly handle "space-warping," a technique used to introduce non-linearities by modulating delay times within a digital waveguide. This was necessary because the standard DSP library's delay line class was not designed to independently read delayed samples without advancing the read pointer, a function critical for replicating the original model's behaviour.

![C++ Implementation architecture in JUCE](../../assets/imgs/projects//Pasted%20image%2020260219173207.png)

The C++ reimplementation, which was compiled into a WebAssembly module for web deployment, was evaluated against the original Web Audio model. This comparative analysis revealed subtle sonic discrepancies between the two versions, primarily attributed to differences in how biquad filters behave across different audio frameworks. This finding highlights a significant challenge in cross-platform audio development: achieving exact sonic equivalence is not guaranteed even when code is functionally identical.

Additionally, an experimental custom engine model was developed. This model demonstrated a more efficient design by using the engine vibration signal to directly modulate delay times, showcasing a potential path toward a more computationally lightweight implementation.

![Custom engine Web Audio UI](../../assets/imgs/projects/Pasted%20image%2020260219173232.png)

![Spectral analysis of engine models](../../assets/imgs/projects/Pasted%20image%2020260219173251.png)

![Waveform comparison of engine models](../../assets/imgs/projects/Pasted%20image%2020260219173302.png)

Future work could involve a more rigorous subjective evaluation of the models using user studies or blind listening tests to gather valuable qualitative data on perceived realism and quality. 

The project also identified the potential for enhancing the model's control by introducing higher-level parameters that map directly to engine characteristics, such as Cylinder Number and Exhaust Length, as explored in Baldan's work. Finally, incorporating effects like car cabin acoustics via convolution reverb would greatly enhance the model's realism for applications like driving games.
