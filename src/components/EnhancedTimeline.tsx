import React from "react";

interface Milestone {
  date: string;
  title: string;
}

interface EnhancedTimelineProps {
  milestones: Milestone[];
}

const EnhancedTimeline: React.FC<EnhancedTimelineProps> = ({ milestones }) => {
  return (
    <div className="timeline-container">
      {milestones.map((milestone, index) => {
        const isLeft = index % 2 === 0;
        const formattedDate = new Date(milestone.date).toLocaleDateString(
          "pt-BR"
        );

        return (
          <div
            key={index}
            className={`timeline-item ${
              isLeft ? "timeline-left" : "timeline-right"
            }`}
          >
            <div className="timeline-content">
              <div className="timeline-date">{formattedDate}</div>
              <h3 className="timeline-title">{milestone.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnhancedTimeline;
