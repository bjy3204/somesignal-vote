import { useState } from "react";

type Gender = "male" | "female" | "";
type YesNo = "yes" | "no" | "";

type PrivateMatchChoice =
  | "yes"
  | "maybe"
  | "no"
  | "";

type ReviewPageProps = {
  onBack: () => void;

  onSubmit: () => Promise<void>;

  name: string;
  gender: Gender;
  nickname: string;
  phone: string;

  selectedPicks: string[];

  wantsContact: YesNo;
  contactNickname: string;

  privateMatch: PrivateMatchChoice;
};

function ReviewPage({
  onBack,
  onSubmit,
  name,
  gender,
  nickname,
  phone,
  selectedPicks,
  wantsContact,
  contactNickname,
  privateMatch,
}: ReviewPageProps) {
  const [
    submitHovered,
    setSubmitHovered,
  ] = useState(false);

  const [
    backHovered,
    setBackHovered,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    isSubmitted,
    setIsSubmitted,
  ] = useState(false);

  const genderText =
    gender === "male"
      ? "남성"
      : gender === "female"
        ? "여성"
        : "-";

  const privateMatchText =
    privateMatch === "yes"
      ? "네, 참여하고 싶어요"
      : privateMatch === "maybe"
        ? "괜찮은 분이 있다면요"
        : privateMatch === "no"
          ? "아니요, 괜찮아요"
          : "-";

  // =========================================================
  // 제출
  // =========================================================

  const handleSubmit =
    async () => {
      if (isSubmitting) {
        return;
      }

      try {
        setIsSubmitting(true);
        setSubmitError("");

        await onSubmit();

        setIsSubmitted(true);
      } catch (error) {
        console.error(error);

        const message =
          error instanceof Error
            ? error.message
            : "투표 제출에 실패했습니다";

        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    };

  // =========================================================
  // 제출 완료 화면
  // =========================================================

  if (isSubmitted) {
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
          fontFamily:
            "Pretendard, sans-serif",
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
              color: "#FFB0C0",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "2px",
              marginBottom: "22px",
            }}
          >
            S♡ME SIGNAL
          </div>

          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 24px",
              borderRadius: "50%",
              background: "#FFB0C0",
              color: "#111218",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontSize: "28px",
              margin: "0 0 14px",
            }}
          >
            제출이 완료되었습니다
          </h1>

          <p
            style={{
              color: "#b8b8c2",
              fontSize: "15px",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            소중한 선택 감사합니다
            <br />
            매칭 결과는 개별적으로
            안내드릴 예정입니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111218",
        color: "#ffffff",
        padding: "50px 24px",
        fontFamily:
          "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
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
          S♡ME SIGNAL
        </div>

        <div
          style={{
            textAlign: "center",
            color: "#FFB0C0",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          STEP 05
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "30px",
            margin: "0 0 14px",
          }}
        >
          최종 선택을 확인해 주세요
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#b8b8c2",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          제출 후에는 선택 내용을
          변경할 수 없습니다
          <br />
          아래 내용을 한 번 더
          확인해 주세요
        </p>

        <Section title="본인 정보">
          <InfoRow
            label="이름"
            value={name}
          />

          <InfoRow
            label="성별"
            value={genderText}
          />

          <InfoRow
            label="닉네임"
            value={nickname}
          />

          <InfoRow
            label="휴대폰 번호"
            value={phone}
            last
          />
        </Section>

        <Section title="최종 PICK">
          {selectedPicks.map(
            (item, index) => (
              <PickRow
                key={`${item}-${index}`}
                rank={index + 1}
                nickname={item}
                last={
                  index ===
                  selectedPicks.length - 1
                }
              />
            )
          )}
        </Section>

        <Section title="연락처 희망">
          {wantsContact === "yes" ? (
            <>
              <InfoRow
                label="연락처 희망"
                value="있어요"
              />

              <InfoRow
                label="선택한 분"
                value={contactNickname}
                highlight
                last
              />
            </>
          ) : (
            <InfoRow
              label="연락처 희망"
              value="없어요"
              last
            />
          )}
        </Section>

        <Section title="1:1 프라이빗 매칭">
          <InfoRow
            label="선택"
            value={privateMatchText}
            last
          />
        </Section>

        <div
          style={{
            background: "#181920",
            border:
              "1px solid #292A34",
            borderRadius: "14px",
            padding: "16px 18px",
            marginTop: "16px",
            color: "#8f909b",
            fontSize: "13px",
            lineHeight: 1.7,
          }}
        >
          최종 제출 후에는 선택 내용을
          수정할 수 없습니다
          <br />
          입력한 내용을 확인한 뒤
          제출해 주세요
        </div>

        {submitError && (
          <div
            style={{
              marginTop: "14px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "#2B2027",
              border:
                "1px solid #FF91A8",
              color: "#FFB0C0",
              fontSize: "13px",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {submitError}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "28px",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            onMouseEnter={() =>
              setBackHovered(true)
            }
            onMouseLeave={() =>
              setBackHovered(false)
            }
            style={{
              width: "110px",
              height: "56px",
              borderRadius: "16px",
              border:
                "1px solid #34353F",

              background: backHovered
                ? "#292A34"
                : "#1D1E27",

              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,

              cursor: isSubmitting
                ? "not-allowed"
                : "pointer",

              opacity: isSubmitting
                ? 0.5
                : 1,
            }}
          >
            이전
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            onMouseEnter={() =>
              setSubmitHovered(true)
            }
            onMouseLeave={() =>
              setSubmitHovered(false)
            }
            style={{
              flex: 1,
              height: "56px",
              borderRadius: "16px",
              border: "none",

              background:
                submitHovered &&
                !isSubmitting
                  ? "#FF91A8"
                  : "#FFB0C0",

              color: "#111218",
              fontSize: "15px",
              fontWeight: 800,

              cursor: isSubmitting
                ? "not-allowed"
                : "pointer",

              opacity: isSubmitting
                ? 0.65
                : 1,

              transition:
                "background-color 0.2s ease",
            }}
          >
            {isSubmitting
              ? "제출 중..."
              : "최종 제출하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// 공통 카드
// =========================================================

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          color: "#b8b8c2",
          fontSize: "13px",
          fontWeight: 700,
          marginBottom: "9px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          background: "#1D1E27",
          border:
            "1px solid #34353F",
          borderRadius: "14px",
          padding: "4px 18px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// =========================================================
// 일반 정보
// =========================================================

function InfoRow({
  label,
  value,
  highlight = false,
  last = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div
      style={{
        minHeight: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        gap: "20px",

        borderBottom: last
          ? "none"
          : "1px solid #292A34",
      }}
    >
      <span
        style={{
          color: "#8f909b",
          fontSize: "14px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: highlight
            ? "#FFB0C0"
            : "#ffffff",

          fontSize: "14px",

          fontWeight: highlight
            ? 700
            : 600,

          textAlign: "right",
        }}
      >
        {value || "-"}
      </span>
    </div>
  );
}

// =========================================================
// PICK
// =========================================================

function PickRow({
  rank,
  nickname,
  last,
}: {
  rank: number;
  nickname: string;
  last: boolean;
}) {
  return (
    <div
      style={{
        minHeight: "58px",
        display: "flex",
        alignItems: "center",
        gap: "12px",

        borderBottom: last
          ? "none"
          : "1px solid #292A34",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",

          background:
            rank === 1
              ? "#FFB0C0"
              : "#292A34",

          color:
            rank === 1
              ? "#111218"
              : "#b8b8c2",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "12px",
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {rank}
      </div>

      <div
        style={{
          flex: 1,
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {nickname}
      </div>

      <div
        style={{
          color:
            rank === 1
              ? "#FFB0C0"
              : "#8f909b",

          fontSize: "12px",
          fontWeight: 800,
        }}
      >
        {rank} PICK
      </div>
    </div>
  );
}

export default ReviewPage;