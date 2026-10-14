---
name: Reogent
description: A spatially aware AI agent grounded in real UBC data
thumbnail: /projects/reogent/1.png
thumbnailPosition: center
github: ChakornK/reogent-archive
skills: Next.js, React, TypeScript, Tailwind CSS, MapLibre GL, deck.gl, Amazon Bedrock, Amazon Cognito, Amazon OpenSearch, Amazon DynamoDB, Amazon S3, AWS Lambda, AWS CDK
stack:
  Frontend: [TypeScript, Next.js, React, Tailwind CSS]
  Map: [MapLibre GL, deck.gl]
  AI: [Amazon Bedrock]
  Auth: [Amazon Cognito, Google OAuth]
  Data: [Amazon OpenSearch, Amazon DynamoDB, Amazon S3]
  Infrastructure: [AWS Lambda, Amazon CloudFront, AWS CDK]
---

We built Reogent at the 2026 UBC CIC Hackathon, a six-hour event focused on Amazon Web Services and AI-assisted software development. I worked with @github(maxlbchung) and @github(aljwmvv) to create an AI agent that helps UBC students find courses, compare tuition, locate campus services, and plan walking routes using indexed university data.

![Reogent landing page](/projects/reogent/1.png)

## Inspiration

UBC students often have to search separate systems for courses, tuition, academic dates, events, study spaces, parking, and campus directions. New students face an extra challenge: even when they find the right building, they still need to work out how to get there.

Reogent brings those tasks into one conversation. Its agent grounds answers in UBC datasets and pairs spatial results with an interactive campus map.

## Features

### Grounded AI Chat

Reogent runs a tool-calling agent through Amazon Bedrock and Claude. The agent can use 16 tools across 11 data modules to search the course catalogue, section schedules, tuition rates, admissions requirements, student costs, key dates, campus places, parking, study spaces, events, and UBC webpages. Tool results feed back into the conversation before the agent writes its answer.

Conversations stream to the interface and persist in DynamoDB, so students can return to earlier sessions.

![AI chat page](/projects/reogent/2.png)

### Interactive Campus Map

A MapLibre GL and deck.gl map opens beside the chat when a response has a spatial result. The map renders UBC building data from GeoJSON and gives students visual context without taking them out of the conversation.

![AI chat with the campus map open](/projects/reogent/3.png)

### Walking Route Navigation

For directions, Reogent computes the shortest path across a pedestrian network with Dijkstra's algorithm. It returns the distance and estimated walking time, highlights the origin and destination, and draws the route on the map.

![AI chat with a walking route on the campus map](/projects/reogent/4.png)

## AWS Architecture

Amazon Cognito handles Google sign-in. OpenSearch indexes the campus datasets, S3 stores source data and GeoJSON layers, and DynamoDB stores chat sessions. The Next.js application runs on AWS Lambda behind CloudFront, with AWS CDK defining the deployment.
