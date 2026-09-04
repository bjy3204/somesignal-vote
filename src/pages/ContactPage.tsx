import { useState } from "react";

import type {
  VoteParticipant,
} from "../lib/voteApi";

type Gender = "male" | "female" | "";

type ContactPageProps = {
  onBack: () => void;
  onNext: () => void;

  gender: Gender;

  participants: VoteParticipant[];

  wantsContact: "yes" | "no" | "";

  contactParticipantId: number | null;

  setWantsContact: (
    value: "yes" | "no" | ""
  ) => void;

  setContactParticipantId: (
    value: number | null
  ) => void;
};

function ContactPage({
  onBack,
  onNext,
  gender,
  participants,
  wantsContact,
  contactParticipantId,
  setWantsContact,
  setContactParticipantId,
}: ContactPageProps) {
  const [nicknameOpen, setNicknameOpen] =
    useState(false);

  const [nextHovered, setNextHovered] =
    useState(false);

  const [backHovered, setBackHovered] =
    useState(false);

  // =========================================================
  // DB 성별값 통일
  // =========================================================

  const normalizeGender = (
    value: string | null | undefined
  ): Gender => {
    const normalized =
      value?.trim().toLowerCase() ?? "";

    if (
      normalized === "male" ||
      normalized === "남성" ||
      normalized === "남"
    ) {
      return "male";
    }

    if (
      normalized === "female" ||
      normalized === "여성" ||
      normalized === "여"
    ) {
      return "female";
    }

    return "";
  };

  // =========================================================
  // 반대 성별 참가자
  // =========================================================

  const oppositeGender: Gender =
    gender === "male"
      ? "female"
      : gender === "female"
        ? "male"
        : "";

  const candidateParticipants =
    oppositeGender === ""
      ? []
      : participants.filter(
          (participant) =>
            normalizeGender(
              participant.gender
            ) === oppositeGender &&
            participant.seat_number?.trim()
        );

  // =========================================================
  // 현재 선택된 상대
  // =========================================================

  const selectedParticipant =
    participants.find(
      (participant) =>
        participant.id ===
        contactParticipantId
    );

  const selectedNickname =
    selectedParticipant?.seat_number ?? "";

  // =========================================================
  // YES / NO
  // =========================================================

  const handleAnswer = (
    answer: "yes" | "no"
  ) => {
    setWantsContact(answer);

    if (answer === "no") {
      setContactParticipantId(null);
      setNicknameOpen(false);
    }
  };

  // =========================================================
  // 다음 버튼 활성화
  // =========================================================

  const isValid =
    wantsContact === "no" ||
    (wantsContact === "yes" &&
      contactParticipantId !== null);

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

        <div
          style={{
            textAlign: "center",
            color: "#FFB0C0",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          STEP 03
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            lineHeight: 1.4,
            margin: "0 0 14px",
          }}
        >
          꼭 연락처를 알고 싶은 분이
          <br />
          계신가요?
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#b8b8c2",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          최종 매칭이 되지 않더라도
          <br />
          연락처를 전달받고 싶은 분을
          선택해 주세요
        </p>

        {/* YES / NO */}

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              handleAnswer("yes")
            }
            style={{
              flex: 1,
              height: "64px",
              borderRadius: "14px",

              border:
                wantsContact === "yes"
                  ? "2px solid #FFB0C0"
                  : "1px solid #34353F",

              background:
                wantsContact === "yes"
                  ? "#2B2027"
                  : "#1D1E27",

              color:
                wantsContact === "yes"
                  ? "#FFB0C0"
                  : "#ffffff",

              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            있어요
          </button>

          <button
            type="button"
            onClick={() =>
              handleAnswer("no")
            }
            style={{
              flex: 1,
              height: "64px",
              borderRadius: "14px",

              border:
                wantsContact === "no"
                  ? "2px solid #FFB0C0"
                  : "1px solid #34353F",

              background:
                wantsContact === "no"
                  ? "#2B2027"
                  : "#1D1E27",

              color:
                wantsContact === "no"
                  ? "#FFB0C0"
                  : "#ffffff",

              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            없어요
          </button>
        </div>

        {/* 연락처 희망 상대 */}

        {wantsContact === "yes" && (
          <div
            style={{
              marginTop: "28px",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "9px",
              }}
            >
              연락처를 알고 싶은 분
            </label>

            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setNicknameOpen(
                    !nicknameOpen
                  )
                }
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "12px",

                  border: nicknameOpen
                    ? "1px solid #FFB0C0"
                    : "1px solid #34353F",

                  background: "#1D1E27",

                  color: selectedNickname
                    ? "#ffffff"
                    : "#777985",

                  padding: "0 16px",
                  fontSize: "15px",
                  fontFamily:
                    "Pretendard, sans-serif",

                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",

                  cursor: "pointer",
                }}
              >
                <span>
                  {selectedNickname ||
                    "닉네임을 선택해 주세요"}
                </span>

                <span
                  style={{
                    color: "#FFB0C0",
                    fontSize: "11px",

                    transform: nicknameOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",

                    transition:
                      "transform 0.2s ease",
                  }}
                >
                  ▼
                </span>
              </button>

              {nicknameOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "64px",
                    left: 0,
                    right: 0,

                    background: "#1D1E27",

                    border:
                      "1px solid #34353F",

                    borderRadius: "12px",
                    padding: "8px",

                    maxHeight: "260px",
                    overflowY: "auto",

                    zIndex: 50,

                    boxShadow:
                      "0 14px 35px rgba(0,0,0,0.45)",
                  }}
                >
                  {candidateParticipants.length ===
                  0 ? (
                    <div
                      style={{
                        height: "46px",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 12px",
                        color: "#777985",
                        fontSize: "14px",
                      }}
                    >
                      등록된 참가자가 없습니다
                    </div>
                  ) : (
                    candidateParticipants.map(
                      (participant) => {
                        const nickname =
                          participant
                            .seat_number!;

                        const isSelected =
                          contactParticipantId ===
                          participant.id;

                        return (
                          <button
                            key={
                              participant.id
                            }
                            type="button"
                            onClick={() => {
                              setContactParticipantId(
                                participant.id
                              );

                              setNicknameOpen(
                                false
                              );
                            }}
                            style={{
                              width: "100%",
                              height: "46px",
                              border: "none",
                              borderRadius:
                                "9px",

                              background:
                                isSelected
                                  ? "#2B2027"
                                  : "transparent",

                              color:
                                isSelected
                                  ? "#FFB0C0"
                                  : "#ffffff",

                              padding:
                                "0 12px",

                              fontSize:
                                "15px",

                              fontFamily:
                                "Pretendard, sans-serif",

                              fontWeight:
                                isSelected
                                  ? 700
                                  : 500,

                              cursor:
                                "pointer",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "space-between",
                            }}
                          >
                            <span>
                              {nickname}
                            </span>

                            {isSelected && (
                              <span
                                style={{
                                  color:
                                    "#FFB0C0",

                                  fontWeight:
                                    800,
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      }
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 하단 버튼 */}

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
              cursor: "pointer",
            }}
          >
            이전
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            onMouseEnter={() =>
              setNextHovered(true)
            }
            onMouseLeave={() =>
              setNextHovered(false)
            }
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

              opacity: isValid
                ? 1
                : 0.35,
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;