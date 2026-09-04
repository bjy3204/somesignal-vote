import { useState } from "react";

type PrivateMatchChoice = "yes" | "maybe" | "no" | "";

type PrivateMatchPageProps = {
  onBack: () => void;
  onNext: () => void;

  privateMatch: PrivateMatchChoice;
  setPrivateMatch: (value: PrivateMatchChoice) => void;
};

function PrivateMatchPage({
  onBack,
  onNext,
  privateMatch,
  setPrivateMatch,
}: PrivateMatchPageProps) {
  const [nextHovered, setNextHovered] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  const isValid = privateMatch !== "";

  const choices = [
    {
      value: "yes" as const,
      title: "네, 참여하고 싶어요",
      description: "조건이 맞는 분이 있다면 소개받고 싶어요",
    },
    {
      value: "maybe" as const,
      title: "괜찮은 분이 있다면요",
      description: "프로필을 확인한 후 결정하고 싶어요",
    },
    {
      value: "no" as const,
      title: "아니요, 괜찮아요",
      description: "이번에는 최종 매칭 결과만 확인할게요",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111218",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 24px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#FFB0C0",
            marginBottom: "18px",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          SOME SIGNAL
        </div>

        {/* STEP */}
        <div
          style={{
            textAlign: "center",
            color: "#FFB0C0",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          STEP 04
        </div>

        {/* 제목 */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            lineHeight: 1.4,
            margin: "0 0 14px",
          }}
        >
          1:1 프라이빗 매칭도
          <br />
          받아보시겠어요?
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#b8b8c2",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          오늘의 매칭과 별개로
          <br />
          잘 맞는 분이 있다면 소개해 드릴게요
        </p>

        {/* 선택지 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {choices.map((choice) => {
            const isSelected =
              privateMatch === choice.value;

            return (
              <button
                key={choice.value}
                type="button"
                onClick={() =>
                  setPrivateMatch(choice.value)
                }
                style={{
                  width: "100%",
                  minHeight: "82px",
                  borderRadius: "14px",
                  border: isSelected
                    ? "2px solid #FFB0C0"
                    : "1px solid #34353F",
                  background: isSelected
                    ? "#2B2027"
                    : "#1D1E27",
                  padding: "16px 18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  textAlign: "left",
                  transition:
                    "border-color 0.18s ease, background-color 0.18s ease",
                }}
              >
                {/* 체크 원 */}
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: isSelected
                      ? "6px solid #FFB0C0"
                      : "2px solid #555762",
                    background: "#1D1E27",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: isSelected
                        ? "#FFB0C0"
                        : "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "5px",
                    }}
                  >
                    {choice.title}
                  </div>

                  <div
                    style={{
                      color: "#8f909b",
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    {choice.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 이전 / 다음 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "32px",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            style={{
              width: "110px",
              height: "56px",
              borderRadius: "16px",
              border: "1px solid #34353F",
              background: backHovered
                ? "#292A34"
                : "#1D1E27",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            이전
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            style={{
              flex: 1,
              height: "56px",
              borderRadius: "16px",
              border: "none",
              background:
                isValid && nextHovered
                  ? "#FF91A8"
                  : "#FFB0C0",
              color: "#111218",
              fontSize: "15px",
              fontWeight: 800,
              cursor: isValid
                ? "pointer"
                : "not-allowed",
              opacity: isValid ? 1 : 0.35,
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateMatchPage;