import React, { Component } from "react";

export default class RoboticsImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1120"
        height="829.80067"
        viewBox="0 0 1120 829.80067"
      >
        <title>robotics and reinforcement learning</title>

        {/* Ground shadow */}
        <ellipse
          cx="560"
          cy="800"
          rx="400"
          ry="25"
          fill={theme.text}
          opacity="0.1"
        />

        {/* Base platform */}
        <rect
          x="400"
          y="650"
          width="320"
          height="40"
          rx="5"
          fill={theme.dark}
        />
        <rect
          x="420"
          y="640"
          width="280"
          height="20"
          rx="3"
          fill={theme.text}
        />

        {/* Robot arm base */}
        <circle cx="560" cy="640" r="45" fill={theme.jacketColor} />
        <circle cx="560" cy="640" r="35" fill={theme.dark} />
        <circle cx="560" cy="640" r="15" fill={theme.imageHighlight} />

        {/* First arm segment */}
        <rect
          x="540"
          y="480"
          width="40"
          height="160"
          rx="8"
          fill={theme.text}
        />
        <circle cx="560" cy="480" r="25" fill={theme.jacketColor} />
        <circle cx="560" cy="480" r="15" fill={theme.imageHighlight} />

        {/* Second arm segment */}
        <g transform="rotate(-25 560 480)">
          <rect
            x="540"
            y="340"
            width="40"
            height="140"
            rx="8"
            fill={theme.imageHighlight}
          />
          <circle cx="560" cy="340" r="25" fill={theme.jacketColor} />
          <circle cx="560" cy="340" r="15" fill={theme.text} />
        </g>

        {/* Gripper/End effector */}
        <g transform="translate(520, 280)">
          <rect
            x="20"
            y="0"
            width="40"
            height="30"
            rx="5"
            fill={theme.jacketColor}
          />
          {/* Left gripper finger */}
          <rect x="15" y="25" width="15" height="45" rx="3" fill={theme.dark} />
          {/* Right gripper finger */}
          <rect x="70" y="25" width="15" height="45" rx="3" fill={theme.dark} />
        </g>

        {/* Object being held */}
        <rect
          x="545"
          y="315"
          width="30"
          height="30"
          rx="5"
          fill={theme.compImgHighlight}
          stroke={theme.imageHighlight}
          strokeWidth="2"
        />

        {/* Neural network visualization */}
        <g transform="translate(150, 100)">
          {/* Input layer */}
          <circle
            cx="50"
            cy="100"
            r="20"
            fill={theme.imageHighlight}
            opacity="0.7"
          />
          <circle
            cx="50"
            cy="180"
            r="20"
            fill={theme.imageHighlight}
            opacity="0.7"
          />
          <circle
            cx="50"
            cy="260"
            r="20"
            fill={theme.imageHighlight}
            opacity="0.7"
          />

          {/* Hidden layer 1 */}
          <circle
            cx="180"
            cy="80"
            r="20"
            fill={theme.jacketColor}
            opacity="0.7"
          />
          <circle
            cx="180"
            cy="150"
            r="20"
            fill={theme.jacketColor}
            opacity="0.7"
          />
          <circle
            cx="180"
            cy="220"
            r="20"
            fill={theme.jacketColor}
            opacity="0.7"
          />
          <circle
            cx="180"
            cy="290"
            r="20"
            fill={theme.jacketColor}
            opacity="0.7"
          />

          {/* Hidden layer 2 */}
          <circle cx="310" cy="100" r="20" fill={theme.text} opacity="0.7" />
          <circle cx="310" cy="180" r="20" fill={theme.text} opacity="0.7" />
          <circle cx="310" cy="260" r="20" fill={theme.text} opacity="0.7" />

          {/* Output layer */}
          <circle
            cx="440"
            cy="140"
            r="20"
            fill={theme.compImgHighlight}
            opacity="0.7"
          />
          <circle
            cx="440"
            cy="220"
            r="20"
            fill={theme.compImgHighlight}
            opacity="0.7"
          />

          {/* Connections - Input to Hidden1 */}
          <line
            x1="70"
            y1="100"
            x2="160"
            y2="80"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="70"
            y1="100"
            x2="160"
            y2="150"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="70"
            y1="180"
            x2="160"
            y2="150"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="70"
            y1="180"
            x2="160"
            y2="220"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="70"
            y1="260"
            x2="160"
            y2="220"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="70"
            y1="260"
            x2="160"
            y2="290"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Connections - Hidden1 to Hidden2 */}
          <line
            x1="200"
            y1="80"
            x2="290"
            y2="100"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="150"
            x2="290"
            y2="100"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="150"
            x2="290"
            y2="180"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="220"
            x2="290"
            y2="180"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="220"
            x2="290"
            y2="260"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="200"
            y1="290"
            x2="290"
            y2="260"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Connections - Hidden2 to Output */}
          <line
            x1="330"
            y1="100"
            x2="420"
            y2="140"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="330"
            y1="180"
            x2="420"
            y2="140"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="330"
            y1="180"
            x2="420"
            y2="220"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
          <line
            x1="330"
            y1="260"
            x2="420"
            y2="220"
            stroke={theme.text}
            strokeWidth="1.5"
            opacity="0.3"
          />
        </g>

        {/* Control panel display */}
        <g transform="translate(750, 150)">
          <rect
            x="0"
            y="0"
            width="300"
            height="200"
            rx="10"
            fill={theme.compImgHighlight}
          />
          <rect
            x="10"
            y="10"
            width="280"
            height="180"
            rx="5"
            fill={theme.dark}
          />

          {/* Display lines */}
          <line
            x1="30"
            y1="40"
            x2="270"
            y2="40"
            stroke={theme.imageHighlight}
            strokeWidth="3"
          />
          <line
            x1="30"
            y1="70"
            x2="200"
            y2="70"
            stroke={theme.text}
            strokeWidth="3"
          />
          <line
            x1="30"
            y1="100"
            x2="250"
            y2="100"
            stroke={theme.jacketColor}
            strokeWidth="3"
          />

          {/* Reward curve */}
          <polyline
            points="30,160 60,150 90,145 120,135 150,125 180,120 210,118 240,117 270,115"
            fill="none"
            stroke={theme.imageHighlight}
            strokeWidth="3"
          />
        </g>

        {/* RL symbols */}
        <g transform="translate(750, 400)">
          {/* State circle */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke={theme.imageHighlight}
            strokeWidth="3"
          />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill={theme.imageHighlight}
            fontSize="24"
            fontFamily="Arial"
          >
            S
          </text>

          {/* Action arrow */}
          <path
            d="M 100 50 L 180 50 L 165 40 M 180 50 L 165 60"
            fill="none"
            stroke={theme.jacketColor}
            strokeWidth="3"
          />
          <text
            x="140"
            y="35"
            textAnchor="middle"
            fill={theme.jacketColor}
            fontSize="18"
            fontFamily="Arial"
          >
            A
          </text>

          {/* Reward circle */}
          <circle
            cx="230"
            cy="50"
            r="35"
            fill="none"
            stroke={theme.text}
            strokeWidth="3"
          />
          <text
            x="230"
            y="60"
            textAnchor="middle"
            fill={theme.text}
            fontSize="24"
            fontFamily="Arial"
          >
            R
          </text>
        </g>

        {/* Camera/Sensor */}
        <g transform="translate(320, 350)">
          <rect x="0" y="0" width="60" height="50" rx="5" fill={theme.dark} />
          <circle cx="30" cy="25" r="18" fill={theme.imageHighlight} />
          <circle cx="30" cy="25" r="10" fill={theme.dark} />

          {/* Vision rays */}
          <line
            x1="30"
            y1="25"
            x2="200"
            y2="-50"
            stroke={theme.imageHighlight}
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="5,5"
          />
          <line
            x1="30"
            y1="25"
            x2="200"
            y2="25"
            stroke={theme.imageHighlight}
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="5,5"
          />
          <line
            x1="30"
            y1="25"
            x2="200"
            y2="100"
            stroke={theme.imageHighlight}
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="5,5"
          />
        </g>

        {/* Tactile sensor indicators */}
        <circle cx="545" cy="320" r="5" fill={theme.imageHighlight}>
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="575" cy="320" r="5" fill={theme.imageHighlight}>
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  }
}
