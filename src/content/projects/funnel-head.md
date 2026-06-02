---
title: "Funnel Head"
description: "Real-time guitar amplifier VST plugin with JUCE."
video: "https://www.youtube.com/embed/iBvjCU5gCls"
thumbnail: "../../assets/imgs/projects/funnel-head-thumbnail.png"
---
`"In the Industry, you're what we call a Funnel Head"`

This project implements a real-time guitar amplifier simulator **VST plugin** with a focus on **harmonic distortion** and cabinet emulation. The design combines **wave-shaping**, **parallel filter processing**, and **impulse response convolution** to replicate a guitar amplifier.

{% image "./funneldia.png", "Plugin Signal Flow Diagram" %}

The plugin's signal flow is encapsulated within a custom **JUCE DSP** processor class called `Funnel`. The audio input is first upsampled by a factor of 4 using the `juce::dsp::Oversampling` class, which handles the necessary low-pass filtering to prevent **aliasing**. A wave-shaping function is then applied, and the signal is upsampled again before a post-distortion gain is added.

{% image "./funnelalia.png", "Aliasing Analysis" %}

The core of the distortion is the **wave-shaping** algorithm, which maps input values to output values. Two functions were explored: a custom exponential function and the **hyperbolic tangent** function (tanh). The final plugin utilizes `tanh` for its more reliable behavior. Both functions primarily generate **odd harmonics**, which were confirmed through **FFT analysis**. 

The processed audio is then sent to a `BandSplitter` class, which separates the signal into two parallel processing chains using a **Linkwitz-Riley crossover filter**. This filter maintains a flat frequency response when the high and low bands are summed. Variable gain controls are applied to each band, and the signals are then recombined. 

The plugin successfully simulates an amp with low latency. The **multi-band EQ** provides detailed tone shaping, and oversampling effectively prevents aliasing.