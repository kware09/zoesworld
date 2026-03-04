# Zoe's World -- Product Requirements Document (PRD)

## Overview

**Product Name:** Zoe's World\
**Product Type:** Responsive web application (tablet-first)\
**Initial Deployment:** Local (no backend required)

Zoe's World is a playful reading-development application designed to
support Zoe's early reading progress through short, engaging
phonological games embedded in a calm, imaginative world.

The application should feel like **play, exploration, and reward**, not
structured learning.

The goal is to encourage **consistent daily engagement (5--10 minutes)**
with reading-related activities that strengthen foundational
phonological awareness skills.

------------------------------------------------------------------------

# Product Vision

Create a calm, engaging digital world where Zoe practices foundational
reading skills through playful mini-games while earning rewards that
unlock parts of her world.

The experience should: - Encourage voluntary participation - Reinforce
effort and persistence - Build confidence around reading - Provide
consistent micro-practice

The application must **avoid overstimulation** and instead promote calm
focus.

------------------------------------------------------------------------

# Primary Outcomes

The product should achieve the following outcomes:

1.  Encourage **5 sessions per week**
2.  Deliver **5--10 minute play sessions**
3.  Improve phonological awareness through structured games
4.  Reinforce reading confidence through visible progress

Success is defined as **consistent engagement and improved confidence**,
not test scores.

------------------------------------------------------------------------

# Target Users

## Primary User

**Zoe (Age 6)**

Characteristics: - Early reading delay - Previously avoidant but now
curious - Responds well to play, imagination, and rewards

Needs: - Success experiences - Clear feedback - Calm design - Short
activities

------------------------------------------------------------------------

## Secondary User

**Parent**

Needs: - Easy configuration - Ability to adjust difficulty - Progress
visibility - Reward tracking

------------------------------------------------------------------------

# Core Design Principles

## Calm Interaction

Avoid: - flashing animations - loud sounds - rapid transitions - time
pressure

Use: - soft animations - warm colours - gentle sound effects

------------------------------------------------------------------------

## Short Play Cycles

Activities should take: - **1--2 minutes per game** - **3 games per
session**

Total session length: **5--10 minutes**

------------------------------------------------------------------------

## Effort-Based Rewards

The system should reward: - participation - effort - completion

Avoid punishing incorrect answers.

------------------------------------------------------------------------

## Predictable Routine

Each session should follow a consistent structure:

Enter world\
↓\
Play 3 games\
↓\
Earn stars\
↓\
Decorate world\
↓\
Session complete

Predictability improves engagement.

------------------------------------------------------------------------

# Core Gameplay Loop

Daily play cycle:

Open Zoe's World\
↓\
Choose game\
↓\
Play short phonics game\
↓\
Earn star reward\
↓\
Decorate world\
↓\
Session complete

After **5 sessions**, Zoe receives a real-world reward.

------------------------------------------------------------------------

# Game Types (MVP)

## Game 1: Robot Talk

**Skill:** phoneme blending

Example prompt: c - a - t

Zoe chooses the correct image: - cat - cap - dog

Correct answer earns a star.

------------------------------------------------------------------------

## Game 2: Sound Ninja

**Skill:** sound deletion

Example prompt: Say "bat" without the "b"

Options: - at - bat - ba

Correct answer: at

------------------------------------------------------------------------

## Game 3: Word Explorer

**Skill:** decoding simple words

Example: map

Zoe taps sounds: m → a → p

Then blends the word.

------------------------------------------------------------------------

# World Progression Map

Treehouse\
↓\
Sunny Meadow\
↓\
Reading River\
↓\
Sound Mountain\
↓\
Story Forest

Each area unlocks after several sessions.

------------------------------------------------------------------------

# Reward System

1 game = 1 star

3 stars → decoration\
10 stars → animal unlock

After **5 sessions**: Reward unlocked (parent gives real-world reward).

------------------------------------------------------------------------

# Parent Control Panel

Accessible via hidden entry.

Shows:

Sessions this week\
Stars earned\
Words mastered\
Favourite game

Allows difficulty selection and reward settings.

------------------------------------------------------------------------

# Adaptive Difficulty

If success \> 80% over last 10 attempts → increase difficulty\
If success \< 50% → reduce difficulty

------------------------------------------------------------------------

# Word Mastery Tracking

States:

New\
Learning\
Practiced\
Mastered

Rules:

3 correct → Practiced\
5 correct → Mastered

------------------------------------------------------------------------

# Starter Word List

## CVC Words

cat\
dog\
sun\
map\
tap\
hat\
run\
sit\
cup\
bed\
pen\
pig\
log\
jam\
bat

## Digraph Words

ship\
shop\
chat\
chin\
thin\
bath\
rush\
wish

## Blend Words

frog\
flag\
trap\
spin\
clap\
plug\
stop

------------------------------------------------------------------------

# Session Structure

Enter Zoe's World\
↓\
Robot Talk\
↓\
Sound Ninja\
↓\
Word Explorer\
↓\
Earn stars\
↓\
Decorate world\
↓\
Session complete

Session length: **5--8 minutes**

------------------------------------------------------------------------

# MVP Scope

Version 1 should include: - world home screen - three phonics games -
star reward system - session tracking - parent reward trigger - simple
progress tracking

All progress stored locally.

------------------------------------------------------------------------

# Future Enhancements

Possible later additions:

-   voice recognition for reading aloud
-   adaptive learning AI
-   expanded worlds
-   printable worksheets
-   additional phonics games

These are not required for the MVP.

------------------------------------------------------------------------

# Success Criteria

The product succeeds if:

-   Zoe willingly plays the game
-   Zoe completes 4--5 sessions weekly
-   Zoe gains confidence sounding out words
