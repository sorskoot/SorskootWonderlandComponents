# Sorskoot's Wonderland Components Collection

[![Build & Test](https://github.com/sorskoot/SorskootWonderlandComponents/actions/workflows/release-package.yml/badge.svg)](https://github.com/sorskoot/SorskootWonderlandComponents/actions/workflows/release-package.yml)  
[![Static Badge](https://img.shields.io/badge/NPM%20Package-npm-%23cc3534?logo=npm)](https://www.npmjs.com/package/@sorskoot/wonderland-components)  
[![Discord](https://img.shields.io/discord/238401268492533770?logo=discord&logoColor=white&label=Discord&color=%20%235865F2)](https://discord.gg/J3j43p8)  
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCce5_8Mm8ioo7PKPsTP93zQ?style=flat&logo=youtube)](https://youtube.com/sorskoot)  
[![Static Badge](https://img.shields.io/badge/sorskoot-website-blue)](https://timmykokke.com)

This repository contains a collection of components, utilities, and shaders that Sorskoot personally uses in his Wonderland Engine projects. This collection aims to help other developers quickly get started with their own projects by providing reusable code.

Components are added to [NPM](https://www.npmjs.com/package/@sorskoot/wonderland-components) to make it a bit easier to use the library.

## Components

### Core Components

- **SelfDestruct** - Destroys an object after a specified time. Perfect for temporary effects or objects.
- **DieAfterTime** - Similar to SelfDestruct but starts inactive by default, ideal for prefabs that need to be manually triggered.
- **FadeToBlack** - Creates screen transitions by fading to and from black (or any color). Useful for level transitions or scene changes.
- **Flipbook** - Animates textures from a sprite sheet. Great for animated effects, UI elements, or simple character animations.
- **SnapRotate** - Provides snap-based rotation for VR experiences. Helps reduce motion sickness by allowing users to rotate in fixed increments.
- **SnowParticles** - Creates a snow particle effect. Perfect for winter scenes or atmospheric effects.
- **StartStopAnimationOnActivate** - Controls animations based on object activation state. Useful for interactive elements.
- **Tags** - A lightweight tagging system for objects. Helps with object identification and filtering.
- **TeleportController** - Handles teleportation mechanics for VR experiences. Essential for comfortable VR locomotion.

### Simple Animations

- **SimpleAnimationBase** - Base class for simple animation components. Provides common functionality for animation components.
- **TweenPositionAnimation** - Animates an object's position between two points. Great for moving platforms, doors, or UI elements.
- **TweenScaleAnimation** - Animates an object's scale. Perfect for growing/shrinking effects or attention-grabbing UI.

### Input

- **InputManager** - Manages input from various sources. Provides a unified input system for your application.
- **KeyboardController** - Handles keyboard input for desktop experiences. Useful for testing or non-VR applications.

### Prefab System

- **PrefabBase** - Base class for creating prefab components. Provides common functionality for prefab management.

### Combat/Interaction

- **ShootBase** - Base component for shooting mechanics. Can be extended for various weapon types.

### Utilities

The library also includes various utility classes for:

- Coroutine management
- Mathematics helpers (Lerp, Noise, RNG)
- Object caching
- Signal systems
- Haptic feedback
- And much more!

## Deprecated

Some components are marked as deprecated and will be removed in future versions:

- **Prefab** - Use PrefabBase instead
- **PrefabStorage** - Use the new prefab system instead

For detailed information on how to use each component, please refer to the code documentation or the examples folder.
