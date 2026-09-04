import { useState } from "react";

import type {
  VoteParticipant,
} from "../lib/voteApi";

type Gender =
  | "male"
  | "female"
  | "";

type PickPageProps = {
  onBack: () => void;
  onNext: () => void;

  gender: Gender;

  participants: VoteParticipant[];

  selected: number[];

  setSelected: (
    value: number[]
  ) => void;
};

function PickPage({
  onBack,
  onNext,
  gender,
  participants,
  selected,
  setSelected,
}: PickPageProps) {
  const [
    nextHovered,
    setNextHovered,
  ] = useState(false);

  const [
    backHovered,
    setBackHovered,
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
          (
            participant
          ) =>
            normalizeGender(
              participant.gender
            ) ===
              oppositeGender &&
            participant
              .seat_number
              ?.trim()
        );

  // =========================================================
  // 선택 / 선택 해제
  // =========================================================

  const handleSelect = (
    participantId: number
  ) => {
    // 이미 선택한 사람 다시 클릭
    // → 선택 해제
    if (
      selected.includes(
        participantId
      )
    ) {
      setSelected(
        selected.filter(
          (id) =>
            id !==
            participantId
        )
      );

      return;
    }

    // 최대 3명
    if (
      selected.length >= 3
    ) {
      return;
    }

    // 선택한 순서대로
    // 1 PICK → 2 PICK → 3 PICK
    setSelected([
      ...selected,
      participantId,
    ]);
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

        padding:
          "50px 24px",

        fontFamily:
          "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "600px",

          margin:
            "0 auto",
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
          STEP 02
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
          마음이 갔던 분을
          선택해 주세요
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
          가장 마음이 갔던
          순서대로
          <br />
          최대 3명까지
          선택할 수 있습니다
        </p>

        {/* 참가자 목록 */}

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",

            gap:
              "12px",
          }}
        >
          {candidateParticipants.map(
            (
              participant,
              index
            ) => {
              const nickname =
                participant
                  .seat_number!;

              const selectedIndex =
                selected.indexOf(
                  participant.id
                );

              const isSelected =
                selectedIndex !==
                -1;

              return (
                <button
                  key={
                    participant.id
                  }
                  type="button"
                  onClick={() =>
                    handleSelect(
                      participant.id
                    )
                  }
                  style={{
                    minHeight:
                      "74px",

                    padding:
                      "12px 16px",

                    borderRadius:
                      "14px",

                    border:
                      isSelected
                        ? "2px solid #FFB0C0"
                        : "1px solid #34353F",

                    background:
                      isSelected
                        ? "#2B2027"
                        : "#1D1E27",

                    color:
                      "#ffffff",

                    cursor:
                      "pointer",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "14px",

                    textAlign:
                      "left",
                  }}
                >
                  <div
                    style={{
                      width:
                        "42px",

                      height:
                        "42px",

                      flexShrink:
                        0,

                      borderRadius:
                        "50%",

                      background:
                        isSelected
                          ? "#FFB0C0"
                          : "#292A34",

                      color:
                        isSelected
                          ? "#111218"
                          : "#b8b8c2",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      fontSize:
                        "14px",

                      fontWeight:
                        800,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    style={{
                      flex:
                        1,

                      minWidth:
                        0,
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "16px",

                        fontWeight:
                          700,
                      }}
                    >
                      {nickname}
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        color:
                          "#FFB0C0",

                        fontSize:
                          "12px",

                        fontWeight:
                          800,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {selectedIndex +
                        1}{" "}
                      PICK
                    </div>
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* 참가자 없음 */}

        {candidateParticipants.length ===
          0 && (
          <div
            style={{
              textAlign:
                "center",

              color:
                "#777985",

              padding:
                "36px 0",

              fontSize:
                "14px",
            }}
          >
            선택 가능한
            참가자가 없습니다
          </div>
        )}

        {/* 선택 수 */}

        <div
          style={{
            textAlign:
              "center",

            color:
              selected.length ===
              3
                ? "#FFB0C0"
                : "#777985",

            fontSize:
              "13px",

            marginTop:
              "18px",
          }}
        >
          {selected.length} /
          3 선택
        </div>

        {/* 버튼 */}

        <div
          style={{
            display:
              "flex",

            gap:
              "10px",

            marginTop:
              "28px",
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
              selected.length ===
              0
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
                selected.length >
                  0 &&
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
                selected.length >
                0
                  ? "pointer"
                  : "not-allowed",

              opacity:
                selected.length >
                0
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

export default PickPage;