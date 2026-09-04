import { useState } from "react";

type StartPageProps = {
  onStart: () => void;
};

function StartPage({ onStart }: StartPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111218",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#FFB0C0",
            marginBottom: "18px",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          SOME SIGNAL
        </div>

        <h1
          style={{
            fontSize: "30px",
            margin: 0,
            marginBottom: "14px",
          }}
        >
          최종 매칭 투표
        </h1>

        <p
          style={{
            color: "#b8b8c2",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}
        >
          정확하고 빠른 매칭 결과를 위해
          <br />
          최종 선택을 완료해 주세요
        </p>

        <button
          onClick={onStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            height: "56px",
            borderRadius: "16px",
            border: "none",
            background: isHovered ? "#FF91A8" : "#FFB0C0",
            color: "#111218",
            fontSize: "16px",
            fontWeight: 800,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          투표 시작하기
        </button>
      </div>
    </div>
  );
}

export default StartPage;