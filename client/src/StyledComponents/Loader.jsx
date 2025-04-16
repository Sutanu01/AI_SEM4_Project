import React from "react";

const Loading = () => {
	return (
		<>
			<style>{`

        .loading {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          z-index: 9999;
        }

        .loading-text {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          width: 100%;
          height: 100px;
          line-height: 100px;
        }

        .loading-text-words {
          display: inline-block;
          margin: 0 5px;
          color: #fff;
        }

        .loading-text-words:nth-child(1) {
          animation: blur-text 1.5s 0s infinite linear alternate;
        }
        .loading-text-words:nth-child(2) {
          animation: blur-text 1.5s 0.2s infinite linear alternate;
        }
        .loading-text-words:nth-child(3) {
          animation: blur-text 1.5s 0.4s infinite linear alternate;
        }
        .loading-text-words:nth-child(4) {
          animation: blur-text 1.5s 0.6s infinite linear alternate;
        }
        .loading-text-words:nth-child(5) {
          animation: blur-text 1.5s 0.8s infinite linear alternate;
        }
        .loading-text-words:nth-child(6) {
          animation: blur-text 1.5s 1s infinite linear alternate;
        }
        .loading-text-words:nth-child(7) {
          animation: blur-text 1.5s 1.2s infinite linear alternate;
        }

        @keyframes blur-text {
          0% {
            filter: blur(0px);
          }
          100% {
            filter: blur(4px);
          }
        }
      `}</style>

			<div className="loading">
				<div className="loading-text">
					<span className="loading-text-words">L</span>
					<span className="loading-text-words">O</span>
					<span className="loading-text-words">A</span>
					<span className="loading-text-words">D</span>
					<span className="loading-text-words">I</span>
					<span className="loading-text-words">N</span>
					<span className="loading-text-words">G</span>
				</div>
			</div>
		</>
	);
};

export default Loading;
