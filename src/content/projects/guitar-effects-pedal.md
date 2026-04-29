---
title: "Guitar Effects Pedal"
description: "Digital signal processing on STM32 hardware."
tags: ["DSP", "Embedded Systems", "Audio Processing"]
---
This project focuses on the development of a digital **guitar effects pedal** using a **micro-controller**. I explored **digital signal processing** techniques to apply a variety of effects to an electric guitar's audio signal in real-time.

The hardware, a **STM32F7-46NG** board with a **WM8994 audio codec**, provides a robust foundation for this work.

### Features
* Real-time processing with low latency.
* Touch-based GUI with precise parameter display.
* Effects: Delay, Flanger, Vibrato, Tremolo, WahWah, Distortion.
* Multiple concurrent effects.
* Simple, reprogrammable system architecture.

![Parameter Control Interface](/imgs/param_gtr.png)
![Main Effects Menu](/imgs/menu_gtr.png)

The hardware core is the **STM32F746NG** board with an **ARM Cortex-M7** processor for **DSP**. The integrated **WM8994** handles **A/D** and **D/A** conversion.

Firmware was developed in **C** for real-time efficiency. **DMA** automates audio data transfer, ensuring a continuous stream. The UI prioritises a simple, functional design with low processing overhead.

**I2C** is the communication protocol used to talk to the WM8994 audio codec. The *Effect* struct contains all data for a single effect, including its name, an array of its Parameters, and a pointer to the audio processing function.

The firmware's core logic is managed by two **DMA** callbacks:
`BSP_AUDIO_IN_HalfTransfer_CallBack()` and `BSP_AUDIO_IN_TransferComplete_CallBack()`

This **double buffering** ensures that while the audio codec is playing one buffer, another is filled with processed audio, preventing audible delays.

**All audio data is handled as a 16-bit signed integer (int16_t) format, which allows for processing on a range from -32,768 to 32,767.**