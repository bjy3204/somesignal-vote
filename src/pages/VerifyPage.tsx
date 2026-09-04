import { useState } from "react";

import type {
  VoteParticipant,
} from "../lib/voteApi";

type Gender =
  | "male"
  | "female"
  | "";

type VerifyPageProps = {
  onBack: () => void;
  onNext: () => void;

  participants:
    VoteParticipant[];

  participantId:
    number | null;

  name: string;

  gender: Gender;

  nickname: string;

  phone: string;

  setParticipantId:
    (
      value:
        number | null
    ) => void;

  setName:
    (
      value: string
    ) => void;

  setGender:
    (
      value: Gender
    ) => void;

  setNickname:
    (
      value: string
    ) => void;

  setPhone:
    (
      value: string
    ) => void;
};

function VerifyPage({
  onBack,
  onNext,

  participants,

  participantId,

  name,
  gender,
  nickname,
  phone,

  setParticipantId,
  setName,
  setGender,
  setNickname,
  setPhone,
}: VerifyPageProps) {
  const [
    nextHovered,
    setNextHovered,
  ] = useState(false);

  const [
    backHovered,
    setBackHovered,
  ] = useState(false);

  const [
    nicknameOpen,
    setNicknameOpen,
  ] = useState(false);

  // =========================================================
  // DB 성별값 통일
  // =========================================================

  const normalizeGender = (
    value:
      | string
      | null
      | undefined
  ): Gender => {
    const normalized =
      value
        ?.trim()
        .toLowerCase() ?? "";

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
  // 현재 선택한 성별의 실제 참가자만
  // =========================================================

  const nicknameParticipants =
    gender === ""
      ? []
      : participants.filter(
          (
            participant
          ) =>
            normalizeGender(
              participant.gender
            ) === gender &&
            participant
              .seat_number
              ?.trim()
        );

  // =========================================================
  // 입력 완료 여부
  // =========================================================

  const isValid =
    name.trim() !== "" &&
    gender !== "" &&
    participantId !== null &&
    nickname !== "" &&
    phone.trim() !== "";

  // =========================================================
  // 성별 변경
  // =========================================================

  const handleGenderChange = (
    newGender: Gender
  ) => {
    if (
      gender !== newGender
    ) {
      setParticipantId(null);

      setNickname("");

      setNicknameOpen(false);
    }

    setGender(newGender);
  };

  // =========================================================
  // 휴대폰 번호
  // 숫자만 입력 후 자동 하이픈
  // =========================================================

  const handlePhoneChange = (
    value: string
  ) => {
    const numbers =
      value.replace(
        /[^0-9]/g,
        ""
      );

    let formatted =
      numbers;

    if (
      numbers.length <= 3
    ) {
      formatted =
        numbers;
    } else if (
      numbers.length <= 7
    ) {
      formatted =
        `${numbers.slice(
          0,
          3
        )}-${numbers.slice(
          3
        )}`;
    } else {
      formatted =
        `${numbers.slice(
          0,
          3
        )}-${numbers.slice(
          3,
          7
        )}-${numbers.slice(
          7,
          11
        )}`;
    }

    setPhone(formatted);
  };

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#111218",

        color:
          "#ffffff",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        padding:
          "24px",

        fontFamily:
          "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "480px",
        }}
      >
        <div
          style={{
            textAlign:
              "center",

            fontSize:
              "14px",

            color:
              "#FFB0C0",

            marginBottom:
              "18px",

            fontWeight:
              700,

            letterSpacing:
              "2px",
          }}
        >
          SOME SIGNAL
        </div>

        <div
          style={{
            textAlign:
              "center",

            color:
              "#FFB0C0",

            fontSize:
              "12px",

            fontWeight:
              700,

            marginBottom:
              "10px",
          }}
        >
          STEP 01
        </div>

        <h1
          style={{
            textAlign:
              "center",

            fontSize:
              "30px",

            margin:
              "0 0 14px",
          }}
        >
          본인 확인
        </h1>

        <p
          style={{
            textAlign:
              "center",

            color:
              "#b8b8c2",

            lineHeight:
              1.7,

            margin:
              "0 0 36px",
          }}
        >
          최종 선택을 위해
          <br />
          참가자 정보를
          입력해 주세요
        </p>

        {/* 이름 */}

        <label
          style={
            labelStyle
          }
        >
          이름
        </label>

        <input
          value={name}
          onChange={(
            e
          ) =>
            setName(
              e.target
                .value
            )
          }
          placeholder="이름을 입력해 주세요"
          style={
            inputStyle
          }
        />

        {/* 성별 */}

        <label
          style={
            labelStyle
          }
        >
          성별
        </label>

        <div
          style={{
            display:
              "flex",

            gap:
              "10px",

            marginBottom:
              "20px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              handleGenderChange(
                "male"
              )
            }
            style={{
              ...genderButtonStyle,

              border:
                gender ===
                "male"
                  ? "2px solid #FFB0C0"
                  : "1px solid #34353F",

              background:
                gender ===
                "male"
                  ? "#2B2027"
                  : "#1D1E27",

              color:
                gender ===
                "male"
                  ? "#FFB0C0"
                  : "#b8b8c2",
            }}
          >
            남성
          </button>

          <button
            type="button"
            onClick={() =>
              handleGenderChange(
                "female"
              )
            }
            style={{
              ...genderButtonStyle,

              border:
                gender ===
                "female"
                  ? "2px solid #FFB0C0"
                  : "1px solid #34353F",

              background:
                gender ===
                "female"
                  ? "#2B2027"
                  : "#1D1E27",

              color:
                gender ===
                "female"
                  ? "#FFB0C0"
                  : "#b8b8c2",
            }}
          >
            여성
          </button>
        </div>

        {/* 닉네임 */}

        <label
          style={
            labelStyle
          }
        >
          닉네임
        </label>

        <div
          style={{
            position:
              "relative",

            marginBottom:
              "20px",
          }}
        >
          <button
            type="button"
            disabled={
              !gender
            }
            onClick={() => {
              if (gender) {
                setNicknameOpen(
                  !nicknameOpen
                );
              }
            }}
            style={{
              width:
                "100%",

              height:
                "54px",

              borderRadius:
                "12px",

              border:
                nicknameOpen
                  ? "1px solid #FFB0C0"
                  : "1px solid #34353F",

              background:
                "#1D1E27",

              color:
                nickname
                  ? "#ffffff"
                  : "#777985",

              padding:
                "0 16px",

              fontSize:
                "15px",

              fontFamily:
                "Pretendard, sans-serif",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              cursor:
                gender
                  ? "pointer"
                  : "not-allowed",

              opacity:
                gender
                  ? 1
                  : 0.6,
            }}
          >
            <span>
              {nickname
                ? nickname
                : gender
                  ? "내 닉네임을 선택해 주세요"
                  : "성별을 먼저 선택해 주세요"}
            </span>

            <span
              style={{
                color:
                  gender
                    ? "#FFB0C0"
                    : "#777985",

                fontSize:
                  "11px",

                transform:
                  nicknameOpen
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
                position:
                  "absolute",

                top:
                  "62px",

                left:
                  0,

                right:
                  0,

                background:
                  "#1D1E27",

                border:
                  "1px solid #34353F",

                borderRadius:
                  "12px",

                padding:
                  "8px",

                zIndex:
                  50,

                maxHeight:
                  "260px",

                overflowY:
                  "auto",

                boxShadow:
                  "0 14px 35px rgba(0,0,0,0.45)",
              }}
            >
              {nicknameParticipants.length ===
              0 ? (
                <div
                  style={{
                    height:
                      "46px",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    padding:
                      "0 12px",

                    color:
                      "#777985",

                    fontSize:
                      "14px",
                  }}
                >
                  등록된
                  참가자가
                  없습니다
                </div>
              ) : (
                nicknameParticipants.map(
                  (
                    participant
                  ) => {
                    const item =
                      participant
                        .seat_number!;

                    const isSelected =
                      participantId ===
                      participant.id;

                    return (
                      <button
                        key={
                          participant.id
                        }
                        type="button"
                        onClick={() => {
                          setParticipantId(
                            participant.id
                          );

                          setNickname(
                            item
                          );

                          setNicknameOpen(
                            false
                          );
                        }}
                        style={{
                          width:
                            "100%",

                          height:
                            "46px",

                          border:
                            "none",

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

                          textAlign:
                            "left",

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
                          {
                            item
                          }
                        </span>

                        {isSelected && (
                          <span
                            style={{
                              color:
                                "#FFB0C0",

                              fontSize:
                                "14px",

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

        {/* 휴대폰 */}

        <label
          style={
            labelStyle
          }
        >
          휴대폰 번호
        </label>

        <input
          value={phone}
          onChange={(
            e
          ) =>
            handlePhoneChange(
              e.target
                .value
            )
          }
          placeholder="010-0000-0000"
          inputMode="numeric"
          maxLength={13}
          style={
            inputStyle
          }
        />

        {/* 버튼 */}

        <div
          style={{
            display:
              "flex",

            gap:
              "10px",

            marginTop:
              "12px",
          }}
        >
          <button
            type="button"
            onClick={
              onBack
            }
            onMouseEnter={() =>
              setBackHovered(
                true
              )
            }
            onMouseLeave={() =>
              setBackHovered(
                false
              )
            }
            style={{
              width:
                "110px",

              height:
                "56px",

              borderRadius:
                "16px",

              border:
                "1px solid #34353F",

              background:
                backHovered
                  ? "#292A34"
                  : "#1D1E27",

              color:
                "#ffffff",

              fontSize:
                "15px",

              fontWeight:
                700,

              cursor:
                "pointer",
            }}
          >
            이전
          </button>

          <button
            type="button"
            onClick={
              onNext
            }
            disabled={
              !isValid
            }
            onMouseEnter={() =>
              setNextHovered(
                true
              )
            }
            onMouseLeave={() =>
              setNextHovered(
                false
              )
            }
            style={{
              flex:
                1,

              height:
                "56px",

              borderRadius:
                "16px",

              border:
                "none",

              background:
                isValid &&
                nextHovered
                  ? "#FF91A8"
                  : "#FFB0C0",

              color:
                "#111218",

              fontSize:
                "15px",

              fontWeight:
                800,

              cursor:
                isValid
                  ? "pointer"
                  : "not-allowed",

              opacity:
                isValid
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

const labelStyle = {
  display:
    "block",

  fontSize:
    "14px",

  fontWeight:
    700,

  marginBottom:
    "9px",
};

const inputStyle = {
  width:
    "100%",

  height:
    "54px",

  borderRadius:
    "12px",

  border:
    "1px solid #34353F",

  background:
    "#1D1E27",

  color:
    "#ffffff",

  padding:
    "0 16px",

  fontSize:
    "15px",

  fontFamily:
    "Pretendard, sans-serif",

  outline:
    "none",

  marginBottom:
    "20px",
};

const genderButtonStyle = {
  flex:
    1,

  height:
    "54px",

  borderRadius:
    "12px",

  fontSize:
    "15px",

  fontWeight:
    700,

  cursor:
    "pointer",

  transition:
    "all 0.18s ease",
};

export default VerifyPage;