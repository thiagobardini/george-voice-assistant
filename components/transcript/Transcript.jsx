import React from "react";

const Transcript = ({
	transcript,
	conversation,
	isTranscriptVisible,
	tempUserText,
	currentText,
	assistantIsSpeaking,
	transcriptRef,
	toggleTranscript
}) => {
	return (
		<div className={`live-transcript ${isTranscriptVisible ? 'visible' : 'hidden'}`}>
			<div className="transcript-header">
				<span>Live Transcript {transcript.length > 0 ? `(${transcript.length})` : ''}</span>
				<div className="transcript-controls">
					{conversation.length > 0 && (
						<button 
							className="transcript-button"
							onClick={() => {
								const text = conversation.map(msg => `${msg.speaker}: ${msg.text}`).join('\n');
								const blob = new Blob([text], { type: 'text/plain' });
								const url = URL.createObjectURL(blob);
								const a = document.createElement('a');
								a.href = url;
								a.download = 'conversation-transcript.txt';
								a.click();
							}}
						>
							<span className="button-icon">↓</span>
							Download
						</button>
					)}
					<button 
						className="transcript-button toggle-button"
						onClick={toggleTranscript}
					>
						<span className="button-icon">{isTranscriptVisible ? '▼' : '▲'}</span>
						{isTranscriptVisible ? 'Hide' : 'Show'}
					</button>
				</div>
			</div>
			<div className="transcript-content" ref={transcriptRef}>
				<div className="messages-container">
					{transcript.length === 0 ? (
						<div className="empty-transcript">Conversation will appear here...</div>
					) : (
						transcript.map((msg, index) => (
							<div key={index} className={`message ${msg.speaker}`}>
								<div className="message-bubble">
									{msg.text}
								</div>
							</div>
						))
					)}
					{tempUserText && (
						<div className="message user current">
							<div className="message-bubble">
								{tempUserText}
							</div>
						</div>
					)}
					{currentText && assistantIsSpeaking && (
						<div className="message assistant current">
							<div className="message-bubble">
								{currentText}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Transcript;
