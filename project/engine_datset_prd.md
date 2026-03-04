Below is a **new PRD section** you can drop into your repo (for example `projects/phoneme_engine_prd.md`).

It reflects everything we discussed:

* phoneme engine
* success-first learning loop for Zoe
* 200-word dataset progression
* digraph handling
* ElevenLabs TTS integration
* outcome-driven design

This is written **for engineers but focused on outcomes**, not implementation detail.

---

# Zoe’s World – Phoneme Engine & Dataset PRD

## Overview

Zoe’s World is a calm, playful learning environment designed to support a young reader (age 6) in developing foundational phonological awareness through short, engaging games.

The **Phoneme Engine** is the core learning system powering the application. It generates reading activities dynamically from a structured phoneme dataset and adapts difficulty gradually to maintain confidence and consistent engagement.

The engine supports three core games:

* Robot Talk (phoneme blending)
* Sound Ninja (phoneme deletion)
* Word Explorer (phoneme decoding)

These games share a **single phoneme-based dataset and engine**, ensuring consistent learning progression and reducing implementation complexity.

The design prioritizes **success, confidence, and repetition**, which are critical for children developing early reading skills.

---

# Product Outcomes

The phoneme engine and dataset are designed to achieve the following outcomes:

### 1. Daily Engagement

Encourage **5–10 minutes of voluntary reading play**.

The app should feel like a game, not homework.

---

### 2. Phonological Awareness Development

Strengthen key reading foundation skills:

* phoneme blending
* phoneme segmentation
* phoneme deletion
* sound-to-word mapping

---

### 3. Confidence Through Success

The engine prioritizes **high probability of success**.

Word selection uses the ratio:

```
70% easy
20% learning
10% challenge
```

This ensures Zoe experiences frequent success while gradually increasing difficulty.

---

### 4. Gradual Skill Progression

Difficulty increases slowly through structured stages.

The goal is:

```
confidence → fluency → complexity
```

---

# Phoneme Engine Overview

The phoneme engine is responsible for:

* selecting appropriate words
* generating game rounds
* tracking mastery
* adapting difficulty
* producing phoneme prompts for TTS

The engine operates on **phoneme tokens**, not letters.

Example:

```
ship → sh - i - p
```

Not:

```
s - h - i - p
```

This ensures correct phonological instruction.

---

# Dataset Structure

The application uses a **200-item phoneme dataset** structured across five learning stages.

Each entry includes:

```
id
type
word or sentence
phonemes or tokens
stage
tags
```

Example word entry:

```json
{
  "id": "ship",
  "type": "word",
  "word": "ship",
  "phonemes": ["sh","i","p"],
  "stage": 2
}
```

Example sentence entry:

```json
{
  "id": "the_cat_ran",
  "type": "sentence",
  "text": "The cat ran",
  "tokens": ["the","cat","ran"],
  "stage": 5
}
```

---

# Dataset Progression

The dataset progresses through five stages aligned with phonics development.

---

# Stage 1 – CVC Words (60 words)

Purpose:

Build foundational blending ability.

Example:

```
cat
dog
sun
map
tap
hat
run
sit
cup
bed
```

Phoneme structure:

```
c - a - t
```

---

# Stage 2 – Initial Digraphs (40 words)

Introduce digraph sounds.

Digraphs are treated as **single phoneme tokens**.

Examples:

```
ship → sh - i - p
chat → ch - a - t
thin → th - i - n
```

---

# Stage 3 – Final Digraphs (40 words)

Introduce final digraph patterns.

Examples:

```
duck → d - u - ck
ring → r - i - ng
fish → f - i - sh
```

---

# Stage 4 – Consonant Blends (40 words)

Introduce consonant clusters.

Blends remain **separate phonemes**.

Example:

```
frog → f - r - o - g
```

Not:

```
fr - o - g
```

Examples:

```
frog
flag
trap
spin
clap
plug
```

---

# Stage 5 – Simple Sentences (20 sentences)

Introduce early fluency and comprehension.

Examples:

```
The cat ran
The dog sat
The ship is big
The frog can hop
```

---

# Game Generation

The phoneme engine dynamically generates game rounds from the dataset.

---

# Robot Talk

Purpose:

Train phoneme blending.

Prompt:

```
sh - i - p
```

Options:

```
ship
shop
chip
```

The player selects the correct word.

---

# Sound Ninja

Purpose:

Train phoneme deletion.

Prompt:

```
Say "ship" without "sh"
```

Correct result:

```
ip
```

If the result is not a real word it is presented as a **"robot word"**, preventing frustration.

---

# Word Explorer

Purpose:

Train phoneme decoding.

Example interaction:

```
m → a → p
```

Result:

```
map
```

Players tap phoneme tiles to construct the word.

---

# Word Selection Strategy

The engine selects words using weighted difficulty buckets.

```
70% familiar words
20% learning words
10% challenge words
```

This ensures the experience remains encouraging.

---

# Mastery Tracking

Each word tracks mastery.

Statuses:

```
New
Learning
Practiced
Mastered
```

Rules:

```
3 correct answers → Practiced
5 correct answers → Mastered
```

Mastered words appear less frequently.

---

# Stage Advancement

Progression to the next stage occurs when:

```
12+ words practiced or mastered
AND
≥75% success rate across recent attempts
```

Parents can override this in the parent panel.

---

# ElevenLabs Text-to-Speech Integration

Zoe’s World uses **ElevenLabs TTS** to produce clear phoneme prompts.

The phoneme engine outputs **phoneme sequences** that are converted into spoken prompts.

Example Robot Talk audio request:

```
"sh... i... p"
```

Spacing between phonemes should be slightly extended to allow clear sound separation.

---

# Audio Design Guidelines

TTS output should:

* emphasize phoneme clarity
* include slight pauses between sounds
* use a calm, friendly voice

Avoid:

* fast speech
* exaggerated prosody
* loud excitement

The audio should resemble a **patient reading coach**.

---

# Session Structure

Each session should follow a predictable pattern.

```
Enter Zoe's World
↓
Play 3 games
↓
Earn stars
↓
Decorate world
↓
Session complete
```

Session duration target:

```
5–8 minutes
```

---

# Reward System

```
1 game = 1 star
```

Rewards:

```
3 stars → decoration
10 stars → animal unlock
```

Parent reward:

```
5 sessions completed
```

---

# Design Principles

The phoneme engine must maintain:

### Calm Interaction

No pressure or time limits.

---

### High Success Rate

Words should feel achievable.

---

### Encouraging Feedback

Avoid negative feedback.

Use phrases like:

```
Nice try!
Let's try again.
Great listening!
```

---

# Future Extensions

Potential expansions include:

* adaptive AI difficulty
* voice recognition practice
* story-based quests
* expanded phoneme sets
* reading comprehension challenges

These are **not required for the MVP**.

---

# Success Criteria

The phoneme engine succeeds if:

* Zoe voluntarily plays the game
* Zoe completes sessions consistently
* Zoe gains confidence sounding out words

The goal is **joyful repetition and gradual skill growth**.

---

If you'd like, I can also create one more thing that would help your dev team a lot:

**A visual architecture diagram of the phoneme engine + game pipeline** (very helpful for Claude Code and developers).
